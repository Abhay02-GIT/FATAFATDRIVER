import React, {useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import DriverHeader from '@/components/driver/DriverHeader';
import {DriverTextField} from '@/components/driver/DriverFields';
import {colors} from '@/constants/colors';
import {getDriverDoc} from '@/constants/driverDocuments';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {markDriverDocUploaded} from '@/state/driverDocumentStore';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverUploadDocument'>;

async function ensureCameraPermission() {
  if (Platform.OS !== 'android') {
    return true; // iOS asks by itself (needs NSCameraUsageDescription)
  }
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
}

// "12312027" -> "12/31/2027"
function formatExpiry(digits: string) {
  let out = digits.slice(0, 2);
  if (digits.length > 2) {
    out += `/${digits.slice(2, 4)}`;
  }
  if (digits.length > 4) {
    out += `/${digits.slice(4, 8)}`;
  }
  return out;
}

export default function DriverUploadDocumentScreen({navigation, route}: Props) {
  const strings = useStrings();
  const doc = getDriverDoc(route.params.docId);
  const text = strings.driverDocuments[doc.id];
  const [images, setImages] = useState<(string | undefined)[]>(
    text.sides.map(() => undefined),
  );
  const [active, setActive] = useState(0);
  const [number, setNumber] = useState('');
  const [expiryDigits, setExpiryDigits] = useState('');

  const allPicked = images.every(Boolean);

  const setImage = (uri: string) => {
    setImages(prev => prev.map((old, i) => (i === active ? uri : old)));
    // jump to the next empty side so the rider can keep going
    const next = images.findIndex((u, i) => i !== active && !u);
    if (next !== -1) {
      setActive(next);
    }
  };

  const onCamera = async () => {
    if (!(await ensureCameraPermission())) {
      return;
    }
    const result = await launchCamera({mediaType: 'photo', quality: 0.8});
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setImage(uri);
    }
  };

  const onGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    });
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setImage(uri);
    }
  };

  const onSave = () => {
    // TODO: validate number / expiry and upload the images with your API
    markDriverDocUploaded(doc.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DriverHeader
        title={text.uploadTitle}
        variant="plain"
        onBack={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={24}
        enableResetScrollToCoords={false}>
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <MdiIcon
              path={MDI_DOCS.informationOutline}
              size={20}
              color={colors.primary}
            />
          </View>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>{strings.common.photoTipTitle}</Text>
            <Text style={styles.tipBody}>{strings.common.photoTipText}</Text>
          </View>
        </View>

        {text.sides.map((label, i) => (
          <Pressable
            key={label}
            onPress={() => setActive(i)}
            style={[styles.drop, active === i && styles.dropActive]}>
            {images[i] ? (
              <Image source={{uri: images[i]}} style={styles.dropImage} />
            ) : (
              <>
                <MdiIcon
                  path={i === 0 ? MDI_DOCS.cameraOutline : MDI_DOCS.upload}
                  size={34}
                  color={colors.placeholder}
                />
                <Text style={styles.dropText}>{label}</Text>
              </>
            )}
          </Pressable>
        ))}

        <View style={styles.btnRow}>
          <Pressable style={styles.srcBtn} onPress={onCamera}>
            <MdiIcon path={MDI_DOCS.cameraOutline} size={16} color="#FFFFFF" />
            <Text style={styles.srcText}>{strings.common.camera}</Text>
          </Pressable>
          <Pressable style={styles.srcBtn} onPress={onGallery}>
            <MdiIcon path={MDI_DOCS.imageOutline} size={16} color="#FFFFFF" />
            <Text style={styles.srcText}>{strings.common.gallery}</Text>
          </Pressable>
        </View>

        {text.numberLabel ? (
          <DriverTextField
            containerStyle={styles.firstField}
            label={text.numberLabel}
            labelColor={colors.placeholder}
            darkBorder
            style={styles.input}
            placeholder={strings.common.numberPlaceholder}
            value={number}
            onChangeText={setNumber}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        ) : null}
        {doc.hasExpiry ? (
          <DriverTextField
            label={strings.common.expiryDate}
            labelColor={colors.placeholder}
            darkBorder
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={formatExpiry(expiryDigits)}
            onChangeText={t => setExpiryDigits(t.replace(/\D/g, '').slice(0, 8))}
            keyboardType="number-pad"
            maxLength={10}
          />
        ) : null}
      </KeyboardAwareScrollView>

      <BottomBar>
        <ActionButton
          title={strings.driverUploadDocument.upload}
          disabled={!allPicked}
          onPress={onSave}
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  tipCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.textDark,
    backgroundColor: colors.background,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.pinkSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textDark,
  },
  tipBody: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.placeholder,
  },
  drop: {
    marginTop: 24,
    height: 160,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.placeholder,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dropActive: {
    borderColor: colors.primary,
  },
  dropImage: {
    width: '100%',
    height: '100%',
  },
  dropText: {
    marginTop: 12,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.placeholder,
  },
  btnRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  srcBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.textDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  srcText: {
    marginLeft: 8,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  firstField: {
    marginTop: 20,
    marginBottom: 14,
  },
  input: {
    height: 44,
    borderRadius: 10,
  },
});