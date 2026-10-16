import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import SectionLabel from '@/components/driver/SectionLabel';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverVerificationRejected'>;

const RED = '#E5242C';

export default function DriverVerificationRejectedScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  // TODO: load the rejected documents and reasons from your API
  const rejected = [
    {
      name: strings.driverVerificationRejected.drivingLicense,
      reason: strings.common.blurryReason,
      tip: strings.common.blurryTip,
    },
    {
      name: strings.common.aadharCard,
      reason: strings.driverVerificationRejected.expiredReason,
      tip: strings.driverVerificationRejected.expiredTip,
    },
  ];

  const onSupport = () => {
    // TODO: open support (Linking.openURL('tel:...') or a help screen)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.content, {paddingTop: insets.top + 40}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MdiIcon path={MDI_DOCS.triangle} size={30} color={RED} />
        </View>

        <Text style={styles.title}>{strings.common.rejectedTitle}</Text>
        <Text style={styles.subtitle}>{strings.common.rejectedSubtitle}</Text>

        <SectionLabel
          title={strings.formatString(strings.driverVerificationRejected.attention, rejected.length) as string}
          style={styles.sectionLabel}
        />

        {rejected.map(item => (
          <View key={item.name} style={styles.card}>
            <View style={styles.accent} />
            <View style={styles.cardBody}>
              <View style={styles.head}>
                <View style={styles.dot} />
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.badge}>{strings.common.rejected}</Text>
              </View>
              <Text style={styles.reason}>{item.reason}</Text>
              <View style={styles.tip}>
                <Text style={styles.tipText}>
                  <Text style={styles.tipLabel}>{strings.driverVerificationRejected.tip}</Text>
                  {item.tip}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomBar>
        <ActionButton
          title={strings.driverVerificationRejected.fixResubmit}
          onPress={() => navigation.navigate('DriverDocuments')}
        />
        <ActionButton
          title={strings.common.contactSupport}
          variant="outline"
          onPress={onSupport}
          textColor={colors.placeholder}
          style={styles.supportBtn}
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
  hero: {
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: RED,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 22,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  sectionLabel: {
    marginTop: 34,
    marginBottom: 12,
  },
  card: {
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RED,
    backgroundColor: colors.background,
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.primary,
  },
  cardBody: {
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 14,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: RED,
  },
  docName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
  },
  badge: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: RED,
  },
  reason: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  tip: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
  },
  tipText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  tipLabel: {
    fontFamily: fonts.bold,
    color: colors.placeholder,
  },
  supportBtn: {
    marginTop: 12,
    height: 50,
    borderColor: colors.border,
  },
});