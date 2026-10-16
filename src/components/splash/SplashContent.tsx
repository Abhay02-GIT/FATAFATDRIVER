import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants/colors';

const LOGO_WIDTH = 160;
const LOGO_RATIO = 1525 / 1031;

export default function SplashContent() {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'logo'}}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.role}>DRIVER</Text>
      <Text style={styles.tagline}>Fast.Safe.Everywhere</Text>
      <ActivityIndicator
        style={styles.spinner}
        size="small"
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH / LOGO_RATIO,
  },
  role: {
    marginTop: 14,
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.2,
  },
  tagline: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textMuted,
  },
  spinner: {
    marginTop: 32,
    transform: [{scale: 1.1}],
  },
});