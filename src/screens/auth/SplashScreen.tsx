import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import SplashContent from '@/components/splash/SplashContent';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SPLASH_DURATION_MS = 2000;

export default function SplashScreen({navigation}: Props) {
 useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('SessionCheck');
  }, SPLASH_DURATION_MS);
  return () => clearTimeout(timer);
}, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SplashContent />
    </>
  );
}