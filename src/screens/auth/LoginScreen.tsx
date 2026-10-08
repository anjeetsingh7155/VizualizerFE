import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { BrandMark } from '../../components/ui/BrandMark';
import { FadeIn } from '../../components/ui/FadeIn';
import { FormMessage } from '../../components/ui/FormMessage';
import { CloseButton } from '../../components/ui/CloseButton';
import { TextField } from '../../components/inputs/TextField';
import { Button } from '../../components/buttons/Button';
import { useAuthStore } from '../../store/authStore';
import { useSavedStore } from '../../store/savedStore';
import { login } from '../../services/authService';
import { ApiError } from '../../services/api';
import { fieldErrors, loginSchema } from '../../utils/validation';
import { spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type Field = 'email' | 'password';

export function LoginScreen({ navigation, route }: Props) {
  const forSave = route.params?.reason === 'save';
  // Back to where the person was (the sample they wanted to save is saved automatically).
  const close = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Gallery' }));
  const completeSignIn = useAuthStore((state) => state.completeSignIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    setFormError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const { token, user } = await login(parsed.data);
      await completeSignIn(token, user);
      close();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fields) setErrors(error.fields);
        setFormError(error.message);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
      setSubmitting(false);
    }
  };

  return (
    <Screen edges={['top', 'bottom']} contentStyle={styles.content}>
      <CloseButton
        onPress={() => {
          // Closed without signing in: forget the sample they were trying to save.
          useSavedStore.getState().setPendingSave(null);
          close();
        }}
        disabled={submitting}
      />
      <FadeIn>
        <BrandMark />
        <AppText variant="display" style={styles.title}>
          Welcome back
        </AppText>
        <AppText variant="body" tone="muted">
          {forSave ? 'Sign in to save this sample to your collection.' : 'Sign in to see your saved samples.'}
        </AppText>
      </FadeIn>

      <FadeIn delay={120} style={styles.form}>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
          editable={!submitting}
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          placeholder="Your password"
          secure
          autoComplete="password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          editable={!submitting}
        />
        <FormMessage message={formError} />
        <Button title="Sign In" onPress={handleSubmit} loading={submitting} style={styles.submit} />
      </FadeIn>

      <View style={styles.footer}>
        <AppText variant="body" tone="muted">
          New to Vizualizer?{' '}
        </AppText>
        <Pressable
          onPress={() => navigation.replace('Register', route.params)}
          disabled={submitting}
          accessibilityRole="link"
          hitSlop={8}
        >
          <AppText variant="bodyMedium" tone="accent">
            Create an account
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.md },
  title: { marginTop: spacing.lg, marginBottom: spacing.sm },
  form: { marginTop: spacing.xxl },
  submit: { marginTop: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl, flexWrap: 'wrap' },
});
