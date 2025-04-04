import {
  DefaultError,
  MutationOptions,
  QueryKey,
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
    UseQueryOptions<IResponseData<IResponse>, DefaultError, IRequest, QueryKey>
  > {
  params: IRequest;
}

export interface UseMutationOptions<IResponse, IRequest>
  extends MutationOptions<IRequest, DefaultError, IResponseData<IResponse>> {}
