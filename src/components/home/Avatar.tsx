import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_HOME} from '@/constants/iconPathsHome';

type Props = {
  uri?: string;
  size?: number;
  // false = circle (default), true = rounded square (used in the Online header)
  square?: boolean;
  // false = soft shadow + white ring (default), true = flat
  flat?: boolean;
};

// Profile picture. Shows the photo when there is one, and a person icon otherwise
// (also when the image fails to load).
export default function Avatar({uri, size = 44, square = false, flat = false}: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  const radius = square ? 12 : size / 2;
  const box = {width: size, height: size, borderRadius: radius};

  return (
    <View style={[styles.wrap, !flat && styles.raised, box]}>
      {uri && !failed ? (
        <Image source={{uri}} style={box} onError={() => setFailed(true)} />
      ) : (
        <MdiIcon
          path={MDI_HOME.accountOutline}
          size={size * 0.55}
          color={colors.primary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pinkSoft,
  },
  raised: {
    borderWidth: 2,
    borderColor: colors.background,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
});