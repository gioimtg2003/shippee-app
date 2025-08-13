import { STORAGE_STORE } from '@/constants';
import { IUser } from '@/interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken?: string;
  refreshToken?: string | null;
  user?: IUser;
  setLoginSuccess: (tokens: {
    accessToken: string;
    refreshToken: string | null;
  }) => void;
  setLogoutSuccess: () => void;
  setToken: (token?: string) => void;
  setUser: (user?: IUser) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setLoginSuccess: (tokens) => {
        console.log(tokens);
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
      setToken: (token) => {
        set({ accessToken: token });
      },
      setUser: (user) => {
        set({ user });
      },
      setLogoutSuccess: () => {
        set({ accessToken: undefined, refreshToken: null, user: undefined });
      },
    }),
    {
      name: STORAGE_STORE.AUTH_STORE,
      partialize: (data) => ({ ...data }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
