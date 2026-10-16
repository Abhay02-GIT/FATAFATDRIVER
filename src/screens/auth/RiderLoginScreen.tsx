import React, {useState} from 'react';
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
import BrandLogo from '@/components/common/BrandLogo';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  HelpCircleIcon,
} from '@/components/common/Icons';
import PrimaryButton from '@/components/common/PrimaryButton';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RiderLogin'>;

const PHONE_LENGTH = 10;

function formatPhone(digits: string) {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

export default function RiderLoginScreen({navigation}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const [digits, setDigits] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  const onChangeText = (text: string) => {
    setDigits(text.replace(/\D/g, '').slice(0, PHONE_LENGTH));
    setError(false);
  };

  const onContinue = () => {
    if (digits.length !== PHONE_LENGTH) {
      setError(true);
      return;
    }
    navigation.navigate('OtpVerification', {phone: formatPhone(digits)});
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 24,
            paddingBottom: Math.max(insets.bottom, 16) + 16,
          },
        ]}>
        <View style={styles.logo}>
          <BrandLogo width={110} />
        </View>

        <Text style={styles.title}>{strings.login.title}</Text>
        <Text style={styles.subtitle}>{strings.login.subtitle}</Text>

        <Text style={styles.label}>{strings.login.mobileNumber}</Text>
        <View
          style={[
            styles.inputRow,
            focused && styles.inputRowFocused,
            error && styles.inputRowError,
          ]}>
          <View style={styles.countryBox}>
            <Text style={styles.flag}>🇮🇳</Text>
            <Text style={styles.code}>+91</Text>
            <ChevronDownIcon size={12} color={colors.textMuted} />
          </View>
          <TextInput
            style={styles.input}
            value={formatPhone(digits)}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="00000 00000"
            placeholderTextColor="#C9CCD3"
            keyboardType="number-pad"
            maxLength={PHONE_LENGTH + 1}
          />
        </View>
        {error ? (
          <Text style={styles.error}>{strings.login.invalidNumber}</Text>
        ) : null}

        <View style={styles.spacer} />

        <View style={styles.linksRow}>
          {/* TODO: open the support page */}
          <Pressable style={styles.support}>
            <HelpCircleIcon size={14} color={colors.textMuted} />
            <Text style={styles.linkText}>{strings.login.support}</Text>
          </Pressable>
          {/* TODO: open terms & privacy page */}
          <Pressable>
            <Text style={[styles.linkText, styles.underline]}>
              {strings.login.terms}
            </Text>
          </Pressable>
        </View>

        <PrimaryButton
          title={strings.common.continue}
          onPress={onContinue}
          icon={<ArrowRightIcon size={18} color="#FFFFFF" />}
        />

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>{strings.login.newUser}</Text>
          <Pressable onPress={() => navigation.navigate('BecomeRider')}>
            <Text style={styles.registerLink}>{strings.login.register}</Text>
          </Pressable>
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
  logo: {
    alignSelf: 'center',
  },
  title: {
    marginTop: 28,
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
  label: {
    marginTop: 32,
    marginBottom: 8,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  inputRow: {
    height: 54,
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  inputRowFocused: {
    borderColor: colors.primary,
  },
  inputRowError: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  countryBox: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  flag: {
    fontSize: 14,
  },
  code: {
    marginLeft: 6,
    marginRight: 6,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 1,
    color: colors.textDark,
  },
  error: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    marginLeft: 6,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  underline: {
    marginLeft: 0,
    textDecorationLine: 'underline',
  },
  registerRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  registerLink: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
  },
});