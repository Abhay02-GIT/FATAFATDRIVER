import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DailyEarningsCard from '@/components/earnings/DailyEarningsCard';
import type { DayKey } from '@/components/earnings/DailyEarningsCard';
import EarningsHeader from '@/components/earnings/EarningsHeader';
import InfoCard from '@/components/earnings/InfoCard';
import PayoutCard from '@/components/earnings/PayoutCard';
import WeekCard from '@/components/earnings/WeekCard';
import { colors } from '@/constants/colors';
import { MDI_DOCS } from '@/constants/iconPathsDocs';
import { useStrings } from '@/localization';
import type { RootStackParamList } from '@/navigation/types';
import { useProfilePhoto } from '@/state/profilePhotoStore';
import { formatRupees } from '@/utils/formatCurrency';

// path from @mdi/js (star), Apache-2.0
const STAR =
  'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27Z';

// TODO: load all of this from your API
const EARNINGS = {
  weekTotal: 12450,
  changePercent: 15, // vs last week
  daily: [1800, 2400, 2900, 1650, 2200, 2650, 1400], // Mon ... Sun
  payout: { time: '9:00 AM', accountLast4: '4829' }, // always "tomorrow" for now
  incentive: { active: true, tripsLeft: 3, bonus: 500 },
  subscription: { activeTill: 'sun' as DayKey },
};

// Date.getDay(): 0 = Sunday ... 6 = Saturday  ->  0 = Monday ... 6 = Sunday
function todayIndex() {
  return (new Date().getDay() + 6) % 7;
}

export default function EarningsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const strings = useStrings();
  const photoUri = useProfilePhoto();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EarningsHeader photoUri={photoUri} onBellPress={() => navigation.navigate('Alerts')} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <WeekCard
          total={EARNINGS.weekTotal}
          changePercent={EARNINGS.changePercent}
          onPress={() => navigation.navigate('PayoutHistory')}
        />
        <DailyEarningsCard
          values={EARNINGS.daily}
          activeIndex={todayIndex()}
          onDetails={() => navigation.navigate('EarningsActivity')}
        />

        <PayoutCard
          when={`${strings.earnings.tomorrow}, ${EARNINGS.payout.time}`}
          accountLast4={EARNINGS.payout.accountLast4}
        />

        <View style={styles.row}>
          <InfoCard
            highlighted
            iconPath={STAR}
            iconColor={colors.amber}
            iconBg={colors.amberLight}
            badge={EARNINGS.incentive.active ? strings.earnings.active : undefined}
            title={strings.earnings.incentives}
            subtitle={String(strings.formatString(
              strings.earnings.incentiveText,
              String(EARNINGS.incentive.tripsLeft),
              formatRupees(EARNINGS.incentive.bonus),

            ))}
          />
          <View style={styles.gap} />
          <InfoCard
            iconPath={MDI_DOCS.shieldCheck}
            iconColor={colors.textSecondary}
            iconBg={colors.surfaceAlt}
            onPress={() => navigation.navigate('WeeklyPlan')}
            title={strings.earnings.subscription}
            subtitle={String(strings.formatString(
              strings.earnings.subscriptionText,
              strings.earnings.dayNames[EARNINGS.subscription.activeTill],

            ))}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: colors.grayBg },
  content: { paddingTop: 20, paddingBottom: 28 },
  row: {
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  gap: { width: 14 },
});
