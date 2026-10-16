import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

export const FILTER_KEYS = ['all', 'trips', 'incentives', 'adjustments'] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];

type Props = {
  value: FilterKey;
  onChange: (key: FilterKey) => void;
};

// Row of pills: All Activity / Trips / Incentives / Adjustments (scrolls sideways).
export default function FilterChips({value, onChange}: Props) {
  const strings = useStrings();
  const labels: Record<FilterKey, string> = {
    all: strings.activity.allActivity,
    trips: strings.activity.trips,
    incentives: strings.activity.incentives,
    adjustments: strings.activity.adjustments,
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {FILTER_KEYS.map(key => {
        const active = key === value;
        return (
          <Pressable
            key={key}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange(key)}>
            {active ? <MdiIcon path={MDI.check} size={16} color="#FFFFFF" /> : null}
            <Text style={[styles.text, active ? styles.textActive : styles.textIdle]}>
              {labels[key]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
  },
  chip: {
    height: 32,
    marginRight: 9,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  chipActive: {
    backgroundColor: colors.textDark,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 13,
  },
  textActive: {
    marginLeft: 6,
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
  },
  textIdle: {
    fontFamily: fonts.medium,
    color: colors.textBody,
  },
});