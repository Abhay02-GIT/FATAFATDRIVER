import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeftIcon} from '@/components/common/Icons';
import ActivityRow from '@/components/earnings/ActivityRow';
import EarningsTabBar from '@/components/earnings/EarningsTabBar';
import EarningsTopBar from '@/components/earnings/EarningsTopBar';
import FilterChips from '@/components/earnings/FilterChips';
import type {FilterKey} from '@/components/earnings/FilterChips';
import {colors} from '@/constants/colors';
import {ACTIVITY, WEEK_ACTIVITY} from '@/constants/payouts';
import type {ActivityKind} from '@/constants/payouts';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'EarningsActivity'>;

const KIND_FOR_FILTER: Record<Exclude<FilterKey, 'all'>, ActivityKind> = {
  trips: 'trip',
  incentives: 'incentive',
  adjustments: 'adjustment',
};

export default function EarningsActivityScreen({navigation}: Props) {
  const strings = useStrings();
  const [filter, setFilter] = useState<FilterKey>('all');

  // keep only the rows that match the chosen chip; drop days with no rows left
  const groups = ACTIVITY.map(group => {
    const items =
      filter === 'all'
        ? group.items
        : group.items.filter(i => i.kind === KIND_FOR_FILTER[filter]);
    const total =
      filter === 'all' ? group.total : items.reduce((sum, i) => sum + i.amount, 0);
    return {...group, items, total};
  }).filter(group => group.items.length > 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EarningsTopBar
        title="Fatafat"
        left="avatar"
        onBellPress={() => navigation.navigate('Alerts')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.periodRow}>
          <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
            <ArrowLeftIcon size={16} color={colors.textDark} />
          </Pressable>
          <Text style={styles.period}>{WEEK_ACTIVITY.period}</Text>
        </View>

        <Text style={styles.total}>{formatRupees(WEEK_ACTIVITY.total, 2)}</Text>
        <Text style={styles.totalLabel}>{strings.activity.totalThisWeek}</Text>

        <View style={styles.chips}>
          <FilterChips value={filter} onChange={setFilter} />
        </View>

        {groups.length === 0 ? (
          <Text style={styles.empty}>{strings.activity.empty}</Text>
        ) : (
          groups.map(group => (
            <View key={group.id}>
              <View style={styles.groupHead}>
                <Text style={styles.groupTitle}>
                  {group.day === 'today'
                    ? strings.activity.today
                    : strings.formatString(strings.activity.yesterday, group.dateText ?? '')}
                </Text>
                <Text style={styles.groupTotal}>{formatRupees(group.total, 2)}</Text>
              </View>
              {group.items.map(item => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <EarningsTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  scroll: {flex: 1, backgroundColor: colors.grayBg},
  content: {paddingTop: 20, paddingBottom: 24},
  periodRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  period: {
    marginLeft: 8,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  total: {
    marginTop: 14,
    marginHorizontal: 20,
    fontFamily: fonts.bold,
    fontSize: 38,
    lineHeight: 46,
    color: colors.textDark,
  },
  totalLabel: {
    marginTop: 2,
    marginHorizontal: 20,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  chips: {
    marginTop: 18,
    marginBottom: 14,
  },
  groupHead: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupTitle: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textDark,
  },
  groupTotal: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.placeholder,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textMuted,
  },
});