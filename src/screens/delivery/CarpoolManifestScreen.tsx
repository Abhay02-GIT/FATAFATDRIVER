import React, {useState} from 'react';
import {Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeftLargeIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {CarpoolRider, getCarpoolTrip, RiderStatus} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CarpoolManifest'>;

// TODO: replace this with your real API call.
async function confirmBoarded(tripId: string, riderId: string) {
  return `${tripId}/${riderId}`;
}

const TONES: Record<RiderStatus, {badge: string; text: string}> = {
  boarded: {badge: colors.rose, text: colors.crimson},
  arrived: {badge: colors.rose, text: colors.crimson},
  upcoming: {badge: colors.ringFill, text: colors.textSecondary},
};

type RiderCardProps = {
  rider: CarpoolRider;
  number: number;
  onConfirm: () => void;
};

function RiderCard({rider, number, onConfirm}: RiderCardProps) {
  const strings = useStrings();
  const tone = TONES[rider.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <View style={styles.who}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
          <View style={styles.whoText}>
            <Text style={styles.name}>{rider.name}</Text>
            <Text style={styles.pickup}>
              {strings.formatString(strings.manifest.pickup, rider.pickup)}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, {backgroundColor: tone.badge}]}>
          <Text style={[styles.badgeText, {color: tone.text}]}>
            {strings.manifest[rider.status]}
          </Text>
        </View>
      </View>

      {rider.status === 'arrived' ? (
        <Pressable style={styles.confirm} onPress={onConfirm}>
          <Text style={styles.confirmText}>{strings.manifest.confirmBoarded}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function CarpoolManifestScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const trip = getCarpoolTrip(route.params.tripId);
  const [riders, setRiders] = useState(trip.riders);

  const onConfirm = async (riderId: string) => {
    try {
      await confirmBoarded(trip.id, riderId);
      setRiders(prev =>
        prev.map(rider => (rider.id === riderId ? {...rider, status: 'boarded'} : rider)),
      );
      // TODO: start the trip once every rider has boarded
    } catch {
      Alert.alert(strings.manifest.confirmFailed);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TODO: replace the static preview with a live map */}
      <Image source={{uri: 'delivery_map'}} style={StyleSheet.absoluteFill} resizeMode="cover" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
            <ArrowLeftLargeIcon color={colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>{strings.manifest.title}</Text>
          <View style={styles.spacer} />
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />
        <ScrollView
          contentContainerStyle={[styles.sheetContent, {paddingBottom: 24 + insets.bottom}]}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>
            {strings.formatString(strings.manifest.heading, String(riders.length))}
          </Text>
          <View style={styles.list}>
            {riders.map((rider, i) => (
              <RiderCard
                key={rider.id}
                rider={rider}
                number={i + 1}
                onConfirm={() => onConfirm(rider.id)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  spacer: {
    width: 40,
  },
  // 309 tall in the design plus the 72px strip below it, which is plain white.
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 381,
    paddingTop: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    boxShadow: '0px -8px 24px rgba(0,0,0,0.08)',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    marginBottom: 16,
    borderRadius: 9999,
    backgroundColor: colors.steel,
  },
  sheetContent: {
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  list: {
    gap: 16,
    marginTop: 24,
  },
  card: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    boxShadow: '0px 2px 10px rgba(0,0,0,0.04)',
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  who: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.rose,
  },
  numberText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 16,
    color: colors.crimson,
  },
  whoText: {
    gap: 2,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
  },
  pickup: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  badgeText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  confirm: {
    height: 54,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  confirmText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
