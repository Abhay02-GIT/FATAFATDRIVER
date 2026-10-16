import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';

type Props = {
  iconPath: string;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  badge?: string; // small amber "ACTIVE" tag (top right)
  highlighted?: boolean; // amber border (Incentives)
  onPress?: () => void;
};

// Small square card used for "Incentives" and "Subscription".
export default function InfoCard({
  iconPath,
  iconColor,
  iconBg,
  title,
  subtitle,
  badge,
  highlighted,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.card, highlighted && styles.cardHighlighted]}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.top}>
        <View style={[styles.icon, {backgroundColor: iconBg}]}>
          <MdiIcon path={iconPath} size={22} color={iconColor} />
        </View>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHighlighted: {
    borderColor: colors.amberBorder,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.amberPill,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.amberText,
  },
  title: {
    marginTop: 14,
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
  },
});