import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { useStrings } from '@/localization';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionCheck'>;

const LOGO_WIDTH = 160;
const LOGO_RATIO = 1525 / 1031;
const SESSION_CHECK_MS = 2000;

export default function SessionCheckScreen({ navigation }: Props) {
  const strings = useStrings();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    (async () => {
      const net = await NetInfo.fetch();
      if (cancelled) {
        return;
      }
      if (!net.isConnected || net.isInternetReachable === false) {
        navigation.replace('NoInternet');
        return;
      }
      // TODO: replace this timer with the real session check
      timer = setTimeout(() => navigation.replace('RiderLogin'), SESSION_CHECK_MS);
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={{ uri: 'logo' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.role}>DRIVER</Text>
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={colors.primary}
      />
      <Text style={styles.message}>{strings.sessionCheck.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH / LOGO_RATIO,
  },
  role: {
    marginTop: 14,
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.2,
  },
  spinner: {
    marginTop: 40,
    transform: [{ scale: 1.1 }],
  },
  message: {
    marginTop: 16,
    fontSize: 12,
    color: colors.textMuted,
  },
});