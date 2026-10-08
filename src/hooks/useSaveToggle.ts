import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';
import type { GalleryItem } from '../types';
import { useAuthStore } from '../store/authStore';
import { useSavedStore } from '../store/savedStore';

/**
 * Save / unsave a sample. Guests are asked to sign in (or create an account) first;
 * the sample is then saved automatically once they are signed in.
 */
export function useSaveToggle() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const signedIn = useAuthStore((state) => state.status === 'signedIn');
  const toggle = useSavedStore((state) => state.toggle);
  const setPendingSave = useSavedStore((state) => state.setPendingSave);

  return useCallback(
    (item: GalleryItem) => {
      if (!signedIn) {
        setPendingSave(item.id);
        navigation.navigate('Login', { reason: 'save' });
        return;
      }
      toggle(item).catch((err: unknown) =>
        Alert.alert('Could not update', err instanceof Error ? err.message : 'Please try again.'),
      );
    },
    [signedIn, toggle, setPendingSave, navigation],
  );
}
