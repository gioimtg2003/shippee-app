import { useSearchMapBox } from '@/services/mapbox/search';
import debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useSearchAddress = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sessionId, setSessionId] = useState(uuid());
  const [debouncedValue, setDebouncedValue] = useState('');
  const isEnableSearch = debouncedValue.length > 0;

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedValue(value);
        setSessionId(uuid());
      }, 300),
    []
  );

  const onSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const { isFetching, isLoading, data } = useSearchMapBox({
    params: {
      q: debouncedValue,
      session_token: sessionId,
    },
    enabled: isEnableSearch,
  });

  return {
    searchValue,
    data,
    onSearch,
    loading: isLoading || isFetching,
  };
};
