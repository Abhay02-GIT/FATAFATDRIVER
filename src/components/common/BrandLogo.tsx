import React from 'react';
import {Image} from 'react-native';

const LOGO_RATIO = 1525 / 1031;

type Props = {width?: number};

export default function BrandLogo({width = 100}: Props) {
  return (
    <Image
      source={{uri: 'logo'}}
      style={{width, height: width / LOGO_RATIO}}
      resizeMode="contain"
    />
  );
}