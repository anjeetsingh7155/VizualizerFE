import type { TextStyle } from 'react-native';

export const fonts = {
  display: 'CormorantGaramond_500Medium',
  displayItalic: 'CormorantGaramond_500Medium_Italic',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
} as const;

export const textVariants = {
  display: { fontFamily: fonts.display, fontSize: 40, lineHeight: 46, letterSpacing: -0.5 },
  title: { fontFamily: fonts.display, fontSize: 32, lineHeight: 38, letterSpacing: -0.3 },
  heading: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 23 },
  caption: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 19 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.2 },
  overline: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textVariants;
