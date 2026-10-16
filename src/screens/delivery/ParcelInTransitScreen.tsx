import React from 'react';
import {Alert, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RoutePreview from '@/components/delivery/RoutePreview';
import {colors} from '@/constants/colors';
import {DELIVERY_PROGRESS, getDeliveryRequest} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {callNumber, openNavigation} from '@/utils/linking';

type Props = NativeStackScreenProps<RootStackParamList, 'ParcelInTransit'>;

export default function ParcelInTransitScreen({route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const delivery = getDeliveryRequest(route.params.deliveryId);
  const progress = DELIVERY_PROGRESS;

  // TODO: open Drop Verification when the driver reaches the drop
  // (geofence or an "Arrived" button; the design doesn't show one yet).

  const onCall = async () => {
    try {
      await callNumber(delivery.recipient.phone);
    } catch {
      Alert.alert(strings.inTransit.callFailed);
    }
  };

  const onChat = () => {
    // TODO: open the chat with the recipient (Module 11)
  };

  const onNavigate = async () => {
    try {
      await openNavigation(delivery.dropoff.latitude, delivery.dropoff.longitude);
    } catch {
      Alert.alert(strings.inTransit.mapsFailed);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <RoutePreview distanceKm={progress.distanceKm} durationMin={progress.etaMin} />

      <View style={[styles.card, {paddingBottom: Math.max(insets.bottom, 20)}]}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.label}>{strings.inTransit.label}</Text>
          <Text style={styles.name}>{delivery.recipient.name}</Text>
          <Text style={styles.address}>{delivery.dropoff.address}</Text>
        </View>

        <View style={styles.status}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>{strings.inTransit.distance}</Text>
            <Text style={styles.statusValue}>
              {strings.formatString(strings.delivery.km, String(progress.distanceKm))}
            </Text>
          </View>
          <View style={[styles.statusItem, styles.statusItemEnd]}>
            <Text style={styles.statusLabel}>{strings.inTransit.eta}</Text>
            <Text style={styles.statusValue}>
              {strings.formatString(strings.delivery.min, String(progress.etaMin))}
            </Text>
          </View>
        </View>

        <View style={styles.contact}>
          <Pressable style={[styles.secondary, styles.call]} onPress={onCall}>
            <Text style={styles.secondaryText}>{strings.inTransit.call}</Text>
          </Pressable>
          <Pressable style={[styles.secondary, styles.chat]} onPress={onChat}>
            <Text style={styles.secondaryText}>{strings.inTransit.chat}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.navigate} onPress={onNavigate}>
          <Text style={styles.navigateText}>{strings.inTransit.navigate}</Text>
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
    gap: 4,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.crimson,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.ink,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  statusItem: {
    gap: 4,
  },
  statusItemEnd: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  statusValue: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.ink,
  },
  contact: {
    flexDirection: 'row',
    gap: 12,
  },
  secondary: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  call: {
    width: 112,
  },
  chat: {
    flex: 1,
  },
  secondaryText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textLabel,
  },
  navigate: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  navigateText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
