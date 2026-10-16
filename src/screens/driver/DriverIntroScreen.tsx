import React from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverIntro'>;

export default function DriverIntroScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  const features = [
    {
      path: MDI_DOCS.clockOutline,
      title: strings.driverIntro.hoursTitle,
      text: strings.driverIntro.hoursText,
    },
    {
      path: MDI_DOCS.walletOutline,
      title: strings.driverIntro.earningsTitle,
      text: strings.driverIntro.earningsText,
    },
    {
      path: MDI_DOCS.shieldCheckOutline,
      title: strings.driverIntro.safetyTitle,
      text: strings.driverIntro.safetyText,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.content, {paddingTop: insets.top + 24}]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.driverIntro.title}</Text>
        <Text style={styles.subtitle}>{strings.driverIntro.subtitle}</Text>

        {/* driver_hero.png must be in android drawable (see Step 7) */}
        <Image
          source={{uri: 'driver_hero'}}
          style={styles.hero}
          resizeMode="cover"
        />

        <View style={styles.list}>
          {features.map(item => (
            <View key={item.title} style={styles.card}>
              <View style={styles.iconTile}>
                <MdiIcon path={item.path} size={22} color={colors.primary} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomBar>
        <ActionButton
          title={strings.common.startRegistration}
          onPress={() => navigation.navigate('DriverPersonal')}
        />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 10,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  hero: {
    marginTop: 24,
    width: '100%',
    aspectRatio: 350 / 180,
    borderRadius: 20,
  },
  list: {
    marginTop: 20,
    gap: 12,
  },
  card: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  iconTile: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textDark,
  },
  cardDesc: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});