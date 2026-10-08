import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import type { GalleryItem } from '../../types';
import { Screen } from '../../components/ui/Screen';
import { AppText } from '../../components/ui/AppText';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/buttons/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ImageViewer } from '../../components/gallery/ImageViewer';
import { getGalleryItem } from '../../services/galleryService';
import { ApiError } from '../../services/api';
import { useSavedStore } from '../../store/savedStore';
import { useSaveToggle } from '../../hooks/useSaveToggle';
import { SPACE_LABEL } from '../../constants/spaces';
import { formatDate } from '../../utils/format';
import { radius, spacing, useTheme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Visualization'>;

/** One sample shown in every room, with a Save button. Tap a picture to see it full screen. */
export function VisualizationScreen({ route }: Props) {
  const { colors } = useTheme();
  const [item, setItem] = useState<GalleryItem | null>(route.params.item ?? null);
  const [error, setError] = useState<string | null>(null);
  const [viewing, setViewing] = useState<number | null>(null);
  const saved = useSavedStore((state) => (item ? Boolean(state.savedIds[item.id]) : false));
  const toggleSave = useSaveToggle();

  // Always fetch the latest version (pictures may have been added since).
  useEffect(() => {
    let active = true;
    getGalleryItem(route.params.id)
      .then((fresh) => active && setItem(fresh))
      .catch((err: unknown) => active && setError(err instanceof ApiError ? err.message : 'Unable to load this sample.'));
    return () => {
      active = false;
    };
  }, [route.params.id]);

  if (!item) {
    return (
      <Screen edges={[]}>
        {error ? (
          <EmptyState icon="alert-circle-outline" title="Not available" message={error} />
        ) : (
          <ActivityIndicator color={colors.accent} style={styles.loading} />
        )}
      </Screen>
    );
  }

  return (
    <>
      <Screen edges={[]}>
        <FadeIn style={styles.header}>
          <Image source={{ uri: item.textureImageUrl }} style={[styles.sample, { borderColor: colors.border }]} />
          <View style={styles.headerText}>
            <AppText variant="overline" tone="accent">
              Surface
            </AppText>
            <AppText variant="title" style={styles.title}>
              {item.textureName}
            </AppText>
            <AppText variant="caption" tone="muted">
              {item.images.length} rooms · {formatDate(item.createdAt)}
            </AppText>
          </View>
        </FadeIn>

        <Button
          title={saved ? 'Saved' : 'Save Sample'}
          icon={saved ? 'bookmark' : 'bookmark-outline'}
          variant={saved ? 'secondary' : 'accent'}
          onPress={() => toggleSave(item)}
          accessibilityHint={saved ? 'Removes it from your saved samples' : 'Adds it to your saved samples'}
          style={styles.save}
        />

        {item.images.map((image, index) => (
          <FadeIn key={image.id} delay={80 + index * 60} style={styles.picture}>
            <Pressable
              onPress={() => setViewing(index)}
              accessibilityRole="imagebutton"
              accessibilityLabel={`${SPACE_LABEL[image.space]}, open full screen`}
              style={({ pressed }) => [pressed && { opacity: 0.85 }]}
            >
              <Image source={{ uri: image.imageUrl }} style={[styles.image, { backgroundColor: colors.border }]} resizeMode="cover" />
            </Pressable>
            <AppText variant="label" style={styles.caption}>
              {SPACE_LABEL[image.space]}
            </AppText>
          </FadeIn>
        ))}
      </Screen>

      <ImageViewer images={item.images} startIndex={viewing} onClose={() => setViewing(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  loading: { marginTop: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: spacing.sm, marginBottom: spacing.lg },
  sample: { width: 72, height: 72, borderRadius: radius.md, borderWidth: 1, marginRight: spacing.md },
  headerText: { flex: 1 },
  title: { marginVertical: spacing.xs },
  save: { marginBottom: spacing.xl },
  picture: { marginBottom: spacing.lg },
  image: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.lg },
  caption: { marginTop: spacing.sm },
});
