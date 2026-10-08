import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';
import type { GalleryItem } from '../../types';
import { AppText } from '../../components/ui/AppText';
import { BrandMark } from '../../components/ui/BrandMark';
import { EmptyState } from '../../components/ui/EmptyState';
import { GalleryList } from '../../components/gallery/GalleryList';
import { getGallery } from '../../services/galleryService';
import { ApiError } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useSavedStore } from '../../store/savedStore';
import { spacing, useTheme } from '../../theme';

/** The first screen: every sample shown in AI-created rooms. Open to everyone, no sign-in needed. */
export function GalleryScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const status = useAuthStore((state) => state.status);
  const remember = useSavedStore((state) => state.remember);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFirstPage = useCallback(async () => {
    try {
      const result = await getGallery(1);
      setItems(result.items);
      setHasMore(result.hasMore);
      setPage(1);
      setError(null);
      remember(result.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to load the gallery.');
    }
  }, [remember]);

  // Load on open, and again after signing in or out (so bookmarks are correct).
  useEffect(() => {
    let active = true;
    setLoading(true);
    void loadFirstPage().finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [loadFirstPage, status]);

  const refresh = async () => {
    setRefreshing(true);
    await loadFirstPage();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (!hasMore || loadingMore || loading) return;
    setLoadingMore(true);
    try {
      const result = await getGallery(page + 1);
      setItems((current) => [...current, ...result.items.filter((i) => !current.some((c) => c.id === i.id))]);
      setHasMore(result.hasMore);
      setPage(page + 1);
      remember(result.items);
    } catch {
      // Ignore: pulling down to refresh tries again.
    } finally {
      setLoadingMore(false);
    }
  };

  const header = (
    <View style={styles.header}>
      <BrandMark />
      <AppText variant="overline" tone="accent" style={styles.overline}>
        Gallery
      </AppText>
      <AppText variant="title" style={styles.title}>
        Explore Surfaces
      </AppText>
      <AppText variant="body" tone="muted">
        Marble, granite and tiles shown in real rooms. Tap a sample to see every room.
      </AppText>
    </View>
  );

  let empty;
  if (loading) {
    empty = (
      <View>
        {[0, 1].map((i) => (
          <View key={i} style={[styles.skeleton, { backgroundColor: colors.border }]} />
        ))}
      </View>
    );
  } else if (error) {
    empty = <EmptyState icon="cloud-offline-outline" title="Can't load the gallery" message={error} actionLabel="Try Again" onAction={refresh} />;
  } else {
    empty = <EmptyState icon="images-outline" title="Nothing here yet" message="New surface visualizations will appear here soon." />;
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.flex, { backgroundColor: colors.background }]}>
      <GalleryList
        items={loading || error ? [] : items}
        onOpen={(item) => navigation.navigate('Visualization', { id: item.id, item })}
        header={header}
        empty={empty}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={loadMore}
        loadingMore={loadingMore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingTop: spacing.lg, marginBottom: spacing.lg },
  overline: { marginTop: spacing.lg },
  title: { marginTop: spacing.sm, marginBottom: spacing.xs },
  skeleton: { aspectRatio: 4 / 3.9, borderRadius: 16, marginBottom: spacing.lg, opacity: 0.6 },
});
