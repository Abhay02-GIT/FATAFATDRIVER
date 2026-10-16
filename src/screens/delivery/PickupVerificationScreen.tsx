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
import {
  AddPhotoIcon,
  ArrowBackIcon,
  CameraSmallIcon,
  CheckCircleIcon,
  DialpadIcon,
  RecenterIcon,
  TruckIcon,
  WarningIcon,
} from '@/components/delivery/DeliveryIcons';
import CodeBoxes from '@/components/delivery/CodeBoxes';
import {colors} from '@/constants/colors';
import {getDeliveryRequest} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {capturePhoto} from '@/utils/camera';

type Props = NativeStackScreenProps<RootStackParamList, 'PickupVerification'>;

const PIN_LENGTH = 4;

// TODO: send the PIN and photo to your API. Returns false when the PIN is wrong.
async function verifyPickup(deliveryId: string, pin: string, photoUri: string) {
  return Boolean(deliveryId && photoUri) && pin.length === PIN_LENGTH;
}

export default function PickupVerificationScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const request = getDeliveryRequest(route.params.deliveryId);
  const [pin, setPin] = useState('');
  const [photoUri, setPhotoUri] = useState<string>();
  const [verifying, setVerifying] = useState(false);

  const canVerify = pin.length === PIN_LENGTH && !!photoUri && !verifying;

  const onCapture = async () => {
    const uri = await capturePhoto();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  const onVerify = async () => {
    if (!photoUri || pin.length !== PIN_LENGTH || verifying) {
      return;
    }
    setVerifying(true);
    try {
      const verified = await verifyPickup(request.id, pin, photoUri);
      if (!verified) {
        Alert.alert(strings.pickupVerification.failedTitle, strings.pickupVerification.failedMessage);
        return;
      }
      navigation.replace('ParcelInTransit', {deliveryId: request.id});
    } catch {
      Alert.alert(strings.pickupVerification.failedTitle, strings.pickupVerification.failedMessage);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
            <ArrowBackIcon color={colors.silverCool} />
          </Pressable>
          <Text style={styles.headerTitle}>{strings.pickupVerification.header}</Text>
        </View>
      </View>

      {/* TODO: replace the static preview with a live map */}
      <View style={styles.canvas}>
        <Image source={{uri: 'delivery_map'}} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <Image
          source={{uri: 'parcel_pickup_overlay'}}
          style={[StyleSheet.absoluteFill, styles.overlay]}
          resizeMode="cover"
        />

        {/* TODO: recenter the live map on the driver */}
        <Pressable style={styles.recenter}>
          <RecenterIcon color={colors.silverCool} />
        </Pressable>

        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={[styles.sheetContent, {paddingBottom: 24 + insets.bottom}]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.handle} />

            <View style={styles.order}>
              <View style={styles.orderIcon}>
                <TruckIcon color={colors.truckAmber} />
              </View>
              <View style={styles.orderText}>
                <Text style={styles.custody}>{strings.pickupVerification.custody}</Text>
                <Text style={styles.orderNo}>
                  {strings.formatString(strings.pickupVerification.order, request.orderNo)}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionLabel}>
                <DialpadIcon color={colors.silver} />
                <Text style={styles.sectionLabelText}>{strings.pickupVerification.pinLabel}</Text>
              </View>
              <CodeBoxes
                value={pin}
                onChange={setPin}
                length={PIN_LENGTH}
                placeholder="•"
                style={styles.pinRow}
                boxStyle={styles.pinBox}
                textStyle={styles.pinText}
                placeholderStyle={styles.pinEmpty}
              />
              <Text style={styles.pinHint}>{strings.pickupVerification.pinHint}</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionLabel}>
                <CameraSmallIcon color={colors.silver} />
                <Text style={styles.sectionLabelText}>{strings.pickupVerification.photoLabel}</Text>
              </View>
              <Pressable style={styles.capture} onPress={onCapture}>
                {photoUri ? (
                  <Image source={{uri: photoUri}} style={styles.capturedPhoto} />
                ) : (
                  <>
                    <View style={styles.captureIcon}>
                      <AddPhotoIcon color={colors.silverCool} />
                    </View>
                    <Text style={styles.captureText}>{strings.pickupVerification.capturePhoto}</Text>
                  </>
                )}
              </Pressable>
            </View>

            <View style={styles.terms}>
              <View style={styles.termsIcon}>
                <WarningIcon color={colors.salmon} />
              </View>
              <View style={styles.termsText}>
                <Text style={styles.termsTitle}>{strings.pickupVerification.prohibitedTitle}</Text>
                <Text style={styles.termsBody}>{strings.pickupVerification.prohibitedText}</Text>
              </View>
            </View>

            <Pressable
              style={[styles.verify, !canVerify && styles.verifyDisabled]}
              onPress={onVerify}
              disabled={!canVerify}>
              <CheckCircleIcon color="#FFFFFF" />
              <Text style={styles.verifyText}>{strings.pickupVerification.verify}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  },
  back: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginRight: 44,
    textAlign: 'center',
    fontFamily: fonts.extraBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.headerFaint,
  },
  canvas: {
    flex: 1,
  },
  overlay: {
    opacity: 0.6,
  },
  recenter: {
    position: 'absolute',
    top: 24,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    boxShadow: '0px -4px 20px rgba(0,0,0,0.5)',
  },
  sheetContent: {
    gap: 24,
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  // The 16px under the handle is part of the 24px gap in Figma.
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    marginBottom: -8,
    borderRadius: 9999,
    backgroundColor: colors.charcoal,
  },
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  orderText: {
    flex: 1,
    gap: 4,
  },
  custody: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.hint,
  },
  orderNo: {
    fontFamily: fonts.medium,
    fontSize: 18,
    lineHeight: 24,
    color: colors.inkDeep,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionLabelText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.silver,
  },
  pinRow: {
    justifyContent: 'space-between',
  },
  pinBox: {
    width: 56,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.slateBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  pinText: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    color: colors.inkDeep,
  },
  pinEmpty: {
    color: colors.textSecondary,
  },
  pinHint: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.hint,
  },
  capture: {
    height: 128,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.slateBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.crimson,
  },
  captureIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fieldGray,
  },
  captureText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: colors.silverCool,
  },
  capturedPhoto: {
    ...StyleSheet.absoluteFill,
  },
  terms: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.charcoal,
    backgroundColor: colors.background,
  },
  termsIcon: {
    paddingTop: 2,
  },
  termsText: {
    flex: 1,
    gap: 4,
  },
  termsTitle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkDeep,
  },
  termsBody: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.hint,
  },
  verify: {
    height: 54,
    marginTop: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.crimson,
    boxShadow: '0px 4px 14px rgba(16,166,74,0.3)',
  },
  verifyDisabled: {
    opacity: 0.5,
  },
  verifyText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
