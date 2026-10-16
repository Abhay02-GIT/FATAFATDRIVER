import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AlertIcon,
  AlertWideIcon,
  CheckIcon,
  CircleXIcon,
  CloseCircleIcon,
  PackageTallIcon,
  PinIcon,
  UserXIcon,
} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {CANCEL_REASONS, CancelReason, getCarpoolTrip} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CancelStop'>;

// TODO: replace this with your real API call.
async function cancelStop(tripId: string, riderId: string, reason: CancelReason, details: string) {
  return {tripId, riderId, reason, details};
}

const REASON_ICONS: Record<CancelReason, React.ComponentType<{color: string}>> = {
  noShow: UserXIcon,
  unsafePickup: AlertWideIcon,
  luggage: PackageTallIcon,
  riderRequested: CircleXIcon,
};

export default function CancelStopScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const trip = getCarpoolTrip(route.params.tripId);
  const riderIndex = Math.max(0, trip.riders.findIndex(r => r.id === route.params.riderId));
  const rider = trip.riders[riderIndex];
  const [reason, setReason] = useState<CancelReason>();
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onConfirm = async () => {
    if (!reason || submitting) {
      return;
    }
    setSubmitting(true);
    try {
      await cancelStop(trip.id, rider.id, reason, details.trim());
      navigation.goBack();
    } catch {
      Alert.alert(strings.cancelStop.failed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{strings.cancelStop.title}</Text>
          <Pressable style={styles.close} onPress={() => navigation.goBack()} hitSlop={8}>
            <CloseCircleIcon color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.context}>
          <View style={styles.stop}>
            <View style={styles.pin}>
              <PinIcon size={16} color={colors.silver} />
            </View>
            <View style={styles.stopText}>
              <Text style={styles.stopTitle}>
                {strings.formatString(strings.cancelStop.remove, rider.name)}
              </Text>
              <Text style={styles.stopInfo}>
                {strings.formatString(
                  strings.cancelStop.stopInfo,
                  String(riderIndex + 1),
                  String(trip.riders.length),
                  rider.pickup,
                )}
              </Text>
            </View>
          </View>
          <View style={styles.warning}>
            <AlertIcon color={colors.truckAmber} />
            <Text style={styles.warningText}>{strings.cancelStop.warning}</Text>
          </View>
        </View>

        <View style={styles.reasons}>
          <Text style={styles.sectionLabel}>{strings.cancelStop.selectReason}</Text>
          {CANCEL_REASONS.map(id => {
            const Icon = REASON_ICONS[id];
            const selected = id === reason;
            return (
              <Pressable key={id} style={styles.reason} onPress={() => setReason(id)}>
                <View style={styles.reasonLeft}>
                  <Icon color={colors.silverCool} />
                  <Text style={styles.reasonText}>{strings.cancelStop.reasons[id]}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioOn]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            );
          })}
          <TextInput
            style={styles.details}
            value={details}
            onChangeText={setDetails}
            placeholder={strings.cancelStop.detailsPlaceholder}
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={[styles.bottom, {paddingBottom: Math.max(insets.bottom, 20)}]}>
        <Pressable
          style={[styles.button, (!reason || submitting) && styles.buttonDisabled]}
          onPress={onConfirm}
          disabled={!reason || submitting}>
          <CheckIcon color="#FFFFFF" />
          <Text style={styles.buttonText}>{strings.cancelStop.confirm}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 44,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 20,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  context: {
    gap: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  pin: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.slateBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  stopText: {
    flex: 1,
    gap: 4,
  },
  stopTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  stopInfo: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    backgroundColor: colors.background,
  },
  warningText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  reasons: {
    gap: 16,
    paddingTop: 8,
  },
  sectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  reasonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reasonText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: colors.steel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Not in the design: same selected state as the other radios in the app.
  radioOn: {
    borderColor: colors.crimson,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.crimson,
  },
  details: {
    height: 96,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  bottom: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.crimson,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
