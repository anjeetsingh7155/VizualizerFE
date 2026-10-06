import { Text, type TextProps } from 'react-native';
import { textVariants, useTheme, type TextVariant } from '../../theme';

type Tone = 'default' | 'muted' | 'accent' | 'inverse' | 'error';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  tone?: Tone;
  align?: 'left' | 'center' | 'right';
}

export function AppText({ variant = 'body', tone = 'default', align, style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const toneColor: Record<Tone, string> = {
    default: colors.text,
    muted: colors.mutedText,
    accent: colors.accent,
    inverse: colors.inverseText,
    error: colors.error,
  };

  return (
    <Text
      style={[textVariants[variant], { color: toneColor[tone] }, align ? { textAlign: align } : null, style]}
      maxFontSizeMultiplier={1.4}
      {...rest}
    />
  );
}
