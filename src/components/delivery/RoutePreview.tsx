import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {MapIcon, PinIcon, RouteIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

type Props = {distanceKm: number; durationMin: number};

// Static route preview from the design.
// TODO: replace with a live map (route, driver position, real markers).
export default function RoutePreview({distanceKm, durationMin}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.map}>
      <Image source={{uri: 'delivery_map'}} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="mapFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0} />
            <Stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0.9} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#mapFade)" />
      </Svg>

      <View style={[styles.status, {top: insets.top + 20}]}>
        <View style={styles.statusIcon}>
          <MapIcon size={14} color={colors.crimson} />
        </View>
        <Text style={styles.text}>{strings.delivery.livePreview}</Text>
      </View>

      <View style={styles.pickupMarker}>
        <View style={[styles.marker, {backgroundColor: colors.crimson}]}>
          <PinIcon size={10} color="#FFFFFF" />
        </View>
        <View style={styles.markerStem} />
      </View>
      <View style={[styles.marker, styles.dropoffMarker]}>
        <PinIcon size={10} color="#FFFFFF" />
      </View>

      <View style={styles.badgeWrap} pointerEvents="none">
        <View style={styles.badge}>
          <RouteIcon size={14} color={colors.crimson} />
          <Text style={styles.text}>
            {strings.formatString(
              strings.delivery.routeSummary,
              String(distanceKm),
              String(durationMin),
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 420 in the design; gives way to the card on short screens.
  map: {
    height: 420,
    flexShrink: 1,
    overflow: 'hidden',
  },
  status: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.ink,
  },
  pickupMarker: {
    position: 'absolute',
    left: 88,
    top: 132,
    alignItems: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerStem: {
    width: 2,
    height: 18,
    borderRadius: 1,
    backgroundColor: colors.crimson,
  },
  dropoffMarker: {
    position: 'absolute',
    left: 248,
    top: 248,
    backgroundColor: colors.dropGreen,
  },
  // Centred, 12px above the middle of the map.
  badgeWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});
