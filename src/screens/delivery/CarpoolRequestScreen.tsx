import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AlertTinyIcon,
  ArrowRightIcon,
  CheckSmallIcon,
  UsersIcon,
} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {CarpoolRider, getCarpoolTrip} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useCountdown} from '@/hooks/useCountdown';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'CarpoolRequest'>;

// TODO: replace this with your real API call.
async function acceptCarpool(tripId: string) {
  return tripId;
}

function RiderRow({rider}: {rider: CarpoolRider}) {
  return (
    <View style={styles.rider}>
      {rider.extraSeats ? (
        <View style={[styles.avatar, styles.seats]}>
          <Text style={styles.seatsText}>{`+${rider.extraSeats}`}</Text>
        </View>
      ) : (
        <Image source={{uri: rider.photo}} style={styles.avatar} />
      )}
      <View style={styles.riderText}>
        <Text style={styles.riderName}>{rider.name}</Text>
        <Text style={styles.riderPlace}>{rider.pickup}</Text>
      </View>
      <Text style={styles.riderFare}>{formatRupees(rider.fare, 2)}</Text>
    </View>
  );
}

export default function CarpoolRequestScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const trip = getCarpoolTrip(route.params.tripId);
  const [expiresAt] = useState(() => Date.now() + trip.acceptSeconds * 1000);
  const [accepting, setAccepting] = useState(false);
  const secondsLeft = useCountdown(expiresAt);

  const combined = trip.riders.reduce((sum, rider) => sum + rider.fare, 0);

  useEffect(() => {
    if (secondsLeft === 0 && !accepting) {
      navigation.replace('RequestExpired');
    }
  }, [secondsLeft, accepting, navigation]);

  const onAccept = async () => {
    if (accepting) {
      return;
    }
    setAccepting(true);
    try {
      await acceptCarpool(trip.id);
      navigation.replace('CarpoolManifest', {tripId: trip.id});
    } catch {
      Alert.alert(strings.carpool.acceptFailed);
    } finally {
      setAccepting(false);
    }
  };

  const onDecline = () => {
    const text = strings.carpool;
    Alert.alert(text.declineTitle, text.declineMessage, [
      {text: text.cancel, style: 'cancel'},
      {
        text: text.decline,
        style: 'destructive',
        // TODO: tell your API the request was declined
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{strings.carpool.header}</Text>
          <Text style={styles.online}>{strings.carpool.online}</Text>
        </View>
      </View>

      {/* TODO: replace the static preview with a live map */}
      <View style={styles.canvas}>
        <Image source={{uri: 'delivery_map'}} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <View style={styles.scrim} />

        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={[styles.sheetContent, {paddingBottom: 20 + insets.bottom}]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.handleWrap}>
              <View style={styles.handle} />
            </View>

            <View style={styles.summary}>
              <View style={styles.summaryLeft}>
                <View style={styles.typeIcon}>
                  <UsersIcon color={colors.silverCool} />
                  <View style={styles.typeBadge}>
                    <AlertTinyIcon color={colors.truckAmber} />
                  </View>
                </View>
                <View style={styles.summaryText}>
                  <Text style={styles.title}>{strings.carpool.title}</Text>
                  <Text style={styles.subtitle}>
                    {strings.formatString(strings.carpool.extraStops, String(trip.riders.length - 1))}
                  </Text>
                </View>
              </View>
              <View style={styles.timer}>
                <Text style={styles.timerText}>{secondsLeft}</Text>
              </View>
            </View>

            <View style={styles.costCard}>
              <Text style={styles.sectionLabel}>{strings.carpool.costShare}</Text>
              <View style={styles.costRow}>
                <Text style={styles.cost}>{formatRupees(combined, 2)}</Text>
                <Text style={styles.soloFare}>{formatRupees(trip.soloFare, 2)}</Text>
              </View>
              {trip.highDemand ? (
                <View style={styles.demand}>
                  <CheckSmallIcon color={colors.dropGreen} />
                  <Text style={styles.demandText}>{strings.carpool.highDemand}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.bento}>
              <View style={styles.bentoItem}>
                <Text style={styles.bentoLabel}>{strings.carpool.extraTime}</Text>
                <Text style={styles.bentoValue}>
                  {strings.formatString(strings.carpool.extraTimeValue, String(trip.extraMin))}
                </Text>
              </View>
              <View style={styles.bentoItem}>
                <Text style={styles.bentoLabel}>{strings.carpool.totalDistance}</Text>
                <Text style={styles.bentoValue}>
                  {strings.formatString(strings.delivery.km, String(trip.distanceKm))}
                </Text>
              </View>
            </View>

            <View style={styles.riders}>
              <Text style={styles.sectionLabel}>
                {strings.formatString(strings.carpool.passengers, String(trip.riders.length))}
              </Text>
              {trip.riders.map(rider => (
                <RiderRow key={rider.id} rider={rider} />
              ))}
            </View>

            <View style={styles.combined}>
              <Text style={[styles.sectionLabel, styles.combinedLabel]}>
                {strings.carpool.combined}
              </Text>
              <Text style={styles.combinedValue}>{formatRupees(combined, 2)}</Text>
            </View>

            <View style={styles.actions}>
              <Pressable style={styles.decline} onPress={onDecline} disabled={accepting}>
                <Text style={styles.declineText}>{strings.carpool.decline}</Text>
              </Pressable>
              <Pressable style={styles.accept} onPress={onAccept} disabled={accepting}>
                <Text style={styles.acceptText}>{strings.carpool.acceptAll}</Text>
                <ArrowRightIcon color="#FFFFFF" />
              </Pressable>
            </View>
          </ScrollView>
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
  header: {
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 44,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  online: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.dropGreen,
  },
  canvas: {
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '100%',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    boxShadow: '0px -4px 24px rgba(0,0,0,0.5)',
  },
  sheetContent: {
    gap: 16,
    paddingHorizontal: 20,
  },
  // The handle area is 16 + 4 + 8 tall, then 8 more before the content.
  handleWrap: {
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: -8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: colors.slateBorder,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  typeBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    paddingTop: 9,
    paddingBottom: 11,
    paddingHorizontal: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.avatarRing,
    backgroundColor: colors.charcoal,
  },
  summaryText: {
    gap: 2,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  timer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.truckAmber,
  },
  costCard: {
    gap: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  sectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  cost: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.ink,
  },
  soloFare: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textDecorationLine: 'line-through',
    color: colors.placeholder,
  },
  demand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  demandText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.dropGreen,
  },
  bento: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoItem: {
    flex: 1,
    gap: 4,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  bentoLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  bentoValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.ink,
  },
  riders: {
    gap: 8,
    paddingTop: 8,
  },
  rider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: colors.avatarRing,
  },
  seats: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  seatsText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    lineHeight: 16,
    color: colors.ink,
  },
  riderText: {
    flex: 1,
    gap: 2,
  },
  riderName: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  riderPlace: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  riderFare: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  combined: {
    gap: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    backgroundColor: colors.blush,
  },
  combinedLabel: {
    color: colors.crimson,
  },
  combinedValue: {
    fontFamily: fonts.extraBold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.ink,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  decline: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  declineText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
  },
  accept: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.crimson,
  },
  acceptText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
