import { StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '../../navigation/types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { FadeIn } from '../../components/ui/FadeIn';
import { EmptyState } from '../../components/ui/EmptyState';
import { spacing } from '../../theme';

type Props = BottomTabScreenProps<AppTabParamList, 'History'>;

export function HistoryScreen({ navigation }: Props) {
  return (
    <Screen>
      <FadeIn style={styles.header}>
        <AppText variant="overline" tone="accent">
          Archive
        </AppText>
        <AppText variant="title" style={styles.title}>
          My Visualizations
        </AppText>
      </FadeIn>
      <FadeIn delay={120}>
        <EmptyState
          icon="images-outline"
          title="No visualizations yet."
          message="Bring your ideas to life by creating your first AI visualization."
          actionLabel="Create Visualization"
          onAction={() => navigation.navigate('Create', { screen: 'CreateIntro' })}
        />
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.lg, marginBottom: spacing.lg },
  title: { marginTop: spacing.sm },
});
