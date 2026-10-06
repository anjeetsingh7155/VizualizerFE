import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import { useTheme } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function App() {
  const { isDark } = useTheme();
  const authStatus = useAuthStore((state) => state.status);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
  });

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const fontsReady = fontsLoaded || Boolean(fontError);
  const ready = fontsReady && authStatus !== 'loading';

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!fontsReady) return null;

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}
