import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CodeBoxes from '@/components/delivery/CodeBoxes';
import DeliveryHeader from '@/components/delivery/DeliveryHeader';
import {CameraIcon, PackageIcon, PinIcon, WalletIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {getDeliveryRequest} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {capturePhoto} from '@/utils/camera';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'DropVerification'>;

const OTP_LENGTH = 4;

// TODO: send the OTP, cash status and photo to your API. Returns false when the OTP is wrong.
async function completeDelivery(deliveryId: string, otp: string, photoUri: string) {
  return Boolean(deliveryId && photoUri) && otp.length === OTP_LENGTH;
}

function Toggle({value, onChange}: {value: boolean; onChange: (value: boolean) => void}) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[styles.toggle, value && styles.toggleOn]}>
      <View style={styles.knob} />
    </Pressable>
  );
}

export default function DropVerificationScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const delivery = getDeliveryRequest(route.params.deliveryId);
  const [otp, setOtp] = useState('');
  const [cashCollected, setCashCollected] = useState(false);
  const [photoUri, setPhotoUri] = useState<string>();
  const [completing, setCompleting] = useState(false);

  const codAmount = delivery.codAmount;
  const canComplete =
    otp.length === OTP_LENGTH && (codAmount == null || cashCollected) && !!photoUri && !completing;

  const onCapture = async () => {
    const uri = await capturePhoto();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  const onComplete = async () => {
    if (!canComplete || !photoUri) {
      return;
    }
    setCompleting(true);
    try {
      const completed = await completeDelivery(delivery.id, otp, photoUri);
      if (!completed) {
        Alert.alert(strings.dropVerification.failedTitle, strings.dropVerification.failedMessage);
        return;
      }
      // TODO: show the trip summary once it's designed
      navigation.popTo('Home');
    } catch {
      Alert.alert(strings.dropVerification.failedTitle, strings.dropVerification.failedMessage);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="dark-content" />
      <DeliveryHeader
        title={strings.dropVerification.title}
        onBack={() => navigation.goBack()}
        // TODO: open delivery help
        onHelp={() => {}}
      />

      <ScrollView
        contentContainerStyle={[styles.content, {paddingBottom: Math.max(insets.bottom, 20)}]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, styles.details]}>
          <View style={styles.recipient}>
            <View style={styles.packageIcon}>
              <PackageIcon size={18} color={colors.crimson} />
            </View>
            <View style={styles.recipientText}>
              <Text style={styles.packageCode}>{delivery.packageCode}</Text>
              <Text style={styles.recipientName}>{delivery.recipient.name}</Text>
              <Text style={styles.secondaryText}>{delivery.recipient.phone}</Text>
            </View>
          </View>
          <View style={styles.addressRow}>
            <PinIcon size={14} color={colors.textSecondary} />
            <Text style={[styles.secondaryText, styles.address]}>{delivery.dropoff.address}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.dropVerification.otp}</Text>
          <CodeBoxes
            value={otp}
            onChange={setOtp}
            length={OTP_LENGTH}
            style={styles.otpRow}
            boxStyle={styles.otpBox}
            textStyle={styles.otpText}
          />
          <Text style={styles.hint}>{strings.dropVerification.otpHint}</Text>
        </View>

        {codAmount != null ? (
          <View style={styles.card}>
            <View style={styles.cod}>
              <View style={styles.walletIcon}>
                <WalletIcon color={colors.truckAmber} />
              </View>
              <View style={styles.codText}>
                <Text style={styles.cardTitle}>{strings.dropVerification.cod}</Text>
                <Text style={styles.secondaryText}>
                  {strings.formatString(
                    strings.dropVerification.codHint,
                    formatRupees(codAmount),
                  )}
                </Text>
              </View>
              <Text style={styles.codAmount}>{formatRupees(codAmount)}</Text>
            </View>
            <View style={styles.collected}>
              <View style={styles.collectedText}>
                <Text style={styles.collectedTitle}>{strings.dropVerification.collected}</Text>
                <Text style={styles.hint}>{strings.dropVerification.collectedHint}</Text>
              </View>
              <Toggle value={cashCollected} onChange={setCashCollected} />
            </View>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.dropVerification.photo}</Text>
          <Pressable style={styles.capture} onPress={onCapture}>
            {photoUri ? (
              <Image source={{uri: photoUri}} style={styles.capturedPhoto} />
            ) : (
              <>
                <View style={styles.cameraIcon}>
                  <CameraIcon color={colors.crimson} />
                </View>
                <Text style={styles.captureText}>{strings.dropVerification.capture}</Text>
              </>
            )}
          </Pressable>
        </View>

        <Pressable
          style={[styles.complete, !canComplete && styles.completeDisabled]}
          onPress={onComplete}
          disabled={!canComplete}>
          <Text style={styles.completeText}>{strings.dropVerification.complete}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  details: {
    backgroundColor: colors.surface,
  },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  packageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimsonTint,
  },
  recipientText: {
    flex: 1,
    gap: 2,
  },
  packageCode: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.crimson,
  },
  recipientName: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.ink,
  },
  secondaryText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  address: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.ink,
  },
  otpRow: {
    gap: 8,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  otpText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.ink,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  cod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.walletTint,
  },
  codText: {
    flex: 1,
    gap: 2,
  },
  codAmount: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.ink,
  },
  collected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  collectedText: {
    gap: 2,
  },
  collectedTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.ink,
  },
  toggle: {
    width: 44,
    height: 24,
    padding: 2,
    borderRadius: 9999,
    flexDirection: 'row',
    backgroundColor: colors.border,
  },
  toggleOn: {
    justifyContent: 'flex-end',
    backgroundColor: colors.crimson,
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
  },
  capture: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  cameraIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimsonTint,
  },
  captureText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  capturedPhoto: {
    ...StyleSheet.absoluteFill,
  },
  complete: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  completeDisabled: {
    opacity: 0.5,
  },
  completeText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
