import Constants from 'expo-constants';

/**
 * Where the app finds the Vizualizer server.
 * - If EXPO_PUBLIC_API_URL is set (e.g. in mobile/.env), that is used.
 * - Otherwise, during development, it uses the same computer that runs Expo,
 *   on port 5000 (so it works on a phone on the same Wi-Fi without extra setup).
 */
function resolveApiUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, '');

  const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.1.20:8081"
  const host = hostUri?.split(':')[0];
  return `http://${host || 'localhost'}:5000/api/v1`;
}

export const API_URL = resolveApiUrl();
