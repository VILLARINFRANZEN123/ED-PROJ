
import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS, RADIUS_SM } from '@/constants/theme';
import { useAuth, signOut } from '@/lib/auth';
import { getProfile, updateProfile, Profile } from '@/lib/profiles';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [draftName, setDraftName] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadProfile = useCallback(async () => {
    if (!user) return;

    const p = await getProfile(user.id);
    setProfile(p);
    setDraftName(p?.full_name ?? '');
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const handleSaveName = async () => {
    if (!user) return;

    setSaving(true);

    const { error } = await updateProfile(user.id, {
      full_name: draftName.trim(),
    });

    setSaving(false);

    if (error) {
      Alert.alert('Error', error);
    } else {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: draftName.trim(),
            }
          : prev
      );
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
      router.replace('/login');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed to sign out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.prompt}>{'> '}</Text>My Profile
      </Text>

      {user && (
        <View style={styles.infoCard}>
          <Text style={styles.label}>// name</Text>

          {editing ? (
            <View style={styles.nameEditRow}>
              <TextInput
                style={styles.nameInput}
                value={draftName}
                onChangeText={setDraftName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textSecondary}
                editable={!saving}
              />

              <Pressable
                style={styles.saveButton}
                onPress={handleSaveName}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setEditing(true)}
              style={styles.nameRow}
            >
              <Text style={styles.value}>
                {profile?.full_name || 'Tap to add your name'}
              </Text>

              <Text style={styles.editHint}>{'> edit'}</Text>
            </Pressable>
          )}

          <Text style={styles.label}>// role</Text>

          {profile?.role === 'teacher' ? (
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>[ TEACHER ]</Text>
            </View>
          ) : (
            <View style={[styles.roleBadge, styles.roleBadgeStudent]}>
              <Text style={[styles.roleBadgeText, styles.roleBadgeTextStudent]}>
                [ STUDENT ]
              </Text>
            </View>
          )}

          <Text style={styles.label}>// email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>// user id</Text>
          <Text style={styles.valueSmall}>{user.id}</Text>
        </View>
      )}

      <AppButton
        title="Sign Out"
        icon="log-out-outline"
        onPress={handleSignOut}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontFamily: MONO_FONT,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  prompt: {
    color: COLORS.primary,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.comment,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
    marginTop: 12,
  },
  value: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  valueSmall: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    color: COLORS.accent,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editHint: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS_SM,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: MONO_FONT,
    color: COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS_SM,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  saveButtonText: {
    color: COLORS.textOnPrimary,
    fontFamily: MONO_FONT,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryDim,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS_SM,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
  },
  roleBadgeStudent: {
    backgroundColor: 'transparent',
    borderColor: COLORS.accent,
  },
  roleBadgeText: {
    color: COLORS.primary,
    fontFamily: MONO_FONT,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  roleBadgeTextStudent: {
    color: COLORS.accent,
  },
});

