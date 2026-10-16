import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

// Stand-in for the live map so the layout is complete.
// TODO: replace the body of this component with a real map, for example
// <MapView style={StyleSheet.absoluteFill} .../> from react-native-maps
// (needs a Google Maps API key on Android).
export default function MapPlaceholder() {
  return (
    <View style={styles.fill}>
      <Svg width="100%" height="100%" viewBox="0 0 390 420" preserveAspectRatio="xMidYMid slice">
        <Rect width="390" height="420" fill="#EEF0F2" />
        <Path d="M120 0 C150 120 90 220 150 420" stroke="#BDEBF7" strokeWidth="26" fill="none" />
        <Path d="M0 120 L390 150" stroke="#FFFFFF" strokeWidth="9" />
        <Path d="M0 260 L390 230" stroke="#FFFFFF" strokeWidth="9" />
        <Path d="M230 0 L270 420" stroke="#FFFFFF" strokeWidth="9" />
        <Path d="M330 0 L300 420" stroke="#FFFFFF" strokeWidth="6" />
        <Path d="M0 330 L390 340" stroke="#FFFFFF" strokeWidth="6" />
        <Path d="M190 60 L190 400" stroke="#FFFFFF" strokeWidth="4" />
        <Rect x="170" y="190" width="34" height="48" rx="4" fill="#CDEBD2" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});