import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CreateStackParamList } from '../../navigation/types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/buttons/Button';
import { spacing, useTheme } from '../../theme';

type Props = NativeStackScreenProps<CreateStackParamList, 'CreateIntro'>;

const steps = [
  { title: 'Choose Your Surface', body: 'Upload the tile, marble or texture you want to visualize.' },
  { title: 'Choose Your Space', body: 'Upload a photo of the room, wall or floor you want to transform.' },
  { title: 'Describe Your Vision', body: 'Tell us how the surface should be applied.' },
];

export function CreateVisualizationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  return (
    <Screen>
      <FadeIn style={styles.header}>
        <AppText variant="overline" tone="accent">
          New Visualization
        </AppText>
        <AppText variant="title" style={styles.title}>
          Three steps to your new space
        </AppText>
      </FadeIn>

      {steps.map((step, index) => (
        <FadeIn key={step.title} delay={100 + index * 80}>
          <View style={[styles.step, { borderBottomColor: colors.border }]}>
            <AppText variant="heading" tone="accent" style={styles.number}>
              {String(index + 1).padStart(2, '0')}
            </AppText>
            <View style={styles.stepText}>
              <AppText variant="bodyMedium">{step.title}</AppText>
              <AppText variant="caption" tone="muted">
                {step.body}
              </AppText>
            </View>
          </View>
        </FadeIn>
      ))}

      <View style={styles.footer}>
        <Button title="Begin" icon="arrow-forward" onPress={() => navigation.navigate('TextureUpload')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.lg, marginBottom: spacing.xl },
  title: { marginTop: spacing.sm },
  step: { flexDirection: 'row', paddingVertical: spacing.lg, borderBottomWidth: StyleSheet.hairlineWidth },
  number: { width: 48 },
  stepText: { flex: 1 },
  footer: { marginTop: 'auto', paddingTop: spacing.xl },
});
