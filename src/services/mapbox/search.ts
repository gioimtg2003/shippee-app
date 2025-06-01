import {
  DEFAULT_COUNTRY_SEARCH_MAPBOX,
  DEFAULT_LIMIT_SEARCH_MAPBOX,
  DEFAULT_PROXIMITY_SEARCH_MAPBOX,
} from '@/constants';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import endpointRoot from './endpointRoot';

export interface SearchMapBoxRequest {
  proximity?: string;
  limit?: number;
  q: string;
  country?: string;
  session_token?: string;
}

export interface SearchMapBoxResponse {
  suggestions: {
    name: string;
    mapbox_id: string;
    feature_type: string;
    place_formatted: string;
    context: {
      country: {
        id: string;
        name: string;
      };
      postcode: {
        id: string;
        name: string;
      };
      locality: {
        id: string;
        name: string;
      };
      neighborhood: {
        id: string;
        name: string;
      };
      street: {
        id: string;
        name: string;
      };
    };
  }[];
  response_id: string;
}

export const URL_API_SEARCH_MAPBOX = `${endpointRoot}/search/searchbox/v1/suggest`;
export const getKeySearchMapBox = (params: SearchMapBoxRequest) => [
  URL_API_SEARCH_MAPBOX,
  {
    ...params,
    limit: params.limit ?? 10,
    country: params.country ?? 'vn',
  },
];

export const searchMaBox = async (
  params: SearchMapBoxRequest
): Promise<SearchMapBoxResponse> => {
  return axios
    .get<SearchMapBoxResponse>(URL_API_SEARCH_MAPBOX, {
      params: {
        ...params,
        limit: params.limit ?? DEFAULT_LIMIT_SEARCH_MAPBOX,
        country: params.country ?? DEFAULT_COUNTRY_SEARCH_MAPBOX,
        proximity: params.proximity ?? DEFAULT_PROXIMITY_SEARCH_MAPBOX,
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
      },
    })
    .then((res) => res.data);
};

export const useSearchMapBox = (
  options: Partial<UseQueryOptions<SearchMapBoxResponse>> & {
    params: SearchMapBoxRequest;
  }
) => {
  const { params, ...restOpts } = options;
  return useQuery({
    ...restOpts,
    queryKey: getKeySearchMapBox(params),
    queryFn: () => searchMaBox(params),
  });
};
