import type { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';

type Props = {
  /** File name shown in the window title bar, e.g. "auth/login.tsx". */
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Editor/terminal style window: traffic-light dots, a file-name title bar
 * and a body used to wrap content.
 */
export default function Window({ title, children, style }: Props) {
  return (
    <View style={[styles.window, style]}>
      <View style={styles.titleBar}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
          <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
        </View>

        <Text style={styles.fileName} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginRight: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  fileName: {
    flex: 1,
    fontFamily: MONO_FONT,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  body: {
    padding: 16,
  },
});