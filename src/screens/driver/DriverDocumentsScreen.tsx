import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import DriverHeader from '@/components/driver/DriverHeader';
import DriverStepTitle from '@/components/driver/DriverStepTitle';
import {colors} from '@/constants/colors';
import {DRIVER_DOCS, DriverDocId} from '@/constants/driverDocuments';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {useDriverDocuments} from '@/state/driverDocumentStore';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverDocuments'>;

const DOCS = DRIVER_DOCS;

export default function DriverDocumentsScreen({navigation}: Props) {
  const strings = useStrings();
  const uploaded = useDriverDocuments();
  const requiredDone = DOCS.filter(d => !d.optional).every(d => uploaded[d.id]);

  const onOpenDoc = (id: DriverDocId) =>
    navigation.navigate('DriverUploadDocument', {docId: id});

  const onSubmit = () => navigation.navigate('DriverPayout');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DriverHeader
        title={strings.common.registration}
        variant="plain"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <DriverStepTitle title={strings.driverChecklist.title} step={4} />

        <Text style={styles.heading}>{strings.driverChecklist.heading}</Text>
        <Text style={styles.subtitle}>{strings.common.documentsIntro}</Text>

        <View style={styles.list}>
          {DOCS.map(doc => {
            const done = !!uploaded[doc.id];
            return (
              <Pressable
                key={doc.id}
                onPress={() => onOpenDoc(doc.id)}
                style={styles.card}>
                <View style={styles.top}>
                  <View style={styles.iconCircle}>
                    <MdiIcon
                      path={MDI_DOCS.fileDocument}
                      size={20}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.docName}>
                    {strings.driverDocuments[doc.id].title}
                  </Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {doc.optional ? strings.common.optional : strings.common.required}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusRow}>
                  <MdiIcon
                    path={
                      done ? MDI_DOCS.checkCircleOutline : MDI_DOCS.alertCircleOutline
                    }
                    size={16}
                    color={done ? colors.primary : colors.amber}
                  />
                  <Text style={[styles.status, done && styles.statusDone]}>
                    {done ? strings.common.uploaded : strings.common.notUploaded}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <BottomBar>
        <ActionButton
          title={strings.common.submitDocuments}
          disabled={!requiredDone}
          onPress={onSubmit}
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  heading: {
    marginTop: 22,
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.placeholder,
  },
  list: {
    marginTop: 18,
    gap: 12,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.textDark,
    backgroundColor: colors.background,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  badge: {
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  statusRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    marginLeft: 6,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.amber,
  },
  statusDone: {
    color: colors.textMuted,
  },
});