import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';
import { AppText } from '../../components/ui/AppText';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/buttons/Button';
import { GalleryList } from '../../components/gallery/GalleryList';
import { useAuthStore } from '../../store/authStore';
import { useSavedStore } from '../../store/savedStore';
import { spacing, useTheme } from '../../theme';

/** Saved samples. Guests are invited to sign in or create an account. */
export function SavedScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const signedIn = useAuthStore((state) => state.status === 'signedIn');
  const { items, loading, error, load } = useSavedStore();

  const header = (
    <View style={styles.header}>
      <AppText variant="overline" tone="accent">
        Collection
      </AppText>
      <AppText variant="title" style={styles.title}>
        Saved Samples
      </AppText>
    </View>
  );

  if (!signedIn) {
    return (
      <SafeAreaView edges={['top']} style={[styles.flex, styles.padded, { backgroundColor: colors.background }]}>
        {header}
        <EmptyState
          icon="bookmark-outline"
          title="Save your favourite surfaces"
          message="Sign in or create a free account to save samples and find them here anytime."
        />
        <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        <Button title="Create Account" variant="secondary" onPress={() => navigation.navigate('Register')} style={styles.second} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.flex, { backgroundColor: colors.background }]}>
      <GalleryList
        items={items}
        onOpen={(item) => navigation.navigate('Visualization', { id: item.id, item })}
        header={<View style={styles.listHeader}>{header}</View>}
        empty={
          loading ? undefined : error ? (
            <EmptyState icon="cloud-offline-outline" title="Can't load saved samples" message={error} actionLabel="Try Again" onAction={() => void load()} />
          ) : (
            <EmptyState
              icon="bookmark-outline"
              title="No saved samples yet"
              message="Tap the bookmark on any sample in the gallery to keep it here."
              actionLabel="Browse Gallery"
              onAction={() => navigation.navigate('Main', { screen: 'Gallery' })}
            />
          )
        }
        refreshing={loading}
        onRefresh={() => void load()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  padded: { paddingHorizontal: spacing.lg },
  header: { paddingTop: spacing.lg, marginBottom: spacing.lg },
  listHeader: {},
  title: { marginTop: spacing.sm },
  second: { marginTop: spacing.md },
});
