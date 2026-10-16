import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeftIcon, LockIcon} from '@/components/common/Icons';
import PrimaryButton from '@/components/common/PrimaryButton';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function OtpVerificationScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const phone = route.params?.phone ?? '+91 98765 43210'; // fallback for previewing

  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(true);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const onChangeText = (text: string) => {
    setCode(text.replace(/\D/g, '').slice(0, OTP_LENGTH));
  };

  const onResend = () => {
    // TODO: call the resend-OTP API
    setCode('');
    setSeconds(RESEND_SECONDS);
  };

  const onVerify = () => {
    // TODO: verify the code with the API, then go to the right screen
    navigation.replace('Home');
  };

  const complete = code.length === OTP_LENGTH;
  const timeLabel = `00:${String(seconds).padStart(2, '0')}`;
  const activeIndex = Math.min(code.length, OTP_LENGTH - 1);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: Math.max(insets.bottom, 16) + 16,
          },
        ]}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={18} color={colors.textDark} />
        </Pressable>

        <Text style={styles.title}>{strings.otp.title}</Text>
        <Text style={styles.subtitle}>
          {strings.formatString(
            strings.otp.subtitle,
            <Text style={styles.phone}>{phone}</Text>,
          )}
        </Text>

        <View style={styles.boxes}>
          {Array.from({length: OTP_LENGTH}).map((_, i) => {
            const char = code[i];
            const isActive = focused && i === activeIndex;
            return (
              <View
                key={i}
                style={[
                  styles.box,
                  isActive && styles.boxActive,
                ]}>
                <Text
                  style={[
                    styles.boxText,
                    !char && styles.boxPlaceholder,
                    isActive && !char && styles.boxPlaceholderActive,
                  ]}>
                  {char ?? '-'}
                </Text>
              </View>
            );
          })}
          <TextInput
            style={styles.hiddenInput}
            value={code}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            autoFocus
            caretHidden
          />
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>{strings.otp.notReceived}</Text>
          {seconds > 0 ? (
            <Text style={styles.resendLink}>
              {strings.formatString(strings.otp.resendIn, timeLabel)}
            </Text>
          ) : (
            <Pressable onPress={onResend}>
              <Text style={styles.resendLink}>{strings.otp.resend}</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.spacer} />

        <PrimaryButton
          title={strings.otp.verify}
          onPress={onVerify}
          disabled={!complete}
        />

        <View style={styles.safeRow}>
          <LockIcon size={12} color={colors.textMuted} />
          <Text style={styles.safeText}>{strings.otp.safe}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: colors.background},
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 32,
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
  },
  phone: {
    fontFamily: fonts.semiBold,
    color: colors.textDark,
  },
  boxes: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 50,
    height: 58,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  boxText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: colors.textDark,
  },
  boxPlaceholder: {
    color: '#C9CCD3',
  },
  boxPlaceholderActive: {
    color: colors.primary,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  resendRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  resendLink: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  safeRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeText: {
    marginLeft: 6,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
});