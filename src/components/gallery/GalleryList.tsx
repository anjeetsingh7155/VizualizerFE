import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { GalleryItem } from '../../types';
import { GalleryCard } from './GalleryCard';
import { spacing, useTheme } from '../../theme';

interface GalleryListProps {
  items: GalleryItem[];
  onOpen: (item: GalleryItem) => void;
  header?: ReactElement;
  empty?: ReactElement;
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached?: () => void;
  loadingMore?: boolean;
}

/** Scrollable list of gallery cards: one column on phones, two on tablets. */
export function GalleryList({ items, onOpen, header, empty, refreshing, onRefresh, onEndReached, loadingMore }: GalleryListProps) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 2 : 1;

  return (
    <FlatList
      key={columns}
      data={items}
      numColumns={columns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.cell, columns > 1 && styles.half]}>
          <GalleryCard item={item} onPress={() => onOpen(item)} />
        </View>
      )}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.accent} style={styles.more} /> : null}
      contentContainerStyle={styles.content}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} colors={[colors.accent]} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, flexGrow: 1 },
  cell: { marginBottom: spacing.lg },
  half: { flex: 1 },
  row: { gap: spacing.lg },
  more: { marginVertical: spacing.lg },
});
