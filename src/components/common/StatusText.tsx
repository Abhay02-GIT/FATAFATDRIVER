import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {children: React.ReactNode};

export function Title({children}: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Description({children}: Props) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
  },
});