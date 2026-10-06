import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { Button } from '../buttons/Button';
import { spacing, useTheme } from '../../theme';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconRing, { borderColor: colors.stone }]}>
        <Ionicons name={icon} size={26} color={colors.accent} />
      </View>
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      <AppText variant="body" tone="muted" align="center" style={styles.message}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} fullWidth={false} style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg },
  iconRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  message: { marginTop: spacing.sm, maxWidth: 300 },
  action: { marginTop: spacing.lg, paddingHorizontal: spacing.xl },
});
