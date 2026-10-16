import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import TitleBar from '@/components/home/TitleBar';
import {ALERTS_TAB_ITEMS, TabBarView} from '@/components/home/TabBar';
import {colors} from '@/constants/colors';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Alerts'>;

type AlertItem = {
  id: string;
  title: string;
  body: string;
  time: React.ReactNode;
  icon: string;
  iconColor: string;
  tint: string;
};

export default function AlertsScreen({navigation}: Props) {
  const strings = useStrings();

  // TODO: load the alerts from your API
  const alerts: AlertItem[] = [
    {
      id: '1',
      title: strings.alerts.bonusTitle,
      body: strings.alerts.bonusBody,
      time: strings.formatString(strings.alerts.hoursAgo, 2),
      icon: MDI_HOME.starOutline,
      iconColor: colors.primary,
      tint: colors.primaryLight,
    },
    {
      id: '2',
      title: strings.alerts.paymentTitle,
      body: strings.alerts.paymentBody,
      time: strings.formatString(strings.alerts.hoursAgo, 5),
      icon: MDI_HOME.walletOutline,
      iconColor: colors.green,
      tint: colors.greenLight,
    },
    {
      id: '3',
      title: strings.alerts.expiringTitle,
      body: strings.alerts.expiringBody,
      time: strings.formatString(strings.alerts.daysAgo, 1),
      icon: MDI_HOME.alertOutline,
      iconColor: colors.primary,
      tint: colors.primaryLight,
    },
    {
      id: '4',
      title: strings.alerts.cancelledTitle,
      body: strings.alerts.cancelledBody,
      time: strings.formatString(strings.alerts.daysAgo, 2),
      icon: MDI_HOME.close,
      iconColor: colors.textSecondary,
      tint: colors.surfaceAlt,
    },
  ];
  const [allRead, setAllRead] = useState(false);

  const onMarkAll = () => {
    // TODO: tell your API that all alerts are read
    setAllRead(true);
  };

  const onTab = (key: string) => {
    if (key === 'Alerts') {
      return;
    }
    if (key === 'HomeTab') {
      navigation.navigate('Home', {screen: 'HomeTab'});
    } else {
      navigation.navigate('Home', {screen: key as 'Trips' | 'Earnings' | 'Profile'});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TitleBar
        right={
          allRead ? null : (
            <Pressable onPress={onMarkAll} hitSlop={8}>
              <Text style={styles.markAll}>{strings.alerts.markAllRead}</Text>
            </Pressable>
          )
        }
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>{strings.alerts.today}</Text>

        {alerts.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={[styles.iconWrap, {backgroundColor: item.tint}]}>
              <MdiIcon path={item.icon} size={22} color={item.iconColor} />
            </View>
            <View style={styles.text}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>

      <TabBarView items={ALERTS_TAB_ITEMS} activeKey="Alerts" onPress={onTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  markAll: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 14,
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.8,
    color: colors.placeholder,
  },
  card: {
    marginBottom: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textDark,
  },
  body: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  time: {
    alignSelf: 'flex-start',
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.placeholder,
  },
});