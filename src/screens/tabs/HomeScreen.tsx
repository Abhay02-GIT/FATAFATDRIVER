import React, {useEffect, useState} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import MdiIcon from '@/components/common/MdiIcon';
import Avatar from '@/components/home/Avatar';
import MapPlaceholder from '@/components/home/MapPlaceholder';
import {colors} from '@/constants/colors';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {useProfilePhoto} from '@/state/profilePhotoStore';
import {isWithinServiceHours} from '@/utils/serviceHours';
import ServiceHoursLockedScreen from './ServiceHoursLockedScreen';
import OnlineHomeScreen from './OnlineHomeScreen';

// TODO: load today's numbers from your API
const TODAY = {earnings: '₹0', trips: '0'};

function PowerIcon() {
  return (
    <Svg width={34} height={34} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.36 6.64a9 9 0 1 1-12.73 0"
        stroke="#FFFFFF"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path d="M12 2v10" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  const photoUri = useProfilePhoto();
  const [online, setOnline] = useState(false);
  const [open, setOpen] = useState(isWithinServiceHours());

  // re-check the service hours every minute
  useEffect(() => {
    const id = setInterval(() => setOpen(isWithinServiceHours()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!open) {
    return <ServiceHoursLockedScreen />;
  }

    if (online) {
    return (
      <OnlineHomeScreen photoUri={photoUri} onGoOffline={() => setOnline(false)} />
    );
  }

  const onToggle = () => {
    // TODO: tell your API the rider / driver is going online / offline
    setOnline(v => !v);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.mapArea}>
        <MapPlaceholder />
        <View style={[styles.mapHeader, {paddingTop: insets.top + 10}]}>
          <Avatar uri={photoUri} size={44} />
          <Text style={styles.brand}>Fatafat</Text>
          <Pressable
            style={styles.bell}
            onPress={() => navigation.navigate('Alerts')}
            hitSlop={8}>
            <MdiIcon path={MDI_HOME.bellOutline} size={22} color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.statusRow}>
          <View style={[styles.dot, online && styles.dotOnline]} />
          <Text style={styles.statusTitle}>
            {online ? strings.home.online : strings.home.offline}
          </Text>
        </View>
        <Text style={styles.statusSub}>
          {online ? strings.home.lookingForTrips : strings.home.tapToStart}
        </Text>

        <View style={styles.powerWrap}>
          <Pressable style={styles.power} onPress={onToggle}>
            <PowerIcon />
          </Pressable>
          <Text style={styles.powerLabel}>
            {online ? strings.home.goOffline : strings.home.goOnline}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>{strings.home.todaysEarnings}</Text>
            <Text style={styles.statValue}>{TODAY.earnings}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={[styles.stat, styles.statRight]}>
            <Text style={styles.statLabel}>{strings.home.trips}</Text>
            <Text style={styles.statValue}>{TODAY.trips}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapArea: {
    flex: 1,
    minHeight: 200,
  },
  mapHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textMuted,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  sheet: {
    marginTop: -28,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 18,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.background,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: colors.placeholder,
  },
  dotOnline: {
    backgroundColor: colors.green,
  },
  statusTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },
  statusSub: {
    marginTop: 14,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  powerWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  power: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  powerLabel: {
    marginTop: 12,
    fontFamily: fonts.bold,
    fontSize: 14,
    letterSpacing: 0.5,
    color: colors.primary,
  },
  stats: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  stat: {
    flex: 1,
  },
  statRight: {
    alignItems: 'flex-end',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  statLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.placeholder,
  },
  statValue: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textDark,
  },
}); 