import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../ui/AppText';
import { fonts, spacing, useTheme } from '../../theme';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  secure?: boolean;
}

export function TextField({ label, error, secure = false, onFocus, onBlur, ...rest }: TextFieldProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  const lineColor = error ? colors.error : focused ? colors.accent : colors.stone;

  return (
    <View style={styles.container}>
      <AppText variant="overline" tone="muted">
        {label}
      </AppText>
      <View style={[styles.inputRow, { borderBottomColor: lineColor }]}>
        <TextInput
          {...rest}
          accessibilityLabel={label}
          secureTextEntry={hidden}
          placeholderTextColor={colors.mutedText}
          selectionColor={colors.accent}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, { color: colors.text }]}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          >
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.mutedText} />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <AppText variant="caption" tone="error" style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 16, paddingVertical: spacing.md - 4 },
  error: { marginTop: spacing.xs },
});
