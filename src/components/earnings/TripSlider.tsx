import React, {useRef, useState} from 'react';
import {PanResponder, StyleSheet, View} from 'react-native';
import {colors} from '@/constants/colors';

type Props = {value: number; min: number; max: number; onChange: (value: number) => void};

const THUMB = 24;

export default function TripSlider({value, min, max, onChange}: Props) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const startX = useRef(0);
  const range = useRef({min, max});
  const changeRef = useRef(onChange);
  range.current = {min, max};
  changeRef.current = onChange;

  const update = (x: number) => {
    const usable = widthRef.current - THUMB;
    if (usable <= 0) {
      return;
    }
    const clamped = Math.min(Math.max(x - THUMB / 2, 0), usable);
    const {min: lo, max: hi} = range.current;
    changeRef.current(Math.round(lo + (clamped / usable) * (hi - lo)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: e => {
        startX.current = e.nativeEvent.locationX;
        update(startX.current);
      },
      onPanResponderMove: (_, g) => update(startX.current + g.dx),
    }),
  ).current;

  const fraction = max > min ? (value - min) / (max - min) : 0;
  const left = fraction * Math.max(width - THUMB, 0);

  return (
    <View
      style={styles.area}
      onLayout={e => {
        widthRef.current = e.nativeEvent.layout.width;
        setWidth(e.nativeEvent.layout.width);
      }}
      {...pan.panHandlers}>
      <View style={styles.track} pointerEvents="none" />
      <View style={[styles.thumb, {left}]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  area: {height: 32, justifyContent: 'center'},
  track: {height: 8, borderRadius: 4, backgroundColor: colors.borderDark},
  thumb: {
    position: 'absolute',
    top: (32 - THUMB) / 2,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: colors.amber,
    borderWidth: 3,
    borderColor: colors.background,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});