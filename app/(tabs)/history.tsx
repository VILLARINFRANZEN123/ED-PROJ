import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';
// import { STUDENT_ID } from '@/constants/student';
import { useAuth } from '@/lib/auth';
import { getProfile, type Role } from '@/lib/profiles';
import {
  getAttendanceHistory,
  getTeacherEventAttendance,
  type AttendanceRecord,
  type TeacherEventAttendance,
} from '@/lib/attendance';

export default function HistoryScreen() {
  const { user } = useAuth();

  const [role, setRole] = useState<Role | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [teacherEvents, setTeacherEvents] = useState<
    TeacherEventAttendance[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const profile = await getProfile(user.id);
    const currentRole = profile?.role ?? 'student';

    setRole(currentRole);

    if (currentRole === 'teacher') {
      const events = await getTeacherEventAttendance(user.id);

      setTeacherEvents(events);
      setRecords([]);
    } else {
      // getAttendanceHistory(STUDENT_ID).then((rows) => {
      const studentId = user.id;
      const rows = await getAttendanceHistory(studentId);

      setRecords(rows);
      setTeacherEvents([]);
    }

    setLoading(false);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          <Text style={styles.prompt}>{'> '}</Text>Attendance History
        </Text>
        <Text style={styles.subtitle}>[ .... ] loading records...</Text>
      </View>
    );
  }

  if (role === 'teacher') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          <Text style={styles.prompt}>{'> '}</Text>Attendance History
        </Text>

        <Text style={styles.teacherSubtitle}>
          // events you created and their attendance
        </Text>

        {teacherEvents.length === 0 ? (
          <Text style={styles.subtitle}>
            No events yet. Create an event from the Teacher tab to
            see attendance here.
          </Text>
        ) : (
          <FlatList
            data={teacherEvents}
            keyExtractor={(item) => item.eventId}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.eventHeader}>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.eventMeta}>
                      {item.eventCode}
                    </Text>

                    <Text style={styles.eventMeta}>
                      {formatDate(item.startTime)}
                    </Text>
                  </View>

                  <View style={styles.countBadge}>
                    <Text style={styles.countNumber}>
                      {item.attendeeCount}
                    </Text>

                    <Text style={styles.countLabel}>
                      {item.attendeeCount === 1
                        ? 'attendee'
                        : 'attendees'}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.attendeesTitle}>
                  Students
                </Text>

                {item.attendees.length === 0 ? (
                  <Text style={styles.noAttendees}>
                    No students have scanned this QR code yet.
                  </Text>
                ) : (
                  item.attendees.map((attendee) => (
                    <View
                      key={`${item.eventId}-${attendee.studentId}-${attendee.scannedAt}`}
                      style={styles.attendeeRow}
                    >
                      <Text style={styles.studentId}>
                        {shortId(attendee.studentId)}
                      </Text>

                      <Text style={styles.eventMeta}>
                        {formatDate(attendee.scannedAt)}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.prompt}>{'> '}</Text>Attendance History
      </Text>

      {records.length === 0 ? (
        <Text style={styles.subtitle}>
          No records yet. Scan a QR code to register your attendance.
        </Text>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.eventTitle}>
                {item.eventTitle}
              </Text>

              <Text style={styles.eventMeta}>
                {item.eventId}
              </Text>

              <Text style={styles.eventMeta}>
                {formatDate(item.scannedAt)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function shortId(id: string) {
  return id ? `…${id.slice(-8)}` : 'unknown';
}

function formatDate(iso: string | null) {
  if (!iso) {
    return 'No date set';
  }

  return new Date(iso).toLocaleString();
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
  subtitle: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.comment,
    lineHeight: 20,
    marginTop: 32,
  },
  teacherSubtitle: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: COLORS.comment,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
    padding: 16,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventInfo: {
    flex: 1,
    paddingRight: 12,
  },
  eventTitle: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  eventMeta: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: COLORS.primaryDim,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    minWidth: 70,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  countNumber: {
    color: COLORS.primary,
    fontFamily: MONO_FONT,
    fontSize: 18,
    fontWeight: '700',
  },
  countLabel: {
    color: COLORS.comment,
    fontFamily: MONO_FONT,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  attendeesTitle: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.comment,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  attendeeRow: {
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  studentId: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 2,
  },
  noAttendees: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: COLORS.comment,
    fontStyle: 'italic',
  },
});