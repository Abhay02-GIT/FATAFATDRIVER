import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@/constants/colors';

type SegmentedProps = {step: number; total?: number};

export function SegmentedProgress({step, total = 4}: SegmentedProps) {
  return (
    <View style={styles.row}>
      {Array.from({length: total}).map((_, i) => (
        <View key={i} style={[styles.segment, i < step && styles.segmentOn]} />
      ))}
    </View>
  );
}

export function BarProgress({fraction}: {fraction: number}) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, {width: `${Math.round(fraction * 100)}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.segment,
  },
  segmentOn: {
    backgroundColor: colors.primary,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.segment,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
});