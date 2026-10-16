import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';

type Props = {
  title: string;
  onBack: () => void;
  variant?: 'circle' | 'plain';
};

export default function DriverHeader({title, onBack, variant = 'circle'}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, {paddingTop: insets.top}]}>
      <View style={styles.inner}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={variant === 'circle' ? styles.circle : styles.plain}>
          {variant === 'circle' ? (
            <ArrowLeftIcon size={20} color={colors.textDark} />
          ) : (
            <MdiIcon path={MDI_DOCS.chevronLeft} size={28} color={colors.placeholder} />
          )}
        </Pressable>

        <View pointerEvents="none" style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.background,
  },
  inner: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plain: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: colors.textDark,
  },
});