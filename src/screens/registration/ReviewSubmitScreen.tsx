import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowRightIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import {SegmentedProgress} from '@/components/registration/Progress';
import StepHeader from '@/components/registration/StepHeader';
import {colors} from '@/constants/colors';
import {DOCUMENTS} from '@/constants/documents';
import {MDI} from '@/constants/iconPaths';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {useDocuments} from '@/state/documentStore';
import {useRiderProfile} from '@/state/riderProfileStore';
import {formatDate} from '@/utils/formatDate';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ReviewSubmit'>;

function Field({label, value}: {label: string; value?: string}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value ? value : '-'}</Text>
    </View>
  );
}

type SectionProps = {
  icon: string;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
};

function Section({icon, title, onEdit, children}: SectionProps) {
  const strings = useStrings();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <MdiIcon path={icon} size={22} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable onPress={onEdit} hitSlop={8} style={styles.edit}>
          <MdiIcon path={MDI_DOCS.pencil} size={14} color={colors.primary} />
          <Text style={styles.editText}>{strings.common.edit}</Text>
        </Pressable>
      </View>
      <View style={styles.rule} />
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Check({checked, onToggle, children}: {checked: boolean; onToggle: () => void; children: React.ReactNode}) {
  return (
    <Pressable onPress={onToggle} style={styles.checkRow}>
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked ? <MdiIcon path={MDI.check} size={16} color="#FFFFFF" /> : null}
      </View>
      <Text style={styles.checkText}>{children}</Text>
    </Pressable>
  );
}

export default function ReviewSubmitScreen({navigation}: Props) {
  const strings = useStrings();
  const p = useRiderProfile();
  const uploaded = useDocuments();
  const uploadedDocs = DOCUMENTS.filter(d => uploaded[d.id]);

  const [accurate, setAccurate] = useState(false);
  const [terms, setTerms] = useState(false);

  const onSubmit = () => {
    // TODO: send the application to your API
    navigation.navigate('VerificationPending');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StepHeader
        title="Fatafat"
        onBack={() => navigation.goBack()}
        boxedBack={false}
        bordered={false}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>
          {strings.formatString(strings.reviewSubmit.stepOf, 4, 4)}
        </Text>
        <View style={styles.progress}>
          <SegmentedProgress step={4} />
        </View>

        <Text style={styles.title}>{strings.common.reviewSubmit}</Text>
        <Text style={styles.subtitle}>{strings.reviewSubmit.subtitle}</Text>

        <Section
          icon={MDI_DOCS.account}
          title={strings.reviewSubmit.personalInfo}
          onEdit={() => navigation.navigate('PersonalDetails', {fromReview: true})}>
          <View style={styles.row}>
            <Field label={strings.common.fullName} value={p.name} />
            <Field label={strings.common.phone} value={p.phone ? `+91 ${p.phone}` : ''} />
          </View>
          <View style={styles.row}>
            <Field label={strings.common.email} value={p.email} />
            <Field
              label={strings.personalDetails.dateOfBirth}
              value={formatDate(p.dobDigits)}
            />
          </View>
          <View style={styles.row}>
            <Field
              label={strings.personalDetails.gender}
              value={p.gender && strings.genders[p.gender]}
            />
          </View>
        </Section>

        <Section
          icon={MDI.car}
          title={strings.reviewSubmit.vehicleDetails}
          onEdit={() =>
            navigation.navigate('VehicleDetails', {
              vehicle: p.vehicle,
              fromReview: true,
            })
          }>
          <View style={styles.row}>
            <Field label={strings.reviewSubmit.makeModel} value={p.model} />
            <Field label={strings.reviewSubmit.year} value={p.year} />
          </View>
          <View style={styles.row}>
            <Field label={strings.reviewSubmit.licensePlate} value={p.vehicleNumber} />
            <Field
              label={strings.reviewSubmit.colour}
              value={p.colour && strings.colours[p.colour]}
            />
          </View>
          <View style={styles.row}>
            <Field
              label={strings.vehicleDetails.vehicleType}
              value={p.vehicleType && strings.carTypes[p.vehicleType]}
            />
          </View>
        </Section>

        <Section
          icon={MDI_DOCS.fileDocument}
          title={strings.reviewSubmit.documents}
          onEdit={() => navigation.navigate('DocumentChecklist')}>
          {uploadedDocs.length === 0 ? (
            <Field label={strings.common.uploaded} value={strings.common.noneUploaded} />
          ) : (
            <View style={styles.docList}>
              {uploadedDocs.map(d => (
                <View key={d.id} style={styles.docRow}>
                  <MdiIcon path={d.iconPath} size={18} color={colors.textSecondary} />
                  <Text style={styles.docName}>{strings.documents[d.id].title}</Text>
                  <MdiIcon
                    path={MDI_DOCS.checkCircleOutline}
                    size={20}
                    color={colors.primary}
                  />
                </View>
              ))}
            </View>
          )}
        </Section>

        <Section
          icon={MDI_DOCS.bank}
          title={strings.reviewSubmit.bankDetails}
          onEdit={() => navigation.navigate('PayoutIntro')}>
          <View style={styles.row}>
            <Field label={strings.common.bankName} value={p.bank ?? strings.common.notAddedYet} />
            <Field label={strings.reviewSubmit.accountEnding} value={p.account} />
          </View>
        </Section>

        <Text style={styles.declTitle}>{strings.reviewSubmit.declarations}</Text>
        <Check checked={accurate} onToggle={() => setAccurate(v => !v)}>
          {strings.reviewSubmit.declareAccurate}
        </Check>
        <Check checked={terms} onToggle={() => setTerms(v => !v)}>
          {strings.formatString(
            strings.reviewSubmit.agreeTerms,
            <Text style={styles.link}>{strings.reviewSubmit.termsOfService}</Text>,
            <Text style={styles.link}>{strings.reviewSubmit.privacyPolicy}</Text>,
          )}
        </Check>
      </ScrollView>

      <BottomBar shadow>
        <ActionButton
          title={strings.reviewSubmit.submit}
          disabled={!(accurate && terms)}
          onPress={onSubmit}
          icon={<ArrowRightIcon size={18} color="#FFFFFF" />}
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
    paddingTop: 8,
    paddingBottom: 28,
  },
  step: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.8,
    color: colors.primary,
  },
  progress: {
    marginTop: 8,
  },
  title: {
    marginTop: 14,
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.placeholder,
  },
  section: {
    marginTop: 34,
    paddingHorizontal: 8,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.textDark,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    marginLeft: 4,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  rule: {
    marginTop: 10,
    height: 1,
    backgroundColor: colors.textDark,
  },
  sectionBody: {
    paddingTop: 18,
    paddingHorizontal: 6,
    gap: 22,
  },
  row: {
    flexDirection: 'row',
  },
  fieldWrap: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.placeholder,
  },
  fieldValue: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textDark,
  },
  docList: {
    gap: 16,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docName: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
  },
  declTitle: {
    marginTop: 38,
    marginBottom: 14,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.textDark,
  },
  checkRow: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  box: {
    width: 24,
    height: 24,
    marginTop: 1,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textBody,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});