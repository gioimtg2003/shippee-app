import { getConfig } from '@/config/getConfig';
import { RoutesMap } from '@/constants';
import useAuthStore from '@/stores/authStore';
import Router from 'next/router';
import { createAxiosClient } from './createAxiosClient';

const { apiUrl: BASE_URL } = getConfig();
function getCurrentAccessToken() {
  return useAuthStore.getState().token ?? '';
}

function getCurrentRefreshToken() {
  return useAuthStore.getState().refreshToken ?? '';
}

function setRefreshedTokens(tokens: { token: string; refreshToken: string }) {
  useAuthStore.getState().setLoginSuccess(tokens);
}

async function logout() {
  useAuthStore.getState().setLogoutSuccess();

  Router.replace(RoutesMap.AUTH.SIGN_IN);
}

export const axiosInstant = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  logout,
  setRefreshedTokens,
});
