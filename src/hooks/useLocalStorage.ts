import { STORAGE_STORE } from '@/constants';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { useCallback, useState } from 'react';

export function useLocalStorage(key: keyof typeof STORAGE_STORE) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = getLocalStorage(key);
    return item ? item : null;
  });

  const setStorageValue = useCallback(
    (value: typeof storedValue) => {
      setStoredValue(value);
      setLocalStorage(key, value);
    },
    [key]
  );

  return { storedValue, setStorageValue };
}
