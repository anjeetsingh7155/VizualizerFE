import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { GalleryItem } from '../../types';
import { useSavedStore } from '../../store/savedStore';
import { useSaveToggle } from '../../hooks/useSaveToggle';

/** Round bookmark button shown on top of a picture. */
export function SaveButton({ item }: { item: GalleryItem }) {
  const saved = useSavedStore((state) => Boolean(state.savedIds[item.id]));
  const toggleSave = useSaveToggle();

  return (
    <Pressable
      onPress={() => toggleSave(item)}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={saved ? `Remove ${item.textureName} from saved` : `Save ${item.textureName}`}
      accessibilityState={{ selected: saved }}
      style={({ pressed }) => [styles.button, pressed && { transform: [{ scale: 0.92 }] }]}
    >
      <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? '#C9A66B' : '#FFFFFF'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 23, 23, 0.55)',
  },
});
