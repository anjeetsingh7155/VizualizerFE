import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { spacing, useTheme } from '../../theme';

export function BrandMark({ align = 'flex-start' }: { align?: 'flex-start' | 'center' }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: align }}>
      <AppText variant="overline" tone="accent" style={styles.wordmark} accessibilityRole="header">
        Vizualizer
      </AppText>
      <View style={[styles.rule, { backgroundColor: colors.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: { letterSpacing: 6, fontSize: 12 },
  rule: { width: 28, height: 1, marginTop: spacing.sm },
});
