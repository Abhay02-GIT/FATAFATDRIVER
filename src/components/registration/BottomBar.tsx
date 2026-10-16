import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';

type Props = {children: React.ReactNode; shadow?: boolean};

export default function BottomBar({children, shadow}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {paddingBottom: Math.max(insets.bottom, 18)},
        shadow ? styles.shadow : styles.border,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  shadow: {
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
});