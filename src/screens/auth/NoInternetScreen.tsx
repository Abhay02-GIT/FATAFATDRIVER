import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import WifiOffIcon from '@/components/common/WifiOffIcon';
import {colors} from '@/constants/colors';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NoInternet'>;

const LOGO_WIDTH = 88;
const LOGO_RATIO = 1525 / 1031;

export default function NoInternetScreen({navigation}: Props) {
  const strings = useStrings();
  const [checking, setChecking] = useState(false);

  const onRetry = async () => {
    if (checking) {
      return;
    }
    setChecking(true);
    try {
      const net = await NetInfo.fetch();
      if (net.isConnected && net.isInternetReachable !== false) {
        navigation.replace('SessionCheck');
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.iconCircle}>
        <WifiOffIcon size={28} color={colors.primary} />
      </View>

      <Text style={styles.title}>{strings.noInternet.title}</Text>
      <Text style={styles.description}>{strings.noInternet.description}</Text>

      <Pressable
        onPress={onRetry}
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
        {checking ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{strings.noInternet.retry}</Text>
        )}
      </Pressable>

      <Image
        source={{uri: 'logo'}}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    alignSelf: 'stretch',
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  logo: {
    marginTop: 28,
    width: LOGO_WIDTH,
    height: LOGO_WIDTH / LOGO_RATIO,
  },
});