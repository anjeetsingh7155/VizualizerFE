export const palette = {
  light: {
    primary: '#171717',
    secondary: '#292524',
    background: '#F7F5F2',
    surface: '#FFFFFF',
    stone: '#D6D3D1',
    border: '#E7E5E4',
    accent: '#B08D57',
    text: '#171717',
    mutedText: '#78716C',
    inverseSurface: '#1C1917',
    inverseText: '#F7F5F2',
    success: '#15803D',
    error: '#DC2626',
  },
  dark: {
    primary: '#F7F5F2',
    secondary: '#E7E5E4',
    background: '#0C0A09',
    surface: '#1C1917',
    stone: '#44403C',
    border: '#292524',
    accent: '#C9A66B',
    text: '#F7F5F2',
    mutedText: '#A8A29E',
    inverseSurface: '#292524',
    inverseText: '#F7F5F2',
    success: '#22C55E',
    error: '#F87171',
  },
} as const;

export type ThemeMode = keyof typeof palette;
export type ThemeColors = { [K in keyof typeof palette.light]: string };
