import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { FadeIn } from '../../components/ui/FadeIn';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { spacing } from '../../theme';

interface CreateStepLayoutProps {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function CreateStepLayout({ step, title, subtitle, children, footer }: CreateStepLayoutProps) {
  return (
    <Screen edges={[]}>
      <FadeIn>
        <StepIndicator current={step} total={3} />
        <AppText variant="title" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="body" tone="muted">
          {subtitle}
        </AppText>
      </FadeIn>
      <FadeIn delay={120} style={styles.body}>
        {children}
      </FadeIn>
      <View style={styles.footer}>{footer}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: spacing.lg, marginBottom: spacing.sm },
  body: { marginTop: spacing.xl },
  footer: { marginTop: 'auto', paddingTop: spacing.xl },
});
