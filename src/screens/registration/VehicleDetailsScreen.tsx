import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import BottomBar from '@/components/registration/BottomBar';
import {SelectField, TextField} from '@/components/registration/FormFields';
import {BarProgress} from '@/components/registration/Progress';
import SectionHeading from '@/components/registration/SectionHeading';
import StepHeader from '@/components/registration/StepHeader';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {CarType, Colour, COLOURS} from '@/constants/options';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {VEHICLES} from '@/constants/vehicles';
import {setRiderProfile, useRiderProfile} from '@/state/riderProfileStore';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetails'>;

// TODO: load these lists from your API
const VEHICLE_TYPES: CarType[] = ['sedan', 'hatchback', 'suv', 'minivan'];
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({length: 26}, (_, i) => String(THIS_YEAR - i));

export default function VehicleDetailsScreen({navigation, route}: Props) {
  const strings = useStrings();
  const saved = useRiderProfile();
  const [vehicleType, setVehicleType] = useState<CarType | undefined>(saved.vehicleType);
  const [number, setNumber] = useState(saved.vehicleNumber);
  const [model, setModel] = useState(saved.model);
  const [colour, setColour] = useState<Colour | undefined>(saved.colour);
  const [year, setYear] = useState<string | undefined>(saved.year);

  // Summary card. Cab matches the design; other services show their name.
  const vehicleId = route.params?.vehicle ?? saved.vehicle ?? 'cab';
  const vehicle = VEHICLES.find(v => v.id === vehicleId);
  const isCab = !vehicle || vehicle.id === 'cab';
  const summaryTitle = isCab
    ? strings.vehicleDetails.standardRide
    : strings.formatString(strings.vehicleDetails.serviceRide, strings.vehicles[vehicle.id]);
  const summarySub = isCab
    ? strings.vehicleDetails.standardRideInfo
    : strings.vehicleDetails.selectedService;

  const onSave = () => {
    // TODO: validate the fields, then also save with your API
    setRiderProfile({
      vehicle: vehicleId,
      vehicleType,
      vehicleNumber: number,
      model,
      colour,
      year,
    });
    if (route.params?.fromReview) {
      navigation.goBack(); // came from Review: return there
    } else {
      navigation.navigate('DocumentChecklist');
    }
  };

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="dark-content" />
      <StepHeader
        title={strings.vehicleDetails.title}
        rightText={strings.formatString(strings.common.stepOf, 3, 4) as string}
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
        <BarProgress fraction={0.75} />

        <View style={styles.summary}>
          <View style={styles.summaryIcon}>
            <MdiIcon path={MDI.car} size={22} color={colors.primary} />
          </View>
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>{summaryTitle}</Text>
            <Text style={styles.summarySub}>{summarySub}</Text>
          </View>
          <View style={styles.active}>
            <Text style={styles.activeText}>{strings.vehicleDetails.active}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title={strings.vehicleDetails.vehicleInfo} />
        </View>

        <SelectField
          label={strings.vehicleDetails.vehicleType}
          placeholder={strings.vehicleDetails.selectVehicleType}
          value={vehicleType}
          options={VEHICLE_TYPES.map(id => ({value: id, label: strings.carTypes[id]}))}
          onChange={setVehicleType}
        />
        <TextField
          label={strings.vehicleDetails.vehicleNumber}
          placeholder={strings.vehicleDetails.vehicleNumberPlaceholder}
          value={number}
          onChangeText={setNumber}
          autoCapitalize="characters"
          autoCorrect={false}
        />
        <View style={styles.twoCols}>
          <TextField
            containerStyle={styles.col}
            label={strings.vehicleDetails.vehicleModel}
            placeholder={strings.vehicleDetails.vehicleModelPlaceholder}
            value={model}
            onChangeText={setModel}
          />
          <SelectField
            containerStyle={styles.col}
            label={strings.vehicleDetails.vehicleColour}
            placeholder={strings.vehicleDetails.selectColour}
            value={colour}
            options={COLOURS.map(id => ({value: id, label: strings.colours[id]}))}
            onChange={setColour}
          />
        </View>
        <SelectField
          label={strings.vehicleDetails.registrationYear}
          placeholder={strings.vehicleDetails.selectYear}
          value={year}
          options={YEARS.map(y => ({value: y, label: y}))}
          onChange={setYear}
        />
      </KeyboardAwareScrollView>

      <BottomBar>
        <PrimaryButton
          title={strings.vehicleDetails.save}
          onPress={onSave}
          style={styles.cta}
        />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  summary: {
    marginTop: 17,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FDE3E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    flex: 1,
    marginLeft: 14,
  },
  summaryTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textDark,
  },
  summarySub: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  active: {
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.green,
  },
  section: {
    marginTop: 25,
  },
  twoCols: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  cta: {
    height: 54,
  },
});