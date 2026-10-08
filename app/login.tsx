import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import Window from '@/components/Window';
import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';
import { signIn } from '@/lib/auth';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await signIn(email.trim(), password);

      if (authError) {
        setError(authError.message);
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Header title="QR Attendance" />
            </View>

            <Text style={styles.title}>
              <Text style={styles.prompt}>{'> '}</Text>Welcome Back
            </Text>
            <Text style={styles.subtitle}>
              {'// sign in to record your attendance'}
            </Text>

            <Window title="auth/login.tsx" style={styles.form}>
              <Text style={styles.label}>// email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@school.edu"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />

              <Text style={styles.label}>// password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry
                editable={!loading}
              />

              {error && <Text style={styles.error}>[err] {error}</Text>}

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={COLORS.primary}
                  style={styles.loader}
                />
              ) : (
                <AppButton
                  theme="primary"
                  title="Sign In"
                  icon="log-in-outline"
                  onPress={handleLogin}
                />
              )}
            </Window>

            <Link href="/register" style={styles.link}>
              {'// no account yet? create one →'}
            </Link>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontFamily: MONO_FONT,
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  prompt: {
    color: COLORS.primary,
  },
  subtitle: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.comment,
    lineHeight: 19,
    marginBottom: 24,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.comment,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: MONO_FONT,
    color: COLORS.textPrimary,
  },
  error: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 14,
    marginBottom: 4,
  },
  loader: {
    marginVertical: 16,
  },
  link: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});