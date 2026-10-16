import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import BrandLogo from '@/components/common/BrandLogo';
import {MapPinIcon} from '@/components/common/Icons';
import {Description, Title} from '@/components/common/StatusText';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

// TODO: drive this from the real reconnect progress (0 to 1)
const PROGRESS = 0.65;

export default function ResumeTripScreen() {
  const strings = useStrings();
  const percent = Math.round(PROGRESS * 100);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <BrandLogo width={130} />

      <View style={styles.titleWrap}>
        <Title>{strings.resumeTrip.title}</Title>
      </View>
      <Description>{strings.resumeTrip.description}</Description>

      <View style={styles.track}>
        <View style={[styles.fill, {width: `${percent}%`}]} />
      </View>
      <Text style={styles.percent}>
        {strings.formatString(strings.resumeTrip.progress, percent)}
      </Text>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.cardTitle}>{strings.resumeTrip.activeBooking}</Text>
          <View style={styles.livePill}>
            <Text style={styles.liveText}>{strings.resumeTrip.live}</Text>
          </View>
        </View>
        <View style={[styles.cardRow, styles.cardRowSecond]}>
          <MapPinIcon size={14} color={colors.primary} />
          <Text style={styles.cardSub}>{strings.resumeTrip.connecting}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    paddingBottom: 44,
  },
  titleWrap: {
    marginTop: -12,
  },
  track: {
    marginTop: 20,
    width: 256,
    maxWidth: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  percent: {
    marginTop: 8,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
  },
  card: {
    marginTop: 32,
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRowSecond: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textDark,
  },
  livePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
  },
  liveText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.primary,
  },
  cardSub: {
    marginLeft: 8,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textBody,
  },
});