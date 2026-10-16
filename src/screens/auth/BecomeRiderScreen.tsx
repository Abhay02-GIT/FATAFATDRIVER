import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ArrowRightIcon,
  ClockIcon,
  DollarIcon,
  ShieldIcon,
} from '@/components/common/Icons';
import PrimaryButton from '@/components/common/PrimaryButton';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BecomeRider'>;

const HERO_HEIGHT = 216;

type FeatureProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  badge?: string;
};

function FeatureCard({icon, iconBg, title, description, badge}: FeatureProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardIcon, {backgroundColor: iconBg}]}>{icon}</View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      {badge ? (
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

type StatProps = {value: string; label: string; color: string; bg: string};

function StatTile({value, label, color, bg}: StatProps) {
  return (
    <View style={[styles.stat, {backgroundColor: bg}]}>
      <Text style={[styles.statValue, {color}]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function BecomeRiderScreen({navigation}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, {height: HERO_HEIGHT + insets.top}]}>
          <Image
            source={{uri: 'rider_hero'}}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={styles.heroShade} />
          <View style={styles.heroShadeBottom} />
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{strings.becomeRider.badge}</Text>
            </View>
            <Text style={styles.heroTitle}>{strings.becomeRider.title}</Text>
            <Text style={styles.heroSub}>{strings.becomeRider.subtitle}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>{strings.becomeRider.whyRide}</Text>

        <View style={styles.cards}>
          <FeatureCard
            icon={<DollarIcon size={20} color={colors.green} />}
            iconBg={colors.greenLight}
            title={strings.becomeRider.earningsTitle}
            description={strings.becomeRider.earningsText}
            badge={strings.becomeRider.earningsBadge}
          />
          <FeatureCard
            icon={<ClockIcon size={20} color={colors.amber} />}
            iconBg={colors.amberLight}
            title={strings.becomeRider.hoursTitle}
            description={strings.becomeRider.hoursText}
          />
          <FeatureCard
            icon={<ShieldIcon size={20} color={colors.blue} />}
            iconBg={colors.blueLight}
            title={strings.becomeRider.safetyTitle}
            description={strings.becomeRider.safetyText}
          />
        </View>

        <View style={styles.stats}>
          <StatTile
            value="50K+"
            label={strings.becomeRider.activeRiders}
            color={colors.primary}
            bg={colors.primaryLight}
          />
          <StatTile
            value="4.8★"
            label={strings.becomeRider.avgRating}
            color={colors.green}
            bg={colors.greenLight}
          />
          <StatTile
            value="₹200"
            label={strings.becomeRider.signupBonus}
            color={colors.amber}
            bg={colors.amberLight}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {paddingBottom: Math.max(insets.bottom, 12) + 4},
        ]}>
        <PrimaryButton
          title={strings.common.startRegistration}
          // TODO: go to the registration flow
          onPress={() => navigation.navigate('PersonalDetails')}
          icon={<ArrowRightIcon size={18} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    backgroundColor: '#0B1020',
    justifyContent: 'flex-end',
  },
  heroShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroShadeBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230,0,76,0.6)',
    backgroundColor: 'rgba(230,0,76,0.18)',
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 1,
    color: '#FF4D7E',
  },
  heroTitle: {
    marginTop: 8,
    fontFamily: fonts.bold,
    fontSize: 30,
    color: '#FFFFFF',
  },
  heroSub: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 24,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.textMuted,
  },
  cards: {
    paddingHorizontal: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEF2',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  cardDesc: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
  },
  cardBadge: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.greenLight,
  },
  cardBadgeText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.green,
  },
  stats: {
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    height: 75,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  statLabel: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    backgroundColor: colors.background,
  },
}); 