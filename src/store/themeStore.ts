import { create } from 'zustand';
import type { ThemeMode } from '../theme/colors';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

// Luxury light mode is the default, as per the product spec.
export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}));
