import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {MDI} from '@/constants/iconPaths';
import {fonts} from '@/constants/typography';
import type {ActivityItem} from '@/constants/payouts';
import {useStrings} from '@/localization';
import {formatRupees} from '@/utils/formatCurrency';

function vehicleIcon(vehicle?: string) {
  if (vehicle === 'bike' || vehicle === 'scooty') {
    return MDI.motorbike;
  }
  return vehicle === 'cab' ? MDI.taxi : MDI.car;
}

type Props = {item: ActivityItem};

// One line of the earnings list: icon tile, title + time, amount and a small arrow.
export default function ActivityRow({item}: Props) {
  const strings = useStrings();
  const isTrip = item.kind === 'trip';
  const positive = !isTrip && item.amount >= 0;

  const title = isTrip
    ? strings.formatString(strings.activity.tripId, item.tripId ?? '')
    : item.title ?? '';
  const sub =
    isTrip && item.vehicle ? `${item.time} • ${strings.vehicles[item.vehicle]}` : item.time;

  return (
    <View style={styles.card}>
      <View style={[styles.tile, !isTrip && styles.tileAmber]}>
        <MdiIcon
          path={isTrip ? vehicleIcon(item.vehicle) : MDI_HOME.starOutline}
          size={isTrip ? 24 : 26}
          color={isTrip ? colors.textBody : colors.amber}
        />
      </View>

      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, positive && styles.amountPositive]}>
          {`${positive ? '+' : ''}${formatRupees(item.amount, 2)}`}
        </Text>
        <MdiIcon path={MDI_DOCS.chevronRight} size={16} color={colors.textMuted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  tileAmber: {
    backgroundColor: colors.amberLight,
  },
  text: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textDark,
  },
  sub: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  right: {
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textDark,
  },
  amountPositive: {
    color: colors.green,
  },
});