import React from 'react';
import {StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle} from 'react-native';

type Props = {
  value: string;
  onChange: (value: string) => void;
  length: number;
  placeholder?: string; // shown in empty boxes
  style?: StyleProp<ViewStyle>;
  boxStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
};

// Visible boxes over one hidden input, same as the OTP screen.
export default function CodeBoxes({
  value,
  onChange,
  length,
  placeholder,
  style,
  boxStyle,
  textStyle,
  placeholderStyle,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({length}).map((_, i) => {
        const digit = value[i];
        return (
          <View key={i} style={boxStyle}>
            <Text style={[textStyle, !digit && placeholderStyle]}>{digit ?? placeholder}</Text>
          </View>
        );
      })}
      <TextInput
        style={styles.hiddenInput}
        value={value}
        onChangeText={text => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        caretHidden
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});
