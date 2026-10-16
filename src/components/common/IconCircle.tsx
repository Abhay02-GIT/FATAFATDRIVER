import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  backgroundColor: string;
  children: React.ReactNode;
};

export default function IconCircle({backgroundColor, children}: Props) {
  return <View style={[styles.circle, {backgroundColor}]}>{children}</View>;
}

const styles = StyleSheet.create({
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});