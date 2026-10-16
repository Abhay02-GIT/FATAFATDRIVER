import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import {BarProgress} from '@/components/registration/Progress';
import StepHeader from '@/components/registration/StepHeader';
import {colors} from '@/constants/colors';
import {DocumentConfig, DOCUMENTS} from '@/constants/documents';
import {MDI} from '@/constants/iconPaths';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {useDocuments} from '@/state/documentStore';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DocumentChecklist'>;

type RowProps = {doc: DocumentConfig; done: boolean; onPress: () => void};

function DocumentRow({doc, done, onPress}: RowProps) {
  const strings = useStrings();
  const text = strings.documents[doc.id];

  return (
    <Pressable onPress={onPress} style={[styles.card, done && styles.cardDone]}>
      <View style={[styles.iconTile, done && styles.iconTileDone]}>
        <MdiIcon
          path={doc.iconPath}
          size={22}
          color={done ? colors.green : colors.primary}
        />
      </View>

      <View style={styles.cardText}>
        <Text style={styles.docName}>{text.title}</Text>
        {text.subtitle ? <Text style={styles.docHint}>{text.subtitle}</Text> : null}
        <View style={styles.statusRow}>
          <View style={[styles.dot, done && styles.dotDone]} />
          <Text style={[styles.status, done && styles.statusDone]}>
            {done ? strings.common.uploaded : strings.common.notUploaded}
          </Text>
        </View>
      </View>

      {done ? (
        <View style={[styles.pill, styles.pillDone]}>
          <Text style={[styles.pillText, styles.pillTextDone]}>
            {strings.common.done}
          </Text>
          <MdiIcon path={MDI.check} size={13} color={colors.green} />
        </View>
      ) : (
        <View style={styles.pill}>
          <Text style={styles.pillText}>{strings.common.required}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default function DocumentChecklistScreen({navigation}: Props) {
  const strings = useStrings();
  const uploaded = useDocuments();
  const total = DOCUMENTS.length;
  const doneCount = DOCUMENTS.filter(d => uploaded[d.id]).length;
  const allDone = doneCount === total;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StepHeader
        title=""
        onBack={() => navigation.goBack()}
        boxedBack={false}
        bordered={false}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.documentChecklist.title}</Text>
        <Text style={styles.subtitle}>{strings.common.documentsIntro}</Text>

        <View style={styles.countRow}>
          <Text style={styles.countLabel}>{strings.documentChecklist.uploadedCount}</Text>
          <Text style={styles.count}>
            {doneCount} / {total}
          </Text>
        </View>
        <BarProgress fraction={doneCount / total} />

        <View style={styles.list}>
          {DOCUMENTS.map(doc => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              done={uploaded[doc.id]}
              onPress={() => navigation.navigate('UploadDocument', {docId: doc.id})}
            />
          ))}
        </View>
      </ScrollView>

      <BottomBar>
        <ActionButton
          title={strings.common.submitDocuments}
          disabled={!allDone}
          onPress={() => navigation.navigate('PayoutIntro')}
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
    backgroundColor: colors.grayBg,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.placeholder,
  },
  countRow: {
    marginTop: 22,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  count: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
  },
  list: {
    marginTop: 22,
    gap: 12,
  },
  card: {
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardDone: {
    borderColor: colors.mintBorder,
    backgroundColor: colors.mintSoft,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileDone: {
    backgroundColor: colors.mint,
  },
  cardText: {
    flex: 1,
    marginLeft: 14,
  },
  docName: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textDark,
  },
  docHint: {
    marginTop: 1,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
  },
  statusRow: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  dotDone: {
    backgroundColor: colors.green,
  },
  status: {
    marginLeft: 6,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.amberText,
  },
  statusDone: {
    color: colors.green,
  },
  pill: {
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.amberPill,
  },
  pillDone: {
    backgroundColor: colors.mint,
  },
  pillText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.amberText,
  },
  pillTextDone: {
    marginRight: 4,
    color: colors.green,
  },
});