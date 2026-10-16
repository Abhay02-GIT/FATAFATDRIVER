import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Avatar from '@/components/home/Avatar';
import {BellIcon} from '@/components/home/TabIcons';
import MapPlaceholder from '@/components/home/MapPlaceholder';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {useDisplayProfile} from '@/state/displayProfile';

// TODO: load these from your API
const BONUS = {done: 3, total: 5, reward: '₹200'};
const TODAY = {earnings: '₹1,240', trips: '5'};

type Props = {
  photoUri?: string;
  onGoOffline: () => void;
};

// Home while the rider / driver is online.
export default function OnlineHomeScreen({photoUri, onGoOffline}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  const {role, name} = useDisplayProfile();

  const remaining = Math.max(BONUS.total - BONUS.done, 0);
  const progress = BONUS.total > 0 ? BONUS.done / BONUS.total : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.mapArea}>
        <MapPlaceholder />

        {/* current location */}
        <View style={styles.locationWrap} pointerEvents="none">
          <View style={styles.locationHalo} />
          <View style={styles.locationDot} />
        </View>

                {/* floating header card */}
        <View style={[styles.header, {top: insets.top + 12}]}>
          <View style={styles.left}>
            <Avatar uri={photoUri} size={44} square flat />
            <View style={styles.who}>
              <Text style={styles.role}>{strings.onlineHome[role]}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {name ?? strings.onlineHome.partner}
              </Text>
            </View>
          </View>
          <Pressable
            style={styles.bell}
            onPress={() => navigation.navigate('Alerts')}
            hitSlop={6}>
            <BellIcon size={22} color={colors.textDark} strokeWidth={2.4} />
          </Pressable>

          {/* ONLINE badge, centred in the header */}
          <View style={styles.centerBadge} pointerEvents="none">
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>{strings.onlineHome.badge}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <View style={styles.statusRow}>
          <View style={styles.dot} />
          <Text style={styles.statusTitle}>{strings.home.online}</Text>
        </View>
        <Text style={styles.statusSub}>{strings.onlineHome.waiting}</Text>

        <View style={styles.quest}>
          <View style={styles.questTop}>
            <View style={styles.questText}>
              <Text style={styles.questLabel}>{strings.onlineHome.bonusQuest}</Text>
              <Text style={styles.questTitle}>
                {strings.formatString(strings.onlineHome.questTitle, String(remaining), BONUS.reward)}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {BONUS.done}/{BONUS.total}
              </Text>
            </View>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, {width: `${Math.round(progress * 100)}%`}]} />
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{strings.onlineHome.todaysEarnings}</Text>
            <Text style={styles.statValue}>{TODAY.earnings}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{strings.onlineHome.trips}</Text>
            <Text style={styles.statValue}>{TODAY.trips}</Text>
          </View>
        </View>

        <Pressable style={styles.offlineBtn} onPress={onGoOffline}>
          <Text style={styles.offlineText}>{strings.onlineHome.goOffline}</Text>
        </Pressable>
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
    minHeight: 160,
  },
  locationWrap: {
    position: 'absolute',
    top: '52%',
    left: '50%',
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationHalo: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(22,163,74,0.18)',
  },
  locationDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.green,
    borderWidth: 3,
    borderColor: colors.background,
  },
  header: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  centerBadge: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40, 
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
   who: {
    marginLeft: 12,
    maxWidth: 66,
  },
  
  role: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textDark,
  },
  onlinePill: {
    height: 32,
    paddingHorizontal: 12,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    backgroundColor: colors.mintSoft,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: colors.green,
  },
  onlineText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.green,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sheet: {
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.background,
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  statusRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.green,
  },
  statusTitle: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.textDark,
  },
  statusSub: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
  quest: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.track,
  },
  questTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questText: {
    flex: 1,
    paddingRight: 12,
  },
  questLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.primary,
  },
  questTitle: {
    marginTop: 3,
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textDark,
  },
  badge: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primary,
  },
  track: {
    marginTop: 12,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  fill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  stats: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  statLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textDark,
  },
  offlineBtn: {
    marginTop: 16,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  offlineText: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: '#FFFFFF',
  },
});