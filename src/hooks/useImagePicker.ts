import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { SelectedImage } from '../types';
import { ImageValidationError, prepareImage } from '../utils/imageProcessing';

type Source = 'camera' | 'library';

async function launch(source: Source): Promise<ImagePicker.ImagePickerAsset | null> {
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

  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 1 };
  const result =
    source === 'camera'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

  if (result.canceled) return null;
  return result.assets[0] ?? null;
}

interface PickHandlers {
  onPicked: (image: SelectedImage) => void;
  /** Called with true while the photo is being checked and compressed, then false. */
  onBusyChange?: (busy: boolean) => void;
}

/** Shows "Take Photo / Choose from Library", then checks and compresses the chosen photo. */
export function useImagePicker() {
  return useCallback(({ onPicked, onBusyChange }: PickHandlers) => {
    const handle = async (source: Source) => {
      const asset = await launch(source);
      if (!asset) return;

      onBusyChange?.(true);
      try {
        onPicked(await prepareImage(asset));
      } catch (error) {
        if (error instanceof ImageValidationError) {
          Alert.alert('Image not supported', error.message);
        } else {
          Alert.alert('Something went wrong', 'Unable to prepare this image. Please try another photo.');
        }
      } finally {
        onBusyChange?.(false);
      }
    };

    Alert.alert('Add Image', undefined, [
      { text: 'Take Photo', onPress: () => void handle('camera') },
      { text: 'Choose from Library', onPress: () => void handle('library') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, []);
}
