import React from 'react';
import {Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DeliveryHeader from '@/components/delivery/DeliveryHeader';
import {ClockIcon, PackageIcon, PinIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {DropStop, getDropTrip} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {openNavigation} from '@/utils/linking';

type Props = NativeStackScreenProps<RootStackParamList, 'Dropoffs'>;

type Tone = 'current' | 'pending';

const TONES: Record<
  Tone,
  {card: string; border: string; badge: string; badgeText: string; icon: string}
> = {
  current: {
    card: colors.blush,
    border: colors.crimson,
    badge: colors.crimson,
    badgeText: '#FFFFFF',
    icon: colors.crimson,
  },
  pending: {
    card: colors.background,
    border: colors.border,
    badge: colors.ringFill,
    badgeText: colors.textLabel,
    icon: colors.textSecondary,
  },
};

type StopCardProps = {
  stop: DropStop;
  number: number;
  tone: Tone;
  onNavigate: () => void;
};

function StopCard({stop, number, tone, onNavigate}: StopCardProps) {
  const strings = useStrings();
  const palette = TONES[tone];
  const isCurrent = tone === 'current';

  return (
    <View style={[styles.stop, {backgroundColor: palette.card, borderColor: palette.border}]}>
      <View style={styles.stopHead}>
        <View style={styles.stopWho}>
          <View style={[styles.number, {backgroundColor: palette.badge}]}>
            <Text style={[styles.numberText, {color: palette.badgeText}]}>{number}</Text>
          </View>
          <View style={styles.stopName}>
            <Text style={styles.name}>{stop.name}</Text>
            <Text style={styles.place}>{stop.place}</Text>
          </View>
        </View>
        <View style={[styles.badge, {backgroundColor: palette.badge}]}>
          <Text style={[styles.badgeText, {color: palette.badgeText}]}>
            {strings.dropoffs[tone]}
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <PackageIcon size={14} color={palette.icon} />
        <Text style={styles.lineText}>
          {strings.formatString(
            strings.dropoffs.package,
            strings.packageSizes[stop.packageSize],
            String(stop.weightKg),
          )}
        </Text>
      </View>

      <View style={styles.line}>
        {isCurrent ? (
          <PinIcon size={14} color={colors.textSecondary} />
        ) : (
          <ClockIcon color={colors.textSecondary} />
        )}
        <Text style={styles.lineText}>
          {stop.extraMin != null && !isCurrent
            ? strings.formatString(strings.dropoffs.extraTime, String(stop.extraMin), stop.note)
            : stop.note}
        </Text>
      </View>

      {isCurrent ? (
        <Pressable style={styles.navigate} onPress={onNavigate}>
          <Text style={styles.navigateText}>{strings.dropoffs.navigate}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function DropoffsScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const trip = getDropTrip(route.params.tripId);
  const remaining = trip.stops.filter(s => s.status !== 'delivered');
  const doneCount = trip.stops.length - remaining.length;

  const onNavigate = async (stop: DropStop) => {
    try {
      await openNavigation(stop.latitude, stop.longitude);
    } catch {
      Alert.alert(strings.inTransit.mapsFailed);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DeliveryHeader
        title={strings.dropoffs.title}
        onBack={() => navigation.goBack()}
        // TODO: open delivery help
        onHelp={() => {}}
      />

      <ScrollView
        contentContainerStyle={[styles.content, {paddingBottom: Math.max(insets.bottom, 20)}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{strings.dropoffs.currentTrip}</Text>
            <Text style={styles.summaryValue}>
              {strings.formatString(strings.dropoffs.stopsRemaining, String(remaining.length))}
            </Text>
          </View>
          {remaining.length > 0 ? (
            <View style={[styles.summaryItem, styles.summaryItemEnd]}>
              <Text style={styles.summaryLabel}>{strings.dropoffs.nextStop}</Text>
              <Text style={styles.summaryValue}>
                {strings.formatString(
                  strings.dropoffs.stopOf,
                  String(doneCount + 1),
                  String(trip.stops.length),
                )}
              </Text>
            </View>
          ) : null}
        </View>

        {/* The first stop not delivered yet is the current one. */}
        {remaining.map((stop, i) => (
          <StopCard
            key={stop.id}
            stop={stop}
            number={doneCount + i + 1}
            tone={i === 0 ? 'current' : 'pending'}
            onNavigate={() => onNavigate(stop)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  summaryItem: {
    gap: 4,
  },
  summaryItemEnd: {
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.ink,
  },
  stop: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  stopHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stopWho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  number: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  stopName: {
    gap: 2,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.ink,
  },
  place: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lineText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  navigate: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  navigateText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
