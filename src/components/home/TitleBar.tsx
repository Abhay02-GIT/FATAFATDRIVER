import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {title?: string; right?: React.ReactNode};

// "Fatafat" title on the left, anything (pill / link) on the right
export default function TitleBar({title = 'Fatafat', right}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, {paddingTop: insets.top + 14}]}>
      <Text style={styles.title}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.track,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },
});