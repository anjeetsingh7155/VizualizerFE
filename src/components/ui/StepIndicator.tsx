import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { spacing, useTheme } from '../../theme';

interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  const { colors } = useTheme();
  return (
    <View accessible accessibilityLabel={`Step ${current} of ${total}`}>
      <AppText variant="overline" tone="muted">
        Step {current} of {total}
      </AppText>
      <View style={styles.bars}>
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            style={[styles.bar, { backgroundColor: i < current ? colors.accent : colors.stone }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  bar: { flex: 1, height: 2 },
});
