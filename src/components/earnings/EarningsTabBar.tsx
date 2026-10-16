import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EARNINGS_TAB_ITEMS, TabBarView} from '@/components/home/TabBar';
import type {MainTabParamList, RootStackParamList} from '@/navigation/types';

// Bottom tab bar for the screens that sit on top of the Earnings tab
// (Payout History, Earnings Activity). Earnings stays highlighted.
export default function EarningsTabBar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = (key: string) => {
    navigation.navigate('Home', {screen: key as keyof MainTabParamList});
  };

  return <TabBarView items={EARNINGS_TAB_ITEMS} activeKey="Earnings" onPress={onPress} />;
}