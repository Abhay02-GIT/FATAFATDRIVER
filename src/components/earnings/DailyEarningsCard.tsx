import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type DayKey = (typeof DAY_KEYS)[number];

const CHART_HEIGHT = 112;
const MIN_BAR = 14;

type Props = {
  // earnings per day, Monday first (7 values)
  values: number[];
  // index of the highlighted day (0 = Mon ... 6 = Sun)
  activeIndex: number;
  onDetails: () => void;
};

// "Daily Earnings" card: 7 bars (Mon-Sun) with today highlighted.
export default function DailyEarningsCard({values, activeIndex, onDetails}: Props) {
  const strings = useStrings();
  const max = Math.max(...values, 1);

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{strings.earnings.dailyEarnings}</Text>
        <Pressable style={styles.details} onPress={onDetails} hitSlop={6}>
          <Text style={styles.detailsText}>{strings.earnings.details}</Text>
          <MdiIcon path={MDI_DOCS.chevronRight} size={16} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.chart}>
        {DAY_KEYS.map((key, i) => {
          const active = i === activeIndex;
          const height = Math.max((values[i] ?? 0) / max * CHART_HEIGHT, MIN_BAR);
          return (
            <View key={key} style={styles.column}>
              <View style={styles.barArea}>
                <View
                  style={[styles.bar, {height}, active && styles.barActive]}
                />
              </View>
              <Text style={[styles.day, active ? styles.dayActive : styles.dayIdle]}>
                {strings.earnings.days[key]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textDark,
  },
  details: {
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 7,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
  },
  detailsText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.primary,
  },
  chart: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  barArea: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 28,
    borderRadius: 8,
    backgroundColor: colors.ringFill,
  },
  barActive: {
    backgroundColor: colors.primary,
  },
  day: {
    marginTop: 12,
    fontSize: 11,
  },
  dayIdle: {
    fontFamily: fonts.medium,
    color: colors.textMuted,
  },
  dayActive: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});