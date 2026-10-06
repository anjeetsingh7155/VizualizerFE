import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../theme';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

export function RootNavigator() {
  const status = useAuthStore((state) => state.status);
  const { colors, isDark } = useTheme();

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.accent} accessibilityLabel="Loading" />
      </View>
    );
  }

  const base = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.accent,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {status === 'signedIn' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
