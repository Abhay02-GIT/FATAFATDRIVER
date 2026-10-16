import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import EarningsTabBar from '@/components/earnings/EarningsTabBar';
import EarningsTopBar from '@/components/earnings/EarningsTopBar';
import PayoutRow from '@/components/earnings/PayoutRow';
import TransferTotalCard from '@/components/earnings/TransferTotalCard';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {MDI_EARN} from '@/constants/iconPathsEarnings';
import {PAYOUTS, PAYOUT_SUMMARY} from '@/constants/payouts';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PayoutHistory'>;

export default function PayoutHistoryScreen({navigation}: Props) {
  const strings = useStrings();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EarningsTopBar
        title={strings.payoutHistory.title}
        left="back"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Alerts')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TransferTotalCard
          total={PAYOUT_SUMMARY.monthTotal}
          changePercent={PAYOUT_SUMMARY.changePercent}
        />

        <View style={styles.listHead}>
          <Text style={styles.listTitle}>{strings.payoutHistory.recentTransfers}</Text>
          {/* TODO: open the filter sheet (not designed yet) */}
          <Pressable style={styles.filter} hitSlop={6}>
            <MdiIcon path={MDI_EARN.filterVariant} size={18} color={colors.textDark} />
            <Text style={styles.filterText}>{strings.payoutHistory.filter}</Text>
          </Pressable>
        </View>

        {PAYOUTS.map(payout => (
          <PayoutRow
            key={payout.id}
            payout={payout}
            onPress={() => navigation.navigate('PayoutDetail', {payoutId: payout.id})}
          />
        ))}

        {/* TODO: load the next page of payouts from your API */}
        <Pressable style={styles.more}>
          <Text style={styles.moreText}>{strings.payoutHistory.loadMore}</Text>
          <MdiIcon path={MDI_DOCS.chevronDown} size={18} color={colors.textMuted} />
        </Pressable>
      </ScrollView>

      <EarningsTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  scroll: {flex: 1, backgroundColor: colors.grayBg},
  content: {paddingTop: 20, paddingBottom: 24},
  listHead: {
    marginTop: 20,
    marginBottom: 14,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },
  filter: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ringFill,
  },
  filterText: {
    marginLeft: 6,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textDark,
  },
  more: {
    height: 48,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    marginRight: 6,
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textMuted,
  },
});