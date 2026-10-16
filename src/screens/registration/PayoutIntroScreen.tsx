import React from 'react';
import {Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowRightIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PayoutIntro'>;

export default function PayoutIntroScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  const perks = [
    {
      path: MDI_DOCS.lock,
      color: colors.green,
      title: strings.common.securityTitle,
      text: strings.common.securityText,
    },
    {
      path: MDI_DOCS.shieldCheck,
      color: colors.textMuted,
      title: strings.common.verifiedTitle,
      text: strings.common.verifiedText,
    },
    {
      path: MDI_DOCS.pencil,
      color: colors.textMuted,
      title: strings.common.editableTitle,
      text: strings.common.editableText,
    },
  ];

  const onAddBank = () => {
    // TODO: open the bank account form (not designed yet)
    navigation.navigate('ReviewSubmit');
  };

  const onLater = () => navigation.navigate('ReviewSubmit');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* payout_card.png must be in android drawable (see Step 7) */}
          <Image
            source={{uri: 'payout_card'}}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.title}>{strings.payoutIntro.title}</Text>
          <Text style={styles.subtitle}>{strings.common.payoutSubtitle}</Text>

          <View style={styles.perks}>
            {perks.map(perk => (
              <View key={perk.title} style={styles.perkRow}>
                <View style={styles.perkIcon}>
                  <MdiIcon path={perk.path} size={20} color={perk.color} />
                </View>
                <View style={styles.perkText}>
                  <Text style={styles.perkTitle}>{perk.title}</Text>
                  <Text style={styles.perkSub}>{perk.text}</Text>
                </View>
              </View>
            ))}
          </View>

          <ActionButton
            title={strings.common.addBankAccount}
            onPress={onAddBank}
            style={styles.cta}
            icon={<ArrowRightIcon size={18} color="#FFFFFF" />}
          />

          <Pressable onPress={onLater} hitSlop={10} style={styles.later}>
            <Text style={styles.laterText}>{strings.common.doThisLater}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: colors.background,
    // elevation: 6,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.08,
    // shadowRadius: 14,
  },
  image: {
    alignSelf: 'stretch',
    aspectRatio: 1.85,
    borderRadius: 12,
  },
  title: {
    marginTop: 56,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.placeholder,
  },
  perks: {
    alignSelf: 'stretch',
    marginTop: 36,
    padding: 16,
    gap: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.textDark,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkText: {
    flex: 1,
    marginLeft: 12,
  },
  perkTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textDark,
  },
  perkSub: {
    marginTop: 1,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.placeholder,
  },
  cta: {
    alignSelf: 'stretch',
    marginTop: 36,
  },
  later: {
    marginTop: 26,
  },
  laterText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.placeholder,
  },
});