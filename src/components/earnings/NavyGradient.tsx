import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

// Figma gradient: #1A1A2E -> #16213E -> #0F3460 (left to right).
// Fills its parent completely.
export default function NavyGradient() {
  return (
    <View style={styles.fill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="navyGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#1A1A2E" />
            <Stop offset="0.5" stopColor="#16213E" />
            <Stop offset="1" stopColor="#0F3460" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100" height="100" fill="url(#navyGradient)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
});