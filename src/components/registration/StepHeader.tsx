import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from '@/components/common/Icons';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {
  title: string;
  onBack: () => void;
  rightText?: string;
  boxedBack?: boolean;
  bordered?: boolean;
};

export default function StepHeader({
  title,
  onBack,
  rightText,
  boxedBack = true,
  bordered = true,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {paddingTop: insets.top},
        bordered && styles.bordered,
      ]}>
      <View style={[styles.inner, {height: bordered ? 75 : 70}]}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={[styles.back, boxedBack && styles.backBoxed]}>
          <ArrowLeftIcon size={22} color={colors.textDark} />
        </Pressable>

        <View pointerEvents="none" style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {rightText ? <Text style={styles.right}>{rightText}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.background,
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBoxed: {
    backgroundColor: colors.surfaceAlt,
  },
  titleWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textDark,
  },
  right: {
    marginRight: 20,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
});