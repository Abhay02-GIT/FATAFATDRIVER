import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import SectionLabel from '@/components/driver/SectionLabel';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverVerificationPending'>;

type VerificationStatus = 'pending' | 'approved' | 'rejected';

// TODO: replace this with your real API call.
// For testing, change 'pending' to 'rejected' or 'approved'.
async function fetchVerificationStatus(): Promise<VerificationStatus> {
  return 'rejected';
}

const AMBER = '#F5A623';

export default function DriverVerificationPendingScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  // TODO: load these statuses from your API
  const statusRows = [
    {name: strings.common.driversLicense, label: strings.common.approved, tone: 'pink'},
    {name: strings.common.aadharCard, label: strings.common.underReview, tone: 'amber'},
    {name: strings.common.backgroundCheck, label: strings.common.cleared, tone: 'pink'},
  ];
  const [checking, setChecking] = useState(false);

  const onCheckStatus = async () => {
    if (checking) {
      return;
    }
    setChecking(true);
    try {
      const status = await fetchVerificationStatus();
      if (status === 'rejected') {
        navigation.navigate('DriverVerificationRejected');
      } else if (status === 'approved') {
        // TODO: open the driver home / dashboard here, for example
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
      // 'pending': stay on this screen
    } finally {
      setChecking(false);
    }
  };

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
          <View style={styles.heroDot} />
        </View>

        <Text style={styles.title}>{strings.common.pendingTitle}</Text>
        <Text style={styles.subtitle}>{strings.common.pendingSubtitle}</Text>

        <View style={styles.timeline}>
          <View style={styles.step}>
            <View style={[styles.circle, {borderColor: colors.primary}]}>
              <MdiIcon path={MDI.check} size={16} color={colors.primary} />
            </View>
            <Text style={styles.stepLabel}>{strings.common.submitted}</Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.circle, {borderColor: AMBER}]}>
              <View style={styles.nowDot} />
            </View>
            <Text style={styles.stepLabel}>{strings.common.reviewing}</Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.circle, styles.circleNext]}>
              <View style={styles.nextRing} />
            </View>
            <Text style={[styles.stepLabel, styles.stepLabelNext]}>
              {strings.common.approval}
            </Text>
          </View>
        </View>

        <SectionLabel
          title={strings.driverVerificationPending.documentStatus}
          style={styles.statusLabel}
        />
        <View style={styles.list}>
          {statusRows.map(row => (
            <View key={row.name} style={styles.row}>
              <MdiIcon path={MDI_DOCS.file} size={22} color={colors.placeholder} />
              <Text style={styles.rowName}>{row.name}</Text>
              <View
                style={[styles.pill, row.tone === 'amber' ? styles.pillAmber : styles.pillPink]}>
                <Text
                  style={[
                    styles.pillText,
                    {color: row.tone === 'amber' ? AMBER : colors.primary},
                  ]}>
                  {row.label}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottom, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <ActionButton
          title={strings.common.checkStatus}
          variant="outline"
          disabled={checking}
          onPress={onCheckStatus}
          textColor={colors.primary}
          style={styles.checkBtn}
        />
        <ActionButton
          title={strings.common.contactSupport}
          variant="outline"
          onPress={onSupport}
          textColor={colors.placeholder}
          style={styles.supportBtn}
        />
      </View>
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
    borderColor: AMBER,
    backgroundColor: '#FFF6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AMBER,
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
    paddingHorizontal: 6,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  timeline: {
    marginTop: 36,
    marginHorizontal: -20,
    flexDirection: 'row',
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleNext: {
    borderWidth: 1.5,
    borderColor: colors.placeholder,
  },
  nowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: AMBER,
  },
  nextRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.placeholder,
  },
  stepLabel: {
    marginTop: 8,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textDark,
  },
  stepLabelNext: {
    fontFamily: fonts.medium,
    color: colors.placeholder,
  },
  statusLabel: {
    marginTop: 36,
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  row: {
    height: 54,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: colors.background,
  },
  rowName: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  pill: {
    height: 24,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillPink: {
    backgroundColor: colors.pinkSoft,
  },
  pillAmber: {
    backgroundColor: colors.amberLight,
  },
  pillText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.background,
  },
  checkBtn: {
    height: 48,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  supportBtn: {
    marginTop: 12,
    height: 48,
    borderRadius: 10,
    borderColor: colors.border,
  },
});