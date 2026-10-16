import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {loadLanguage} from '@/localization';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    loadLanguage().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
