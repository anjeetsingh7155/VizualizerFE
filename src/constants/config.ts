/**
 * Where the app finds the Vizualizer server.
 * It is read ONLY from the .env file in the mobile folder:
 *   EXPO_PUBLIC_API_URL=http://192.168.1.20:5000/api/v1
 * (use your computer's Wi-Fi IP address, not "localhost" — the phone is a different device).
 * After changing .env, restart Expo with:  npx expo start -c
 */
const fromEnv = process.env.EXPO_PUBLIC_API_URL?.trim() ?? '';

export const API_URL = fromEnv.replace(/\/+$/, '');

/** Shown on screen when the address is missing, so it is clear what to fix. */
export const API_URL_MISSING_MESSAGE =
  'The server address is not set. Add EXPO_PUBLIC_API_URL to the .env file in the mobile folder, then restart Expo (npx expo start -c).';
