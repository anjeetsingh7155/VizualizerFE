import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { GalleryImage } from '../../types';
import { AppText } from '../ui/AppText';
import { SPACE_LABEL } from '../../constants/spaces';
import { spacing } from '../../theme';

interface ImageViewerProps {
  images: GalleryImage[];
  /** Index of the picture to show first; null = closed. */
  startIndex: number | null;
  onClose: () => void;
}

/** Full-screen pictures on a dark background; swipe left/right to see the other rooms. */
export function ImageViewer({ images, startIndex, onClose }: ImageViewerProps) {
  return (
    <Modal visible={startIndex !== null} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <SafeAreaView style={styles.container}>
        {startIndex !== null ? <Pager key={startIndex} images={images} start={startIndex} onClose={onClose} /> : null}
      </SafeAreaView>
    </Modal>
  );
}

function Pager({ images, start, onClose }: { images: GalleryImage[]; start: number; onClose: () => void }) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(start);
  // The pictures fill the space below the top bar (measured once it is shown).
  const [pageHeight, setPageHeight] = useState(0);
  const current = images[index];

  return (
    <>
      <View style={styles.top}>
        <AppText variant="label" style={styles.light}>
          {current ? SPACE_LABEL[current.space] : ''}
          {images.length > 1 ? `  ·  ${index + 1} / ${images.length}` : ''}
        </AppText>
        <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close" style={styles.close}>
          <Ionicons name="close" size={26} color="#FFFFFF" />
        </Pressable>
      </View>
      <FlatList
        data={images}
        style={styles.pager}
        onLayout={(e) => setPageHeight(e.nativeEvent.layout.height)}
        horizontal
        pagingEnabled
        initialScrollIndex={start}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        keyExtractor={(img) => img.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={[styles.page, { width, height: pageHeight }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="contain" accessibilityLabel={SPACE_LABEL[item.space]} />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0C0A09' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  light: { color: '#F7F5F2' },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  pager: { flex: 1 },
  page: { flex: 1, justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
});
