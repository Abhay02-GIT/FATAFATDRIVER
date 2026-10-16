import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeftIcon, HelpCircleIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {
  title: string;
  onBack: () => void;
  onHelp: () => void;
};

// Back button, centred title and help button, with a bottom border.
export default function DeliveryHeader({title, onBack, onHelp}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, {paddingTop: insets.top + 20}]}>
      <Pressable style={styles.button} onPress={onBack} hitSlop={8}>
        <ArrowLeftIcon color={colors.ink} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.button} onPress={onHelp} hitSlop={8}>
        <HelpCircleIcon color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.ink,
  },
});
