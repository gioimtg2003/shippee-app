import {
  DefaultError,
  InfiniteData,
  MutationOptions,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export interface IResponseData<Data> {
  code: number;
  message: string;
  data: Data;
  timestamp: string;
}

export interface UseGetOptions<IResponse, IRequest>
  extends Partial<
    UseQueryOptions<
      IResponseData<IResponse>,
      DefaultError,
      IResponseData<IResponse>,
      QueryKey
    >
  > {
  params: IRequest;
}

export interface UseMutationOptions<IResponse, IRequest>
  extends MutationOptions<IRequest, DefaultError, IResponseData<IResponse>> {}

export interface UseInfinityGetOptions<IResponse, IRequest>
  extends Partial<
    UseInfiniteQueryOptions<
      IResponseData<IResponse>,
      DefaultError,
      InfiniteData<IResponseData<IResponse>>,
      IResponseData<IResponse>,
      QueryKey
    >
  > {
  params: IRequest;
}
