import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Source = 'camera' | 'library';

async function launch(source: Source): Promise<string | null> {
  if (source === 'camera') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access needed', 'Please allow camera access in your device settings.');
      return null;
    }
  } else {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Please allow photo library access in your device settings.');
      return null;
    }
  }

  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.9 };
  const result =
    source === 'camera'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

  if (result.canceled) return null;
  return result.assets[0]?.uri ?? null;
}

/** Shows a "Take Photo / Choose from Library" choice and returns the picked image URI. */
export function useImagePicker() {
  return useCallback(
    (onPicked: (uri: string) => void) => {
      const handle = (source: Source) => {
        launch(source)
          .then((uri) => {
            if (uri) onPicked(uri);
          })
          .catch(() => Alert.alert('Something went wrong', 'Unable to open the image picker.'));
      };

      Alert.alert('Add Image', undefined, [
        { text: 'Take Photo', onPress: () => handle('camera') },
        { text: 'Choose from Library', onPress: () => handle('library') },
        { text: 'Cancel', style: 'cancel' },
      ]);
    },
    [],
  );
}
