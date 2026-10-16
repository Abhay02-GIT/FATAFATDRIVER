import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import TitleBar from '@/components/home/TitleBar';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

type Props = {name: 'Trips' | 'Earnings' | 'Profile'};

export default function PlaceholderTabScreen({name}: Props) {
  const strings = useStrings();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TitleBar />
      <View style={styles.body}>
        <Text style={styles.text}>
          {strings.formatString(strings.tabs.comingSoon, strings.tabs[name])}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  body: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontFamily: fonts.medium, fontSize: 15, color: colors.textSecondary},
});