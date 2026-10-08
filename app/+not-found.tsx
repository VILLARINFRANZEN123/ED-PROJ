import { View, StyleSheet, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { MONO_FONT } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '404 — Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.code}>[ERR_404]</Text>
        <Text style={styles.message}>
          {'> route not found: /{unknown_path}'}
        </Text>
        <Link href="/" style={styles.button}>
          {'$ cd ~/home →'}
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  code: {
    fontFamily: MONO_FONT,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.danger,
    marginBottom: 12,
    letterSpacing: 1,
  },
  message: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    fontFamily: MONO_FONT,
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
