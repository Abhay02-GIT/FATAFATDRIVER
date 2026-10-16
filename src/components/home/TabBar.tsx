import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {isWithinServiceHours} from '@/utils/serviceHours';
import {
  BellIcon,
  CarIcon,
  CashIcon,
  HomeIcon,
  MapPinIcon,
  NavigationIcon,
  TabIconProps,
  TrendingUpIcon,
  UserIcon,
  WalletIcon,
} from './TabIcons';

export type TabKey = 'HomeTab' | 'Trips' | 'Earnings' | 'Profile' | 'Alerts';

// Labels are in strings.tabs
export type TabItem = {
  key: TabKey;
  // use another label from strings.tabs (e.g. 'Account' for the Profile slot)
  labelKey?: 'Account';
  Icon: React.ComponentType<TabIconProps>;
};

// Icons used under the Home screen (online / offline)
export const HOME_TAB_ITEMS: TabItem[] = [
  {key: 'HomeTab', Icon: HomeIcon},
  {key: 'Trips', Icon: NavigationIcon},
  {key: 'Earnings', Icon: TrendingUpIcon},
  {key: 'Profile', Icon: UserIcon},
];

// Icons used under the Service Hours Locked screen (as in the design)
export const LOCKED_TAB_ITEMS: TabItem[] = [
  {key: 'HomeTab', Icon: HomeIcon},
  {key: 'Trips', Icon: MapPinIcon},
  {key: 'Earnings', Icon: WalletIcon},
  {key: 'Profile', Icon: UserIcon},
];

// Icons used under the Earnings screen (as in the design: car, cash, "Account")
export const EARNINGS_TAB_ITEMS: TabItem[] = [
  {key: 'HomeTab', Icon: HomeIcon},
  {key: 'Trips', Icon: CarIcon},
  {key: 'Earnings', Icon: CashIcon},
  {key: 'Profile', Icon: UserIcon, labelKey: 'Account'},
];

// The Alerts screen shows "Alerts" in the last slot (as in the design)
export const ALERTS_TAB_ITEMS: TabItem[] = [
  {key: 'HomeTab', Icon: HomeIcon},
  {key: 'Trips', Icon: MapPinIcon},
  {key: 'Earnings', Icon: WalletIcon},
  {key: 'Alerts', Icon: BellIcon},
  // {key: 'Profile', Icon: UserIcon, labelKey: 'Account'},
];

type ViewProps = {
  items: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
};

// Plain tab bar (no navigator needed), used by Alerts
export function TabBarView({items, activeKey, onPress}: ViewProps) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  return (
    <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 10)}]}>
      {items.map(item => {
        const active = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            style={styles.slot}
            onPress={() => onPress(item.key)}>
            <View style={[styles.pill, active && styles.pillActive]}>
              <item.Icon
                size={22}
                color={active ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.label, active ? styles.labelActive : styles.labelIdle]}>
                {strings.tabs[item.labelKey ?? item.key]}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

// The tab bar of the main tab navigator
export default function MainTabBar({state, navigation}: BottomTabBarProps) {
  const activeKey = state.routes[state.index].name;

  const onPress = (key: string) => {
    const route = state.routes.find(r => r.name === key);
    if (!route) {
      return;
    }
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (activeKey !== key && !event.defaultPrevented) {
      navigation.navigate(key);
    }
  };

  // the Locked screen uses a different icon set in the design
  // (and the Earnings screen has its own icon set too)
  const items =
    activeKey === 'Earnings'
      ? EARNINGS_TAB_ITEMS
      : isWithinServiceHours()
      ? HOME_TAB_ITEMS
      : LOCKED_TAB_ITEMS;

  return <TabBarView items={items} activeKey={activeKey} onPress={onPress} />;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.track,
  },
  slot: {
    flex: 1,
    alignItems: 'center',
  },
  pill: {
    minWidth: 72,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: colors.primaryLight,
  },
  label: {
    marginTop: 3,
    fontSize: 11,
  },
  labelActive: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  labelIdle: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
});