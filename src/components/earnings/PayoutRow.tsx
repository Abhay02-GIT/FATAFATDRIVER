import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import type {Payout, PayoutStatus} from '@/constants/payouts';
import {useStrings} from '@/localization';
import {formatRupees} from '@/utils/formatCurrency';

// colours + icon for each status (left edge, card border, badge)
const TONES: Record<
  PayoutStatus,
  {edge: string; border: string; badgeBg: string; badgeText: string; icon: string}
> = {
  processing: {
    edge: colors.amber,
    border: colors.amberBorder,
    badgeBg: colors.amberPill,
    badgeText: colors.amber,
    icon: MDI_DOCS.dotsHorizontalCircleOutline,
  },
  paid: {
    edge: colors.green,
    border: colors.border,
    badgeBg: colors.mint,
    badgeText: colors.green,
    icon: MDI_DOCS.checkCircleOutline,
  },
  failed: {
    edge: colors.red,
    border: colors.redBorder,
    badgeBg: colors.redLight,
    badgeText: colors.red,
    icon: MDI_DOCS.alertCircleOutline,
  },
};

type Props = {
  payout: Payout;
  onPress: () => void;
};

// One transfer in "Recent Transfers": coloured left edge, period, amount, bank, status badge.
export default function PayoutRow({payout, onPress}: Props) {
  const strings = useStrings();
  const tone = TONES[payout.status];
  const failed = payout.status === 'failed';

  return (
    <Pressable style={styles.shadow} onPress={onPress}>
      <View style={[styles.card, {borderColor: tone.border}]}>
        <View style={[styles.edge, {backgroundColor: tone.edge}]} />

        <View style={styles.body}>
          <Text style={[styles.period, failed && styles.muted]}>{payout.period}</Text>
          <Text style={[styles.amount, failed && styles.amountFailed]}>
            {formatRupees(payout.amount, 2)}
          </Text>
          <View style={styles.bankRow}>
            <MdiIcon path={MDI_DOCS.bank} size={15} color={colors.placeholder} />
            <Text style={styles.bank}>{`${payout.bank} ****${payout.last4}`}</Text>
          </View>
        </View>

        <View style={[styles.badge, {backgroundColor: tone.badgeBg}]}>
          <MdiIcon path={tone.icon} size={13} color={tone.badgeText} />
          <Text style={[styles.badgeText, {color: tone.badgeText}]}>
            {strings.payoutHistory[payout.status]}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 20,
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingLeft: 27,
    paddingRight: 20,
    backgroundColor: colors.background,
  },
  edge: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  body: {
    flex: 1,
  },
  period: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.placeholder,
  },
  muted: {
    color: colors.placeholder,
  },
  amount: {
    marginTop: 6,
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textDark,
  },
  amountFailed: {
    color: colors.placeholder,
    textDecorationLine: 'line-through',
  },
  bankRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bank: {
    marginLeft: 6,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.placeholder,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    marginLeft: 4,
    fontFamily: fonts.semiBold,
    fontSize: 11,
  },
});