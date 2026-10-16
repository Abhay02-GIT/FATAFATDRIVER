import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

export default function SectionHeading({title}: {title: string}) {
  return (
    <View style={styles.row}>
      <View style={styles.bar} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  text: {
    marginLeft: 8,
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textSecondary,
  },
});