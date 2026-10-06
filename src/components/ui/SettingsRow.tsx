import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { spacing, useTheme } from '../../theme';

interface SettingsRowProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  hint?: string;
  onPress?: () => void;
  right?: ReactNode;
  destructive?: boolean;
  last?: boolean;
}

export function SettingsRow({ icon, label, hint, onPress, right, destructive, last }: SettingsRowProps) {
  const { colors } = useTheme();
  const color = destructive ? colors.error : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={({ pressed }) => [
        styles.row,
        !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
        pressed && { opacity: 0.6 },
      ]}
    >
      <Ionicons name={icon} size={20} color={destructive ? colors.error : colors.mutedText} />
      <AppText variant="bodyMedium" style={[styles.label, { color }]}>
        {label}
      </AppText>
      <View>{right ?? (onPress && !destructive ? <Ionicons name="chevron-forward" size={18} color={colors.stone} /> : null)}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 56, paddingHorizontal: spacing.md },
  label: { flex: 1, marginLeft: spacing.md },
});
