import { palette, type ThemeColors } from './colors';
import { useThemeStore } from '../store/themeStore';

export { palette } from './colors';
export type { ThemeColors, ThemeMode } from './colors';
export { fonts, textVariants } from './typography';
export type { TextVariant } from './typography';
export { spacing, radius } from './spacing';

export function useTheme(): { colors: ThemeColors; isDark: boolean } {
  const mode = useThemeStore((state) => state.mode);
  return { colors: palette[mode], isDark: mode === 'dark' };
}
