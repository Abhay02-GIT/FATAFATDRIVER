import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  textColor?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ActionButton({
  title,
  onPress,
  disabled,
  variant = 'solid',
  icon,
  iconPosition = 'right',
  textColor,
  style,
}: Props) {
  const solid = variant === 'solid';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        solid ? styles.solid : styles.outline,
        solid && disabled && styles.disabled,
        style,
      ]}>
      {icon && iconPosition === 'left' ? <View style={styles.left}>{icon}</View> : null}
      <Text
        style={[
          styles.text,
          {color: textColor ?? (solid ? '#FFFFFF' : colors.textDark)},
        ]}>
        {title}
      </Text>
      {icon && iconPosition === 'right' ? <View style={styles.right}>{icon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.textDark,
    backgroundColor: colors.background,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  left: {
    marginRight: 8,
  },
  right: {
    marginLeft: 8,
  },
});