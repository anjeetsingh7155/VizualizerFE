import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../ui/AppText';
import { Button } from '../buttons/Button';
import { radius, spacing, useTheme } from '../../theme';

interface UploadCardProps {
  title: string;
  hint: string;
  imageUri: string | null;
  /** True while a newly picked photo is being checked and compressed. */
  busy?: boolean;
  onPick: () => void;
  onRemove: () => void;
}

export function UploadCard({ title, hint, imageUri, busy = false, onPick, onRemove }: UploadCardProps) {
  const { colors } = useTheme();

  if (imageUri) {
    return (
      <View>
        <View>
          <Image
            source={{ uri: imageUri }}
            style={[styles.frame, { backgroundColor: colors.border }]}
            accessibilityLabel={`Selected image for ${title}`}
          />
          {busy ? (
            <View style={[styles.frame, styles.overlay]}>
              <ActivityIndicator color="#FFFFFF" />
            </View>
          ) : null}
        </View>
        <View style={styles.actions}>
          <Button
            title="Replace Image"
            variant="secondary"
            icon="swap-horizontal"
            onPress={onPick}
            disabled={busy}
            style={styles.flex}
          />
          <Button title="Remove" variant="ghost" icon="trash-outline" onPress={onRemove} disabled={busy} fullWidth={false} />
        </View>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPick}
      disabled={busy}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint="Opens the camera or your photo library"
      accessibilityState={{ busy, disabled: busy }}
      style={({ pressed }) => [
        styles.frame,
        styles.empty,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && { opacity: 0.8 },
      ]}
    >
      <View style={[styles.iconRing, { borderColor: colors.stone }]}>
        {busy ? <ActivityIndicator color={colors.accent} /> : <Ionicons name="add" size={26} color={colors.accent} />}
      </View>
      <AppText variant="bodyMedium">{busy ? 'Preparing image…' : title}</AppText>
      <AppText variant="caption" tone="muted" align="center" style={styles.hint}>
        {hint}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  frame: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.lg },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  empty: { borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  iconRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  hint: { marginTop: spacing.xs },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
});
