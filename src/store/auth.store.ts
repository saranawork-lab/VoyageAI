import { create } from 'zustand';
import type { UserProfile, UserRole, UserTier } from '@/types/user.types';

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  tier: UserTier;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile) => void;
  setToken: (token: string) => void;
  setTier: (tier: UserTier) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  tier: 'free',
  role: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      role: user.role,
      tier: user.tier,
      isAuthenticated: true,
      isLoading: false,
    }),

  setToken: (token) =>
    set({ accessToken: token }),

  setTier: (tier) =>
    set({ tier }),

  setLoading: (loading) =>
    set({ isLoading: loading }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      tier: 'free',
      role: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
