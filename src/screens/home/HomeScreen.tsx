import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '../../navigation/types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { BrandMark } from '../../components/ui/BrandMark';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/buttons/Button';
import { useAuthStore } from '../../store/authStore';
import { getFirstName, getGreeting } from '../../utils/format';
import { radius, spacing, useTheme } from '../../theme';

type Props = BottomTabScreenProps<AppTabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const user = useAuthStore((state) => state.user);
  const startDesigning = () => navigation.navigate('Create', { screen: 'CreateIntro' });

  return (
    <Screen>
      <FadeIn style={styles.header}>
        <BrandMark />
        <AppText variant="title" style={styles.greeting}>
          {getGreeting()},{'\n'}
          {getFirstName(user?.name ?? '')}
        </AppText>
      </FadeIn>

      <FadeIn delay={120}>
        <View style={[styles.hero, { backgroundColor: colors.inverseSurface }]}>
          <AppText variant="overline" style={{ color: colors.accent }}>
            AI Visualization
          </AppText>
          <AppText variant="display" tone="inverse" style={styles.heroTitle}>
            Transform Your Space
          </AppText>
          <AppText variant="body" style={[styles.heroBody, { color: colors.stone }]}>
            Visualize your tiles and marble before making the final decision.
          </AppText>
          <Button
            title="Start Designing"
            variant="accent"
            icon="arrow-forward"
            onPress={startDesigning}
            accessibilityHint="Opens the create visualization flow"
          />
        </View>
      </FadeIn>

      <FadeIn delay={220} style={styles.section}>
        <AppText variant="heading">Recent Visualizations</AppText>
        <View style={[styles.recentEmpty, { borderColor: colors.border }]}>
          <AppText variant="body" tone="muted" align="center">
            Your visualizations will appear here once you create your first design.
          </AppText>
        </View>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.lg, marginBottom: spacing.xl },
  greeting: { marginTop: spacing.lg },
  hero: { borderRadius: radius.lg, padding: spacing.lg, paddingTop: spacing.xl },
  heroTitle: { marginTop: spacing.md },
  heroBody: { marginTop: spacing.sm, marginBottom: spacing.xl, maxWidth: 280 },
  section: { marginTop: spacing.xxl },
  recentEmpty: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
});
