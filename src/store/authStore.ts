import { create } from 'zustand';
import type { User } from '../types';
import { ApiError, configureApi } from '../services/api';
import { tokenStorage } from '../services/tokenStorage';
import { getCurrentUser } from '../services/authService';

type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  /** On app start: if a saved token exists, check it with the server. */
  restoreSession: () => Promise<void>;
  completeSignIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  token: null,

  restoreSession: async () => {
    const token = await tokenStorage.get().catch(() => null);
    if (!token) {
      set({ status: 'signedOut', user: null, token: null });
      return;
    }

    set({ token });
    try {
      const user = await getCurrentUser();
      set({ status: 'signedIn', user, token });
    } catch (error) {
      // Only forget the saved token if the server said it is invalid;
      // if the server was unreachable, keep it to try again next launch.
      if (error instanceof ApiError && error.status === 401) {
        await tokenStorage.clear().catch(() => undefined);
      }
      set({ status: 'signedOut', user: null, token: null });
    }
  },

  completeSignIn: async (token, user) => {
    await tokenStorage.set(token);
    set({ status: 'signedIn', user, token });
  },

  signOut: async () => {
    await tokenStorage.clear().catch(() => undefined);
    set({ status: 'signedOut', user: null, token: null });
  },
}));

configureApi({
  getToken: () => useAuthStore.getState().token,
  onUnauthorized: () => {
    void useAuthStore.getState().signOut();
  },
});
