import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { MONO_FONT } from '@/constants/theme';
import Window from '@/components/Window';

type Props = { title: string };

/** Terminal-style header: `> Title` with a blinking block cursor. */
export default function Header({ title }: Props) {
  const cursor = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursor, {
          toValue: 0,
          duration: 530,
          useNativeDriver: true,
        }),
        Animated.timing(cursor, {
          toValue: 1,
          duration: 530,
          useNativeDriver: true,
        }),
      ])
    );

    blink.start();
    return () => blink.stop();
  }, [cursor]);

  return (
    <View style={styles.container}>
      <Window title="~/qr-attendance — zsh">
        <View style={styles.line}>
          <Text style={styles.prompt}>{'> '}</Text>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={[styles.cursor, { opacity: cursor }]} />
        </View>

        <Text style={styles.sub}>// school event attendance tracker</Text>
      </Window>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  prompt: {
    fontFamily: MONO_FONT,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  title: {
    fontFamily: MONO_FONT,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  cursor: {
    width: 10,
    height: 20,
    marginLeft: 4,
    backgroundColor: COLORS.primary,
  },
  sub: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: COLORS.comment,
  },
});
