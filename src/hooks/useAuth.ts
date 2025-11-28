import { create } from 'zustand';
import { apiFetch, clearTokens, storeTokens } from '@/lib/api';

type AuthUser = {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
};

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  hydrated: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { email: string; password: string; nombre: string; apellido: string }) => Promise<void>;
  logout: () => void;
  hydrate: () => Promise<void>;
}

type Setter = (
  partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>),
) => void;

const storeCreator = (set: Setter, get: () => AuthState): AuthState => ({
  user: null,
  loading: false,
  hydrated: false,
  async login(payload: { email: string; password: string }) {
    set({ loading: true });
    try {
      const response = await apiFetch<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      );
      storeTokens(response.tokens.accessToken, response.tokens.refreshToken);
      set({ user: response.user, loading: false, hydrated: true });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  async register(payload: { email: string; password: string; nombre: string; apellido: string }) {
    set({ loading: true });
    try {
      const response = await apiFetch<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      );
      storeTokens(response.tokens.accessToken, response.tokens.refreshToken);
      set({ user: response.user, loading: false, hydrated: true });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  logout() {
    clearTokens();
    set({ user: null, hydrated: true });
  },
  async hydrate() {
    if (get().hydrated || typeof window === 'undefined') {
      return;
    }
    try {
      const response = await apiFetch<{ user: AuthUser }>('/auth/me');
      set({ user: response.user, hydrated: true });
    } catch (error) {
      clearTokens();
      set({ user: null, hydrated: true });
    }
  },
});

export const useAuthStore = create<AuthState>(storeCreator);

export function useAuth() {
  const state = useAuthStore();
  return state;
}
