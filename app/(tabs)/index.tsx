import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Header title="QR Attendance" />
          <Text style={styles.byline}>// developed by Franzen Villarin</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.comment}>/**</Text>

          <Text style={styles.mainTitle}>
            <Text style={styles.hash}># </Text>School Event Attendance
          </Text>

          <Text style={styles.subtitle}>
            Scan QR codes to record attendance during school activities.
          </Text>

          <Text style={styles.comment}>*/</Text>
        </View>

        <View style={styles.footerContainer}>
          <AppButton
            theme="primary"
            title="Scan QR Code"
            icon="qr-code-outline"
            onPress={() => router.push('/scan')}
          />
          <AppButton
            title="Attendance History"
            icon="time-outline"
            onPress={() => router.push('/history')}
          />
          <AppButton
            title="Profile"
            icon="person-outline"
            onPress={() => router.push('/profile')}
          />
        </View>
      </ScrollView>

      <View style={styles.statusBar}>
        <View style={styles.statusGroup}>
          <Ionicons
            name="git-branch-outline"
            size={12}
            color={COLORS.textOnPrimary}
          />
          <Text style={styles.statusItem}>main*</Text>
          <Ionicons
            name="checkmark-circle"
            size={12}
            color={COLORS.textOnPrimary}
          />
          <Text style={styles.statusItem}>0</Text>
          <Ionicons
            name="warning-outline"
            size={12}
            color={COLORS.textOnPrimary}
          />
          <Text style={styles.statusItem}>0</Text>
        </View>

        <View style={styles.statusGroup}>
          <Text style={styles.statusItem}>Ln 1, Col 1</Text>
          <Text style={styles.statusItem}>UTF-8</Text>
          <Text style={styles.statusItem}>TS</Text>
          <Text style={styles.statusItem}>React Native</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContainer: {
    marginBottom: 20,
  },
  byline: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: COLORS.comment,
    marginTop: 14,
  },
  bodyContainer: {
    marginBottom: 24,
  },
  comment: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.comment,
    lineHeight: 18,
  },
  mainTitle: {
    fontFamily: MONO_FONT,
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginVertical: 6,
  },
  hash: {
    color: COLORS.accentPink,
  },
  subtitle: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  footerContainer: {
    width: '100%',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    overflow: 'hidden',
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusItem: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
    marginRight: 8,
  },
});