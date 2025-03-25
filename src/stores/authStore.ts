import { STORAGE_STORE } from '@/constants';
import { IUser } from '@/interfaces';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthState {
  token?: string;
  refreshToken?: string | null;
  user?: IUser;
  setLoginSuccess: (tokens: {
    token: string;
    refreshToken: string | null;
  }) => void;
  setLogoutSuccess: () => void;
  setToken: (token?: string) => void;
  setUser: (user?: IUser) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        setLoginSuccess: (tokens) => {
          set({ token: tokens.token, refreshToken: tokens.refreshToken });
        },
        setToken: (token) => {
          set({ token });
        },
        setUser: (user) => {
          set({ user });
        },
        setLogoutSuccess: () => {
          set({ token: undefined, refreshToken: null, user: undefined });
        },
      }),
      {
        name: STORAGE_STORE.AUTH_STORE,
        partialize: (data) => ({ ...data }),
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
