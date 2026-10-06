import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CreateStepLayout } from './CreateStepLayout';
import { AppText } from '../../components/ui/AppText';
import { Button } from '../../components/buttons/Button';
import { useGenerationStore } from '../../store/generationStore';
import { fonts, radius, spacing, useTheme } from '../../theme';

const MAX_LENGTH = 500;

const suggestions = [
  'Apply to floor',
  'Apply to wall',
  'Apply to both floor and wall',
  'Keep furniture unchanged',
  'Make it luxury',
  'Make it realistic',
];

const PLACEHOLDER =
  'Apply this marble texture to the floor while keeping the existing furniture, lighting and room structure unchanged. Make the result realistic and premium.';

export function PromptScreen() {
  const { colors } = useTheme();
  const { prompt, setPrompt, textureUri, roomUri } = useGenerationStore();

  const toggleSuggestion = (text: string) => {
    if (prompt.includes(text)) {
      setPrompt(
        prompt
          .replace(text, '')
          .replace(/\.\s*\./g, '.')
          .replace(/\s{2,}/g, ' ')
          .replace(/^[\s.]+/, '')
          .trim(),
      );
    } else {
      const base = prompt.trim();
      const joined = base ? `${base.replace(/\.$/, '')}. ${text}.` : `${text}.`;
      setPrompt(joined.slice(0, MAX_LENGTH));
    }
  };

  const canCreate = Boolean(textureUri && roomUri && prompt.trim());

  const handleCreate = () => {
    // Phase 2: the generation request is connected in Phase 6 (API) and Phase 7 (AI).
    Alert.alert('Coming in a later phase', 'Creating the visualization will be connected once the server and AI are set up.');
  };

  return (
    <CreateStepLayout
      step={3}
      title="Describe Your Vision"
      subtitle="How would you like the surface to look?"
      footer={
        <View>
          {!canCreate ? (
            <AppText variant="caption" tone="muted" align="center" style={styles.helper}>
              Add both images and a description to continue.
            </AppText>
          ) : null}
          <Button title="Create Visualization" icon="sparkles-outline" disabled={!canCreate} onPress={handleCreate} />
        </View>
      }
    >
      <View style={[styles.inputCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder={PLACEHOLDER}
          placeholderTextColor={colors.mutedText}
          selectionColor={colors.accent}
          multiline
          maxLength={MAX_LENGTH}
          textAlignVertical="top"
          accessibilityLabel="Describe your vision"
          style={[styles.input, { color: colors.text }]}
        />
        <AppText variant="caption" tone="muted" align="right">
          {prompt.length}/{MAX_LENGTH}
        </AppText>
      </View>

      <AppText variant="overline" tone="muted" style={styles.suggestTitle}>
        Suggestions
      </AppText>
      <View style={styles.chips}>
        {suggestions.map((text) => {
          const selected = prompt.includes(text);
          return (
            <Pressable
              key={text}
              onPress={() => toggleSuggestion(text)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={text}
              style={[
                styles.chip,
                {
                  borderColor: selected ? colors.accent : colors.stone,
                  backgroundColor: selected ? colors.accent : 'transparent',
                },
              ]}
            >
              <AppText variant="caption" style={{ color: selected ? '#171717' : colors.text }}>
                {text}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </CreateStepLayout>
  );
}

const styles = StyleSheet.create({
  inputCard: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.md },
  input: { minHeight: 140, fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  suggestTitle: { marginTop: spacing.xl, marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { borderWidth: 1, borderRadius: radius.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  helper: { marginBottom: spacing.sm },
});
