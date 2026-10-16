import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VerificationPending'>;

type VerificationStatus = 'pending' | 'approved' | 'rejected';

// The screen the rider lands on after verification succeeds.
// TODO: set this to the name of your home / tabs screen from navigation/types.ts
const HOME_ROUTE: keyof RootStackParamList = 'Home';

// TODO: replace this with your real API call.
// For testing, change 'pending' to 'approved' or 'rejected'.
async function fetchVerificationStatus(): Promise<VerificationStatus> {
  return 'approved'; // or 'pending' or 'rejected'
}

export default function VerificationPendingScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  // TODO: load these statuses from your API
  const statusRows = [
    {
      icon: MDI_DOCS.cardAccountDetailsOutline,
      name: strings.common.driversLicense,
      status: strings.common.approved,
      color: colors.green,
      trailing: MDI_DOCS.checkCircleOutline,
    },
    {
      icon: MDI.car,
      name: strings.verificationPending.vehicleRegistration,
      status: strings.common.underReview,
      color: colors.amber,
      trailing: MDI_DOCS.dotsHorizontalCircleOutline,
    },
    {
      icon: MDI_DOCS.shieldOutline,
      name: strings.common.backgroundCheck,
      status: strings.common.cleared,
      color: colors.green,
      trailing: MDI_DOCS.checkCircleOutline,
    },
  ];
  const [checking, setChecking] = useState(false);

  const onCheckStatus = async () => {
    if (checking) {
      return;
    }
    setChecking(true);
    try {
      const status = await fetchVerificationStatus();
      if (status === 'approved') {
        // Verified: go to home and clear the registration screens,
        // so Back can't return to them.
        navigation.reset({index: 0, routes: [{name: HOME_ROUTE}]});
      } else if (status === 'rejected') {
        navigation.navigate('VerificationRejected');
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

      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <Text style={styles.brand}>Fatafat</Text>
        <Pressable onPress={() => navigation.popToTop()} hitSlop={10}>
          <MdiIcon path={MDI_DOCS.close} size={24} color={colors.textMuted} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: Math.max(insets.bottom, 16) + 16},
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Illustration: clipboard + shield badge */}
        <View style={styles.illustration}>
          <View style={styles.badge}>
            <MdiIcon path={MDI_DOCS.shieldCheck} size={22} color={colors.textMuted} />
          </View>
          <View style={styles.clipboard}>
            <MdiIcon path={MDI_DOCS.clipboardClockOutline} size={84} color={colors.amber} />
          </View>
        </View>

        <Text style={styles.title}>{strings.common.pendingTitle}</Text>
        <Text style={styles.subtitle}>{strings.common.pendingSubtitle}</Text>

        <View style={[styles.card, styles.timeline]}>
          <View style={styles.step}>
            <View style={[styles.circle, styles.circleDone]}>
              <MdiIcon path={MDI.check} size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, {color: colors.green}]}>
              {strings.common.submitted}
            </Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.circle, styles.circleNow]}>
              <MdiIcon path={MDI_DOCS.timerSand} size={16} color={colors.amber} />
            </View>
            <Text style={[styles.stepLabel, {color: colors.amber}]}>
              {strings.common.reviewing}
            </Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.circle, styles.circleNext]}>
              <MdiIcon path={MDI_DOCS.lock} size={14} color={colors.textMuted} />
            </View>
            <Text style={[styles.stepLabel, {color: colors.textMuted}]}>
              {strings.common.approval}
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.statusCard]}>
          <Text style={styles.statusTitle}>
            {strings.verificationPending.documentStatus}
          </Text>
          {statusRows.map(row => (
            <View key={row.name} style={styles.statusRow}>
              <MdiIcon path={row.icon} size={22} color={row.color} />
              <View style={styles.statusText}>
                <Text style={styles.statusName}>{row.name}</Text>
                <Text style={[styles.statusSub, {color: row.color}]}>
                  {row.status}
                </Text>
              </View>
              <MdiIcon path={row.trailing} size={26} color={row.color} />
            </View>
          ))}
        </View>

        <ActionButton
          title={strings.common.checkStatus}
          onPress={onCheckStatus}
          disabled={checking}
          iconPosition="left"
          icon={<MdiIcon path={MDI_DOCS.refresh} size={20} color="#FFFFFF" />}
          style={styles.checkBtn}
        />
        <ActionButton
          title={strings.common.contactSupport}
          variant="outline"
          onPress={onSupport}
          iconPosition="left"
          textColor={colors.textMuted}
          icon={<MdiIcon path={MDI_DOCS.headset} size={20} color={colors.textMuted} />}
          style={styles.supportBtn}
        />
      </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: '#C9CBD1',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  illustration: {
    alignSelf: 'center',
    width: 120,
    height: 110,
  },
  clipboard: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 46,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    transform: [{rotate: '10deg'}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 6,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.placeholder,
  },
  card: {
    marginTop: 30,
    borderRadius: 16,
    backgroundColor: colors.background,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  timeline: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  step: {
    alignItems: 'center',
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: colors.green,
  },
  circleNow: {
    borderWidth: 2,
    borderColor: colors.amber,
  },
  circleNext: {
    backgroundColor: colors.ringFill,
  },
  stepLabel: {
    marginTop: 8,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  statusCard: {
    marginTop: 22,
  },
  statusTitle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textDark,
  },
  statusRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.textDark,
  },
  statusText: {
    flex: 1,
    marginLeft: 12,
  },
  statusName: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textDark,
  },
  statusSub: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 15,
  },
  checkBtn: {
    marginTop: 26,
  },
  supportBtn: {
    marginTop: 12,
  },
});