import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  theme?: 'primary';
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Command-style button: `[ ▸ SIGN IN ]` in monospace.
 * `theme="primary"` renders the filled neon version.
 */
export default function AppButton({
  title,
  icon,
  theme,
  onPress,
  disabled,
}: Props) {
  const primary = theme === 'primary';

  return (
    <View style={styles.buttonOuter}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.buttonInner,
          primary ? styles.primary : styles.ghost,
          pressed && (primary ? styles.primaryPressed : styles.ghostPressed),
          disabled && styles.disabled,
        ]}
      >
        <Text
          style={[
            styles.bracket,
            { color: primary ? COLORS.textOnPrimary : COLORS.primary },
          ]}
        >
          [
        </Text>

        <Ionicons
          name={icon}
          size={18}
          color={primary ? COLORS.textOnPrimary : COLORS.primary}
          style={styles.icon}
        />

        <Text
          style={[
            styles.label,
            { color: primary ? COLORS.textOnPrimary : COLORS.textPrimary },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.bracket,
            { color: primary ? COLORS.textOnPrimary : COLORS.primary },
          ]}
        >
          ]
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    width: '100%',
    marginBottom: 14,
  },
  buttonInner: {
    borderRadius: RADIUS,
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryPressed: {
    backgroundColor: '#00C97A',
    borderColor: '#00C97A',
    opacity: 0.9,
  },
  ghost: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.borderBright,
  },
  ghostPressed: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.45,
  },
  bracket: {
    fontFamily: MONO_FONT,
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 6,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});