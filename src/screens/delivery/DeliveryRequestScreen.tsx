import React, {useEffect, useState} from 'react';
import {Alert, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PackageIcon, PinIcon} from '@/components/delivery/DeliveryIcons';
import RoutePreview from '@/components/delivery/RoutePreview';
import {colors} from '@/constants/colors';
import {getDeliveryRequest} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useCountdown} from '@/hooks/useCountdown';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'DeliveryRequest'>;

// TODO: replace this with your real API call.
async function acceptDelivery(deliveryId: string) {
  return deliveryId;
}

type DetailProps = {label: string; value: React.ReactNode};

function Detail({label, value}: DetailProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

type PlaceProps = {label: string; address: string; color: string};

function Place({label, address, color}: PlaceProps) {
  return (
    <View style={styles.place}>
      <View style={[styles.placeIcon, {backgroundColor: color}]}>
        <PinIcon size={14} color="#FFFFFF" />
      </View>
      <View style={styles.placeText}>
        <Text style={[styles.placeLabel, {color}]}>{label}</Text>
        <Text style={styles.placeAddress}>{address}</Text>
      </View>
    </View>
  );
}

export default function DeliveryRequestScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const request = getDeliveryRequest(route.params.deliveryId);
  const [expiresAt] = useState(() => Date.now() + request.acceptSeconds * 1000);
  const [accepting, setAccepting] = useState(false);
  const secondsLeft = useCountdown(expiresAt);

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
      await acceptDelivery(request.id);
      navigation.replace('PickupVerification', {deliveryId: request.id});
    } catch {
      Alert.alert(strings.deliveryRequest.acceptFailed);
    } finally {
      setAccepting(false);
    }
  };

  const onDecline = () => {
    const text = strings.deliveryRequest;
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

      <RoutePreview distanceKm={request.distanceKm} durationMin={request.durationMin} />

      <View style={[styles.card, {paddingBottom: Math.max(insets.bottom, 20)}]}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={styles.label}>{strings.deliveryRequest.label}</Text>
            <Text style={styles.title}>{strings.deliveryRequest.title}</Text>
          </View>
          <View style={styles.packageIcon}>
            <PackageIcon size={18} color={colors.crimson} />
          </View>
        </View>

        <View style={styles.details}>
          <Detail
            label={strings.deliveryRequest.package}
            value={strings.packageSizes[request.packageSize]}
          />
          <Detail
            label={strings.deliveryRequest.weight}
            value={strings.formatString(strings.delivery.kg, String(request.weightKg))}
          />
          <Detail label={strings.deliveryRequest.fare} value={formatRupees(request.fare)} />
          <Detail
            label={strings.deliveryRequest.distance}
            value={strings.formatString(strings.delivery.km, String(request.distanceKm))}
          />
        </View>

        <View style={styles.places}>
          <Place
            label={strings.deliveryRequest.pickup}
            address={request.pickup.address}
            color={colors.crimson}
          />
          <Place
            label={strings.deliveryRequest.dropoff}
            address={request.dropoff.address}
            color={colors.dropGreen}
          />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.decline} onPress={onDecline} disabled={accepting}>
            <Text style={styles.declineText}>{strings.deliveryRequest.decline}</Text>
          </Pressable>
          <Pressable style={styles.accept} onPress={onAccept} disabled={accepting}>
            <Text style={styles.acceptText}>{strings.deliveryRequest.accept}</Text>
          </Pressable>
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
  card: {
    flexGrow: 1,
    gap: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.background,
    boxShadow: '0px -8px 24px rgba(0,0,0,0.07)',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.crimson,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.ink,
  },
  packageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimsonTint,
  },
  details: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.ink,
  },
  places: {
    gap: 12,
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  placeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeText: {
    flex: 1,
    gap: 2,
  },
  placeLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  placeAddress: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.ink,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  decline: {
    width: 112,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  declineText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textLabel,
  },
  accept: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  acceptText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
