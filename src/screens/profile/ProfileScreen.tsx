import { StyleSheet, Switch, View } from 'react-native';
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
            {getInitials(user?.name ?? '')}
          </AppText>
        </View>
        <View style={styles.identityText}>
          <AppText variant="heading">{user?.name}</AppText>
          <AppText variant="body" tone="muted">
            {user?.email}
          </AppText>
          {user ? (
            <AppText variant="caption" tone="muted">
              Member since {formatMonthYear(user.createdAt)}
            </AppText>
          ) : null}
        </View>
      </FadeIn>

      <FadeIn delay={180}>
        <View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SettingsRow icon="person-outline" label="Edit Profile" hint="Available soon" />
          <SettingsRow icon="lock-closed-outline" label="Change Password" hint="Available soon" />
          <SettingsRow
            icon="moon-outline"
            label="Dark Mode"
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
});
