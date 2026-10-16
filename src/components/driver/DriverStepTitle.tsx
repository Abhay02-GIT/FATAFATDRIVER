import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

type Props = {title: string; step: number; total?: number};

export default function DriverStepTitle({title, step, total = 4}: Props) {
  const strings = useStrings();

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.step}>
          {strings.formatString(strings.common.stepOf, step, total)}
        </Text>
      </View>
      <View style={styles.bars}>
        {Array.from({length: total}).map((_, i) => (
          <View key={i} style={[styles.bar, i < step && styles.barOn]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textDark,
  },
  step: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.placeholder,
  },
  bars: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.segment,
  },
  barOn: {
    backgroundColor: colors.primary,
  },
});