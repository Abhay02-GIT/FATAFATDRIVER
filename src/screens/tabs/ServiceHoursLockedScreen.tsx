import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import TitleBar from '@/components/home/TitleBar';
import {colors} from '@/constants/colors';
import {MDI_HOME} from '@/constants/iconPathsHome';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {SERVICE_WINDOWS} from '@/utils/serviceHours';

// Shown by the Home tab when the current time is outside the service hours.
export default function ServiceHoursLockedScreen() {
  const strings = useStrings();
  const onViewSchedule = () => {
    // TODO: open the full schedule screen
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TitleBar
        right={
          <View style={styles.pill}>
            <Text style={styles.pillText}>{strings.serviceHours.locked}</Text>
          </View>
        }
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <MdiIcon path={MDI_HOME.lockOutline} size={38} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>{strings.serviceHours.title}</Text>
        <Text style={styles.subtitle}>{strings.serviceHours.subtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.serviceHours.schedule}</Text>
          <View style={styles.tiles}>
            {SERVICE_WINDOWS.map(w => (
              <View key={w.id} style={styles.tile}>
                <Text style={styles.tileLabel}>{strings.dayParts[w.id]}</Text>
                <Text style={styles.tileValue}>{w.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <ActionButton
          title={strings.serviceHours.viewSchedule}
          onPress={onViewSchedule}
          style={styles.button}
        />
      </ScrollView>
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
  pill: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  pillText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
  },
  outer: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  inner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    marginTop: 26,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  card: {
    marginTop: 26,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.8,
    color: colors.placeholder,
  },
  tiles: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  tile: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  tileLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  tileValue: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textDark,
  },
  button: {
    marginTop: 24,
  },
});