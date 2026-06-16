import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  countryCode?: string;
  instagram?: any;
  facebook?: any;
}

interface AuthState {
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
  token: string | null;
  
  setLoggedIn: (value: boolean) => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      user: null,
      token: null,
      
      setLoggedIn: (value) => set({ isLoggedIn: value }),
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      setAuth: (user, token) => set({ isLoggedIn: true, user, token }),
      logout: () => set({ isLoggedIn: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
