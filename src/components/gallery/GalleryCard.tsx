import { Image, Pressable, StyleSheet, View } from 'react-native';
import type { GalleryItem } from '../../types';
import { AppText } from '../ui/AppText';
import { SaveButton } from './SaveButton';
import { formatDate } from '../../utils/format';
import { radius, spacing, useTheme } from '../../theme';

interface GalleryCardProps {
  item: GalleryItem;
  onPress: () => void;
}

/** A sample in the gallery: its first room picture, name, number of rooms and a Save button. */
export function GalleryCard({ item, onPress }: GalleryCardProps) {
  const { colors } = useTheme();
  const cover = item.images[0]?.imageUrl ?? item.textureImageUrl;
  const rooms = item.images.length;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.textureName}, ${rooms} room${rooms === 1 ? '' : 's'}`}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.imageWrap, { backgroundColor: colors.border }]}>
        <Image source={{ uri: cover }} style={styles.image} resizeMode="cover" accessibilityIgnoresInvertColors />
        <View style={styles.save}>
          <SaveButton item={item} />
        </View>
      </View>
      <View style={styles.info}>
        <Image source={{ uri: item.textureImageUrl }} style={[styles.sample, { borderColor: colors.border }]} />
        <View style={styles.text}>
          <AppText variant="heading" numberOfLines={2}>
            {item.textureName}
          </AppText>
          <AppText variant="caption" tone="muted">
            {rooms} room{rooms === 1 ? '' : 's'} · {formatDate(item.createdAt)}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.lg, overflow: 'hidden' },
  imageWrap: { aspectRatio: 4 / 3 },
  image: { width: '100%', height: '100%' },
  save: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  info: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  sample: { width: 44, height: 44, borderRadius: radius.sm, borderWidth: 1, marginRight: spacing.md },
  text: { flex: 1 },
});
