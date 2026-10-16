import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import DriverTitleBar from '@/components/driver/DriverTitleBar';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverPayout'>;

// Soft coloured glow in the top-right corner of each card
function Glow({color}: {color: string}) {
  return (
    <>
      <View style={[styles.glow, styles.glowBig, {backgroundColor: color}]} />
      <View style={[styles.glow, styles.glowMid, {backgroundColor: color}]} />
      <View style={[styles.glow, styles.glowSmall, {backgroundColor: color}]} />
    </>
  );
}

export default function DriverPayoutScreen({navigation}: Props) {
  const strings = useStrings();
  const onAddBank = () => {
    // TODO: open the bank account form (not designed yet)
    navigation.navigate('DriverReview');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DriverTitleBar title={strings.driverPayout.title} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.common.payoutTitle}</Text>
        <Text style={styles.subtitle}>{strings.common.payoutSubtitle}</Text>

        <View style={styles.list}>
          <View style={styles.card}>
            <Glow color="#F9A8C0" />
            <View style={styles.tile}>
              <MdiIcon path={MDI_DOCS.shield} size={26} color="#22C55E" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{strings.common.securityTitle}</Text>
              <Text style={styles.cardSub}>{strings.common.securityText}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Glow color="#FCD34D" />
            <View style={styles.tile}>
              <View style={styles.dot} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{strings.common.verifiedTitle}</Text>
              <Text style={styles.cardSub}>{strings.common.verifiedText}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Glow color="#9CA3AF" />
            <View style={styles.tile}>
              <MdiIcon path={MDI_DOCS.squareEditOutline} size={24} color="#D1D5DB" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{strings.common.editableTitle}</Text>
              <Text style={styles.cardSub}>{strings.common.editableText}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomBar>
        <ActionButton title={strings.common.addBankAccount} onPress={onAddBank} />
        <Pressable
          onPress={() => navigation.navigate('DriverReview')}
          hitSlop={10}
          style={styles.later}>
          <Text style={styles.laterText}>{strings.common.doThisLater}</Text>
        </Pressable>
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
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  list: {
    marginTop: 26,
    gap: 12,
  },
  card: {
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: colors.background,
  },
  glow: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  glowBig: {
    right: -40,
    top: -40,
    width: 130,
    height: 130,
  },
  glowMid: {
    right: -26,
    top: -26,
    width: 90,
    height: 90,
  },
  glowSmall: {
    right: -12,
    top: -12,
    width: 54,
    height: 54,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F5A623',
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
  cardSub: {
    marginTop: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.placeholder,
  },
  later: {
    marginTop: 18,
    alignSelf: 'center',
  },
  laterText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.placeholder,
    textDecorationLine: 'underline',
  },
});