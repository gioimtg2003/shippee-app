// import { IResponseData, UseGetOptions } from '@/interfaces';
// import { axiosInstant } from '@/lib/axiosClient';
// import { TOrderFormSchema } from '@/zod/order-schema.zod';
// import { useQuery } from '@tanstack/react-query';
// import endpointRoot from './endpointRoot';

// export interface IPricingTypeRequest extends TOrderFormSchema {}
// export interface IPricingTypeResponse {
//   totalPrice: number;
// }

// const url = `${endpointRoot}/pricing`;
// const getKey = (params: IPricingTypeRequest) => [`${url}`, { ...params }];

// export const calculatePricing = (params: IPricingTypeRequest) => {
//   const { ...rest } = params;
//   return axiosInstant.post<
//     IPricingTypeRequest,
//     IResponseData<IPricingTypeResponse[]>
//   >(url, {
//     ...rest,
//   });
// };

// export const useGetTransportType = (
//   options: UseGetOptions<IPricingTypeResponse[], IPricingTypeRequest>
// ) =>
//   useQuery({
//     ...options,
//     queryKey: getKey(options.params),
//     queryFn: async () => getTransportType(options.params),
//   });
