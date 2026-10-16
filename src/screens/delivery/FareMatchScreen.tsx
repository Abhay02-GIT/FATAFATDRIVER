import React, {useState} from 'react';
import {Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CheckMediumIcon, CloseCircleIcon, UploadIcon} from '@/components/delivery/DeliveryIcons';
import {colors} from '@/constants/colors';
import {getFareMatch} from '@/constants/deliveries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'FareMatch'>;

// TODO: send the decision and the screenshot to your API.
async function acceptFareMatch(fareMatchId: string, screenshotUri: string) {
  return {fareMatchId, screenshotUri};
}

export default function FareMatchScreen({navigation, route}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const match = getFareMatch(route.params.fareMatchId);
  const [screenshotUri, setScreenshotUri] = useState<string>();
  const [accepting, setAccepting] = useState(false);

  const discount = match.originalFare - match.offer;

  const onUpload = async () => {
    const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 1, quality: 0.8});
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setScreenshotUri(uri);
    }
  };

  const onAccept = async () => {
    if (!screenshotUri || accepting) {
      return;
    }
    setAccepting(true);
    try {
      await acceptFareMatch(match.id, screenshotUri);
      navigation.goBack();
    } catch {
      Alert.alert(strings.fareMatch.acceptFailed);
    } finally {
      setAccepting(false);
    }
  };

  // TODO: tell your API the fare match was declined
  const onDecline = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{strings.fareMatch.header}</Text>
          <Pressable style={styles.close} onPress={onDecline} hitSlop={8}>
            <CloseCircleIcon color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.title}>{strings.fareMatch.title}</Text>
          <Text style={styles.subtitle}>{strings.fareMatch.subtitle}</Text>
        </View>

        <View style={styles.compare}>
          <View style={styles.original}>
            <Text style={styles.label}>{strings.fareMatch.original}</Text>
            <Text style={styles.amount}>{formatRupees(match.originalFare, 2)}</Text>
          </View>
          <View style={styles.offer}>
            <Text style={[styles.label, styles.offerLabel]}>{strings.fareMatch.offer}</Text>
            <Text style={styles.amount}>{formatRupees(match.offer, 2)}</Text>
          </View>
          <View style={styles.coverage}>
            <View style={styles.coverageIcon}>
              <CheckMediumIcon color={colors.dropGreen} />
            </View>
            <View style={styles.coverageText}>
              <Text style={styles.coverageTitle}>{strings.fareMatch.coverage}</Text>
              <Text style={styles.coverageBody}>
                {strings.formatString(
                  strings.fareMatch.coverageText,
                  formatRupees(match.originalFare, 2),
                  formatRupees(discount, 2),
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.evidence}>
          <Text style={styles.label}>{strings.fareMatch.evidence}</Text>
          <Pressable style={styles.upload} onPress={onUpload}>
            {screenshotUri ? (
              <Image source={{uri: screenshotUri}} style={styles.screenshot} resizeMode="contain" />
            ) : (
              <>
                <UploadIcon color={colors.placeholder} />
                <Text style={styles.uploadTitle}>{strings.fareMatch.upload}</Text>
                <Text style={styles.uploadHint}>{strings.fareMatch.uploadHint}</Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.bottom, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <Pressable style={styles.decline} onPress={onDecline} disabled={accepting}>
          <Text style={styles.declineText}>{strings.fareMatch.decline}</Text>
        </Pressable>
        <Pressable
          style={[styles.accept, (!screenshotUri || accepting) && styles.acceptDisabled]}
          onPress={onAccept}
          disabled={!screenshotUri || accepting}>
          <Text style={styles.acceptText}>{strings.fareMatch.accept}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 44,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  intro: {
    gap: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  compare: {
    gap: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  original: {
    gap: 6,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  offer: {
    gap: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    backgroundColor: colors.blush,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  offerLabel: {
    color: colors.crimson,
  },
  amount: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.ink,
  },
  coverage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.greenWash,
  },
  coverageIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenPill,
  },
  coverageText: {
    flex: 1,
    gap: 2,
  },
  coverageTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.dropGreen,
  },
  coverageBody: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  evidence: {
    gap: 12,
  },
  upload: {
    minHeight: 160,
    gap: 12,
    paddingVertical: 34,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.steel,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  uploadTitle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.ink,
  },
  uploadHint: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  screenshot: {
    width: '100%',
    height: 200,
  },
  bottom: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  decline: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  declineText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
  },
  accept: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.crimson,
  },
  acceptDisabled: {
    opacity: 0.5,
  },
  acceptText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
