import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
import { COLORS } from '@/constants/colors';
import { MONO_FONT, RADIUS } from '@/constants/theme';
// import { STUDENT_ID } from '@/constants/student';
 import { useAuth } from '@/lib/auth';
import { registerAttendance } from '@/lib/attendance';
// import { registerAttendance } from '@/lib/database';

export default function ScanScreen() {
  const { user } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Needed</Text>
        <Text style={styles.subtitle}>
          We need access to your camera to scan QR codes.
        </Text>
        <AppButton
          theme="primary"
          title="Grant Permission"
          icon="camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setLastData(data);
    // registerAttendance(data, STUDENT_ID).then((result) => {
      const studentId = user?.id ?? 'unknown';
     registerAttendance(data, studentId).then((result) => {
      setMessage(result.message);
      setSuccess(result.success);
    });
  };

  const handleScanAgain = () => {
    setScanned(false);
    setLastData(null);
    setMessage(null);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.overlayBar}>
          <Ionicons name="terminal-outline" size={13} color={COLORS.primary} />
          <Text style={styles.overlayBarTitle}>scanner.log</Text>
        </View>

        <View style={styles.overlayBody}>
          <Text style={styles.overlayText}>
            {scanned
              ? '[done] QR code detected'
              : '[ .. ] point your camera at a QR code'}
          </Text>

          {scanned && message && (
            <Text
              style={[
                styles.scanResult,
                success ? styles.success : styles.error,
              ]}
            >
              {success ? '[ok] ' : '[err] '}
              {message}
            </Text>
          )}

          {scanned && lastData && (
            <Text style={styles.scanData}>{'> payload: '}{lastData}</Text>
          )}

          {scanned && (
            <AppButton
              theme="primary"
              title="Scan Again"
              icon="refresh"
              onPress={handleScanAgain}
            />
          )}
        </View>
      </View>
    </View>
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
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontFamily: MONO_FONT,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  overlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 60,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.borderBright,
    overflow: 'hidden',
  },
  overlayBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  overlayBarTitle: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  overlayBody: {
    padding: 16,
    alignItems: 'center',
  },
  overlayText: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  scanResult: {
    fontFamily: MONO_FONT,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  success: {
    color: COLORS.success,
  },
  error: {
    color: COLORS.danger,
  },
  scanData: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 12,
  },
});


