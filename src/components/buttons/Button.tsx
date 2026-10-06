import { useRef, type ComponentProps } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../ui/AppText';
import { radius, spacing, useTheme } from '../../theme';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  icon?: ComponentProps<typeof Ionicons>['name'];
  fullWidth?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

  const variants: Record<Variant, { bg: string; fg: string; border: string }> = {
    primary: { bg: colors.primary, fg: colors.background, border: colors.primary },
    accent: { bg: colors.accent, fg: '#171717', border: colors.accent },
    secondary: { bg: 'transparent', fg: colors.text, border: colors.stone },
    ghost: { bg: 'transparent', fg: colors.text, border: 'transparent' },
  };
  const v = variants[variant];

  const animateTo = (value: number) =>
    Animated.spring(scale, { toValue: value, useNativeDriver: true, speed: 40, bounciness: 0 }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, fullWidth && styles.fullWidth, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        style={[
          styles.base,
          { backgroundColor: v.bg, borderColor: v.border },
          isDisabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={v.fg} />
        ) : (
          <View style={styles.content}>
            {icon ? <Ionicons name={icon} size={18} color={v.fg} style={styles.icon} /> : null}
            <AppText variant="label" style={{ color: v.fg }}>
              {title}
            </AppText>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: { alignSelf: 'stretch' },
  base: {
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: spacing.sm },
  disabled: { opacity: 0.4 },
});
