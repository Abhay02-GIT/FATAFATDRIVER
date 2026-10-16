import React from 'react';
import {Image, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CloseCircleIcon, ExpiredClockIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestExpired'>;

export default function RequestExpiredScreen({navigation}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();

  const onBackHome = () => navigation.popTo('Home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{strings.requestExpired.title}</Text>
          <Pressable style={styles.close} onPress={onBackHome} hitSlop={8}>
            <CloseCircleIcon color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.illustrationRow}>
            <View style={styles.clock}>
              <ExpiredClockIcon color={colors.silver} />
            </View>
            <View style={styles.imageFrame}>
              <Image source={{uri: 'request_expired'}} style={styles.image} />
            </View>
          </View>
        </View>

        <View style={styles.message}>
          <Text style={styles.title}>{strings.requestExpired.title}</Text>
          <Text style={styles.body}>{strings.requestExpired.message}</Text>
        </View>
      </View>

      <View style={[styles.bottom, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <Pressable style={styles.button} onPress={onBackHome}>
          <Text style={styles.buttonText}>{strings.requestExpired.backHome}</Text>
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
  close: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  illustration: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationRow: {
    width: 192,
    height: 192,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    opacity: 0.2,
  },
  imageFrame: {
    width: 128,
    height: 128,
    justifyContent: 'center',
  },
  // The 256x140 artwork is drawn edge to edge inside the 128px frame.
  image: {
    width: 128,
    height: 70,
    boxShadow: '0px 8px 5px rgba(0,0,0,0.08), 0px 20px 13px rgba(0,0,0,0.03)',
  },
  message: {
    gap: 12,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  bottom: {
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
