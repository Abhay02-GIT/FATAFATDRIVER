import React from 'react';
import {Linking, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import BrandLogo from '@/components/common/BrandLogo';
import IconCircle from '@/components/common/IconCircle';
import {ArrowUpCircleIcon} from '@/components/common/Icons';
import {Description, Title} from '@/components/common/StatusText';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

// TODO: take the version from the server response
const LATEST_VERSION = '4.3.0';
const PACKAGE_NAME = 'com.fatafatdriver';

async function openStore() {
  try {
    await Linking.openURL(`market://details?id=${PACKAGE_NAME}`);
  } catch {
    await Linking.openURL(
      `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`,
    );
  }
}

export default function UpdateRequiredScreen() {
  const strings = useStrings();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <IconCircle backgroundColor={colors.primaryLight}>
        <ArrowUpCircleIcon size={28} color={colors.primary} />
      </IconCircle>

      <Title>{strings.updateRequired.title}</Title>
      <Description>{strings.updateRequired.description}</Description>

      <View style={styles.pill}>
        <Text style={styles.pillText}>
          {strings.formatString(strings.updateRequired.available, LATEST_VERSION)}
        </Text>
      </View>

      <Pressable
        onPress={openStore}
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>{strings.updateRequired.updateNow}</Text>
      </Pressable>

      <View style={styles.logo}>
        <BrandLogo width={100} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    paddingBottom: 56,
  },
  pill: {
    marginTop: 28,
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
  },
  pillText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  button: {
    marginTop: 28,
    alignSelf: 'stretch',
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  logo: {
    marginTop: 24,
  },
});