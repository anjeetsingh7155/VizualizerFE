import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { BrandMark } from '../../components/ui/BrandMark';
import { FadeIn } from '../../components/ui/FadeIn';
import { FormMessage } from '../../components/ui/FormMessage';
import { TextField } from '../../components/inputs/TextField';
import { Button } from '../../components/buttons/Button';
import { useAuthStore } from '../../store/authStore';
import { register } from '../../services/authService';
import { ApiError } from '../../services/api';
import { fieldErrors, registerSchema } from '../../utils/validation';
import { spacing } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;
type Field = 'name' | 'email' | 'password' | 'confirmPassword';

export function RegisterScreen({ navigation }: Props) {
  const completeSignIn = useAuthStore((state) => state.completeSignIn);
  const [form, setForm] = useState<Record<Field, string>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: Field) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (submitting) return;
    setFormError(null);

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const { token, user } = await register(parsed.data);
      await completeSignIn(token, user);
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
      <FadeIn>
        <BrandMark />
        <AppText variant="display" style={styles.title}>
          Create your account
        </AppText>
        <AppText variant="body" tone="muted">
          Visualize tiles and marble in your own space.
        </AppText>
      </FadeIn>

      <FadeIn delay={120} style={styles.form}>
        <TextField
          label="Full Name"
          value={form.name}
          onChangeText={update('name')}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
          textContentType="name"
          editable={!submitting}
        />
        <TextField
          label="Email"
          value={form.email}
          onChangeText={update('email')}
          error={errors.email}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={!submitting}
        />
        <TextField
          label="Password"
          value={form.password}
          onChangeText={update('password')}
          error={errors.password}
          placeholder="At least 8 characters"
          secure
          autoComplete="new-password"
          textContentType="newPassword"
          editable={!submitting}
        />
        <TextField
          label="Confirm Password"
          value={form.confirmPassword}
          onChangeText={update('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          secure
          textContentType="newPassword"
          onSubmitEditing={handleSubmit}
          editable={!submitting}
        />
        <FormMessage message={formError} />
        <Button title="Create Account" onPress={handleSubmit} loading={submitting} style={styles.submit} />
      </FadeIn>

      <View style={styles.footer}>
        <AppText variant="body" tone="muted">
          Already have an account?{' '}
        </AppText>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          disabled={submitting}
          accessibilityRole="link"
          hitSlop={8}
        >
          <AppText variant="bodyMedium" tone="accent">
            Sign in
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xxl },
  title: { marginTop: spacing.xl, marginBottom: spacing.sm },
  form: { marginTop: spacing.xl },
  submit: { marginTop: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl, flexWrap: 'wrap' },
});
