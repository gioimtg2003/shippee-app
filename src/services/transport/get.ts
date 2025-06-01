import {
  IResponseData,
  ISpecialRequireItem,
  UseGetOptions,
} from '@/interfaces';
import { axiosInstant } from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import endpointRoot from './endpointRoot';

export interface ITransportTypeRequest {
  'x-shipppee-timestamp': number;
  'x-shipppee-sha-256': string;
}
export interface ITransportTypeResponse {
  code: string;
  description: string;
  id: number;
  imageUrl: string;
  loadWeight: number;
  name: string;
  textSize: string;
  textWeight: string;
  specialRequireItems: ISpecialRequireItem[];
}

const url = `${endpointRoot}`;
const getKey = () => [`${url}`, { transport: 'oke' }];

export const getTransportType = (params: ITransportTypeRequest) => {
  const {
    'x-shipppee-sha-256': sha256,
    'x-shipppee-timestamp': timestamp,
    ...rest
  } = params;
  return axiosInstant.get<
    ITransportTypeRequest,
    IResponseData<ITransportTypeResponse[]>
  >(url, {
    params: { ...rest },
    headers: {
      'x-shipppee-sha-256': sha256,
      'x-shipppee-timestamp': timestamp,
    },
  });
};

export const useGetTransportType = (
  options: UseGetOptions<ITransportTypeResponse[], ITransportTypeRequest>
) =>
  useQuery({
    ...options,
    queryKey: getKey(),
    queryFn: async () => getTransportType(options.params),
  });
