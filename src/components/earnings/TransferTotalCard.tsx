import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import NavyGradient from '@/components/earnings/NavyGradient';
import {colors} from '@/constants/colors';
import {MDI_EARN} from '@/constants/iconPathsEarnings';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {formatRupees} from '@/utils/formatCurrency';

type Props = {
  total: number;
  changePercent: number;
};

// Navy card on Payout History: "TOTAL TRANSFERRED THIS MONTH" + amount + "+12%" pill.
export default function TransferTotalCard({total, changePercent}: Props) {
  const strings = useStrings();
  const up = changePercent >= 0;
  const tone = up ? colors.greenOnDark : colors.redOnDark;

  return (
    <View style={styles.card}>
      <NavyGradient />
      <Text style={styles.label}>{strings.payoutHistory.totalTransferred}</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>{formatRupees(total, 2)}</Text>
        <View style={[styles.pill, {backgroundColor: up ? colors.greenOnDarkBg : colors.redOnDarkBg}]}>
          <MdiIcon path={up ? MDI_HOME.trendingUp : MDI_EARN.trendingDown} size={14} color={tone} />
          <Text style={[styles.pillText, {color: tone}]}>
            {`${up ? '+' : '-'}${Math.abs(changePercent)}%`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    paddingHorizontal: 24,
    paddingTop: 23,
    paddingBottom: 22,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.navyStart,
    elevation: 8,
    shadowColor: colors.navyStart,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.textOnDarkMuted,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    fontFamily: fonts.bold,
    fontSize: 38,
    lineHeight: 46,
    color: '#FFFFFF',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillText: {
    marginLeft: 5,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
});