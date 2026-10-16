import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {title: string; style?: StyleProp<TextStyle>};

export default function SectionLabel({title, style}: Props) {
  return <Text style={[styles.text, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.textSecondary,
  },
});