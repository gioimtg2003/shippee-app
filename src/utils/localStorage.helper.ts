import { STORAGE_STORE } from '@/constants';

export const setLocalStorage = (
  key: keyof typeof STORAGE_STORE,
  value: any
) => {
  localStorage.setItem(STORAGE_STORE[key], JSON.stringify(value));
};

export const getLocalStorage = (
  key: keyof typeof STORAGE_STORE
): { [key: string]: number | string | boolean } | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeLocalStorage = (key: keyof typeof STORAGE_STORE) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
