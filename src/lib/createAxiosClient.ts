import { ERRORS, RoutesMap } from '@/constants';
import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

import toast from 'react-hot-toast';

let failedQueue: any[] = [];
let isRefreshing = false;

export type AxiosConfig = {
  authorization?: boolean;
};

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  logout,
  setRefreshedTokens,
}: {
  options: CreateAxiosDefaults<unknown>;
  getCurrentAccessToken: () => string;
  getCurrentRefreshToken: () => string;
  logout: () => void;
  setRefreshedTokens: (tokens: { token: string; refreshToken: string }) => void;
}) {
  const client = axios.create(options);
  const refreshTokenUrl = options.baseURL + '/auth/refresh-token';

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig & AxiosConfig) => {
      if ((config?.authorization ?? true) !== false) {
        const token = getCurrentAccessToken();
        const refreshToken = getCurrentRefreshToken();

        const currentUnix = dayjs().unix();

        const { exp } = token
          ? (jwtDecode(token) as JwtPayload)
          : { exp: undefined };
        if (!!exp && currentUnix >= exp - 1000 && refreshToken) {
          config.headers.Authorization = 'Bearer ' + refreshToken;
        } else if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const success = response.data?.code >= 200 && response.data?.code <= 299;
      if (!success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    },
    (error) => {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error(error?.response?.data?.message ?? 'Bad request');
        return Promise.reject(error);
      } else if (
        status === 401 &&
        (error.response?.data?.message === ERRORS.MissingToken ||
          error.response?.data?.message === ERRORS.TokenInvalid ||
          error.response?.data?.message === ERRORS.TokenExpiredError ||
          `${error.response?.data?.message}`?.startsWith(
            ERRORS.RefreshTokenNotMatching
          ))
      ) {
        if (
          `${error.response?.data?.message}`?.startsWith(
            ERRORS.RefreshTokenNotMatching
          )
        ) {
          toast.error(
            `${error?.response?.data?.message}`?.replace(
              ERRORS.RefreshTokenNotMatching,
              ''
            )
          );
        }
        return redirect(RoutesMap.AUTH.SIGN_IN);
      }

      const originalRequest = error.config;
      const refreshToken = getCurrentRefreshToken();
      const token = getCurrentAccessToken();

      // If error, process all the requests in the queue and logout the user.
      const handleError = (error: any) => {
        processQueue(error);
        logout();

        return error;
      };

      console.log('error---', error);

      const currentUnix = dayjs().unix();
      const { exp } = token
        ? (jwtDecode(token) as JwtPayload)
        : { exp: undefined };

      // Refresh token conditions
      if (
        refreshToken &&
        !!exp &&
        currentUnix >= exp &&
        originalRequest?.url !== refreshTokenUrl &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        isRefreshing = true;
        originalRequest._retry = true;

        return client
          .post(refreshTokenUrl)
          .then((res) => {
            const { accessToken, refreshToken } = res as unknown as {
              accessToken: string;
              refreshToken: string;
            };
            const tokens = {
              token: accessToken,
              refreshToken: refreshToken,
            };
            setRefreshedTokens(tokens);
            processQueue(null);

            return client(originalRequest);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      // Refresh token missing or expired => logout user...
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === ERRORS.TokenExpiredError &&
        error.response?.data?.message === ERRORS.Unauthorized &&
        error.config?.url === refreshTokenUrl &&
        error.response?.data?.message === ERRORS.RefreshTokenNotMatching
      ) {
        handleError?.(error);
        return redirect(RoutesMap.AUTH.SIGN_IN);
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return client;
}
