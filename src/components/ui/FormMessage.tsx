import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { radius, spacing, useTheme } from '../../theme';

/** A clear error message shown above a form button (e.g. "Incorrect email or password."). */
export function FormMessage({ message }: { message: string | null }) {
  const { colors } = useTheme();
  if (!message) return null;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.box, { borderColor: colors.error }]}
    >
      <Ionicons name="alert-circle-outline" size={18} color={colors.error} />
      <AppText variant="caption" tone="error" style={styles.text}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  text: { flex: 1, marginLeft: spacing.sm },
});
