import { StyleSheet, Switch, View } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/buttons/Button';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { FadeIn } from '../../components/ui/FadeIn';
import { SettingsRow } from '../../components/ui/SettingsRow';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { formatMonthYear, getInitials } from '../../utils/format';
import { radius, spacing, useTheme } from '../../theme';

export function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const darkModeRow = (last: boolean) => (
    <SettingsRow
      icon="moon-outline"
      label="Dark Mode"
      last={last}
      right={
        <Switch
          value={isDark}
          onValueChange={toggleMode}
          trackColor={{ false: colors.stone, true: colors.accent }}
          thumbColor="#FFFFFF"
          accessibilityLabel="Dark mode"
        />
      }
    />
  );

  // Browsing as a guest: offer to sign in or create an account.
  if (!user) {
    return (
      <Screen>
        <FadeIn style={styles.header}>
          <AppText variant="overline" tone="accent">
            Account
          </AppText>
          <AppText variant="title" style={styles.title}>
            Profile
          </AppText>
          <AppText variant="body" tone="muted" style={styles.guestText}>
            You are browsing as a guest. Sign in or create a free account to save samples.
          </AppText>
        </FadeIn>
        <FadeIn delay={100}>
          <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
          <Button title="Create Account" variant="secondary" onPress={() => navigation.navigate('Register')} style={styles.second} />
          <View style={[styles.group, styles.settings, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {darkModeRow(true)}
          </View>
        </FadeIn>
      </Screen>
    );
  }

  return (
    <Screen>
      <FadeIn style={styles.header}>
        <AppText variant="overline" tone="accent">
          Account
        </AppText>
        <AppText variant="title" style={styles.title}>
          Profile
        </AppText>
      </FadeIn>

      <FadeIn delay={100} style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: colors.inverseSurface }]}>
          <AppText variant="heading" style={{ color: colors.accent }}>
            {getInitials(user.name)}
          </AppText>
        </View>
        <View style={styles.identityText}>
          <AppText variant="heading">{user.name}</AppText>
          <AppText variant="body" tone="muted">
            {user.email}
          </AppText>
          <AppText variant="caption" tone="muted">
            Member since {formatMonthYear(user.createdAt)}
          </AppText>
        </View>
      </FadeIn>

      <FadeIn delay={180}>
        <View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SettingsRow icon="person-outline" label="Edit Profile" hint="Available soon" />
          <SettingsRow icon="lock-closed-outline" label="Change Password" hint="Available soon" />
          {darkModeRow(false)}
          <SettingsRow icon="notifications-outline" label="Notifications" hint="Available soon" />
          <SettingsRow icon="shield-checkmark-outline" label="Privacy" hint="Available soon" last />
        </View>

        <View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SettingsRow icon="log-out-outline" label="Logout" onPress={signOut} destructive last />
        </View>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.lg, marginBottom: spacing.xl },
  title: { marginTop: spacing.sm },
  identity: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  avatar: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  identityText: { flex: 1, marginLeft: spacing.md },
  group: { borderWidth: 1, borderRadius: radius.lg, overflow: 'hidden', marginBottom: spacing.lg },
  guestText: { marginTop: spacing.sm },
  second: { marginTop: spacing.md },
  settings: { marginTop: spacing.xl },
});
