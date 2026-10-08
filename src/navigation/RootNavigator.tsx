import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { useAuthStore } from '../store/authStore';
import { useSavedStore } from '../store/savedStore';
import { useTheme } from '../theme';
import { AppNavigator } from './AppNavigator';
import { VisualizationScreen } from '../screens/gallery/VisualizationScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Everyone starts in the gallery — no sign-in needed to look around.
 * Sign in / Create account open on top when someone wants to save a sample.
 */
export function RootNavigator() {
  const status = useAuthStore((state) => state.status);
  const { colors, isDark } = useTheme();

  // Keep the saved list in step with signing in and out.
  useEffect(() => {
    if (status === 'signedIn') void useSavedStore.getState().afterSignIn();
    if (status === 'signedOut') {
      const pending = useSavedStore.getState().pendingSaveId;
      useSavedStore.getState().clear();
      useSavedStore.getState().setPendingSave(pending);
    }
  }, [status]);

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
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="Main" component={AppNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="Visualization"
          component={VisualizationScreen}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.background },
          }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
