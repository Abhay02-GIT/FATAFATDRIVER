import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Avatar from '@/components/home/Avatar';
import {BellIcon} from '@/components/home/TabIcons';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {useDisplayProfile} from '@/state/displayProfile';

type Props = {
  photoUri?: string;
  onBellPress: () => void;
};

function greetingKey(hour: number): 'morning' | 'afternoon' | 'evening' {
  if (hour < 12) {
    return 'morning';
  }
  return hour < 17 ? 'afternoon' : 'evening';
}

// White top bar: avatar, greeting + "Fatafat Driver", bell with a soft pink glow.
export default function EarningsHeader({photoUri, onBellPress}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();
  const {role} = useDisplayProfile();

  return (
    <View style={[styles.bar, {paddingTop: insets.top + 12}]}>
      <Avatar uri={photoUri} size={44} />
      <View style={styles.who}>
        <Text style={styles.greeting}>
          {strings.earnings.greeting[greetingKey(new Date().getHours())]}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {strings.formatString(strings.earnings.appTitle, strings.onlineHome[role])}
        </Text>
      </View>
      <Pressable style={styles.bell} onPress={onBellPress} hitSlop={8}>
        <BellIcon size={22} color={colors.textDark} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  who: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  title: {
    marginTop: 1,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    // pink glow around the bell
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
});