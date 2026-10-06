import * as SecureStore from 'expo-secure-store';

// Stored in the phone's encrypted keychain/keystore, not in plain storage.
const TOKEN_KEY = 'vizualizer_access_token';

export const tokenStorage = {
  get: () => SecureStore.getItemAsync(TOKEN_KEY),
  set: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};
