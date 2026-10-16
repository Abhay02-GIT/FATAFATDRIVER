import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VerificationRejected'>;

export default function VerificationRejectedScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const strings = useStrings();

  // TODO: load the rejected documents and reasons from your API
  const rejected = [
    {
      name: strings.common.driversLicense,
      reason: strings.common.blurryReason,
      tip: strings.common.blurryTip,
    },
    {
      name: strings.documents.insurance.title,
      reason: strings.verificationRejected.expiredReason,
      tip: strings.verificationRejected.expiredTip,
    },
  ];

  const onSupport = () => {
    // TODO: open support (Linking.openURL('tel:...') or a help screen)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          style={styles.back}>
          <MdiIcon path={MDI_DOCS.chevronLeft} size={24} color={colors.textDark} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MdiIcon
            path={MDI_DOCS.alertCircleOutline}
            size={34}
            color={colors.primary}
          />
        </View>

        <Text style={styles.title}>{strings.common.rejectedTitle}</Text>
        <Text style={styles.subtitle}>{strings.common.rejectedSubtitle}</Text>

        {rejected.map(item => (
          <View key={item.name} style={styles.card}>
            <View style={styles.cardHead}>
              <View style={styles.iconCircle}>
                <MdiIcon
                  path={MDI_DOCS.alertCircleOutline}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <View style={styles.headText}>
                <Text style={styles.docName}>{item.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{strings.common.rejected}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.reason}>{item.reason}</Text>

            <View style={styles.tip}>
              <MdiIcon
                path={MDI_DOCS.alertCircleOutline}
                size={16}
                color={colors.primary}
              />
              <Text style={styles.tipText}>{item.tip}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomBar>
        <ActionButton
          title={strings.verificationRejected.resubmit}
          onPress={() => navigation.navigate('DocumentChecklist')}
        />
        <ActionButton
          title={strings.common.contactSupport}
          variant="outline"
          onPress={onSupport}
          textColor={colors.primary}
          style={styles.supportBtn}
        />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  hero: {
    alignSelf: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FDE8EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FBD3DD',
    backgroundColor: colors.background,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDE8EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    marginLeft: 14,
    alignItems: 'flex-start',
  },
  docName: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textDark,
  },
  badge: {
    marginTop: 3,
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 11,
    backgroundColor: '#FDE8EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.primary,
  },
  reason: {
    marginTop: 14,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  tip: {
    marginTop: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  supportBtn: {
    marginTop: 12,
    borderColor: colors.primary,
  },
});