import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import {BellIcon} from '@/components/home/TabIcons';
import {colors} from '@/constants/colors';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {fonts} from '@/constants/typography';

type Props = {
  title: string;
  // 'back'   = round back button (Payout History)
  // 'avatar' = grey person circle (Earnings Activity)
  left: 'back' | 'avatar';
  onBack?: () => void;
  onBellPress: () => void;
};

// White top bar with a grey round button on each side.
export default function EarningsTopBar({title, left, onBack, onBellPress}: Props) {
  const insets = useSafeAreaInsets();
  const size = left === 'avatar' ? 44 : 40;
  const circle = {width: size, height: size, borderRadius: size / 2};

  return (
    <View style={[styles.bar, {paddingTop: insets.top + 16}]}>
      {left === 'back' ? (
        <Pressable style={[styles.circle, circle]} onPress={onBack} hitSlop={8}>
          <ArrowLeftIcon size={20} color={colors.textDark} />
        </Pressable>
      ) : (
        <View style={[styles.circle, circle]}>
          <MdiIcon path={MDI_HOME.accountOutline} size={24} color={colors.placeholder} />
        </View>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable style={[styles.circle, circle]} onPress={onBellPress} hitSlop={8}>
        <BellIcon size={20} color={colors.textDark} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  title: {
    flex: 1,
    marginHorizontal: 12,
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },
});