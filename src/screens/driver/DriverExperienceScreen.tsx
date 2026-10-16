import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MdiIcon from '@/components/common/MdiIcon';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import DriverHeader from '@/components/driver/DriverHeader';
import {DriverSelectField} from '@/components/driver/DriverFields';
import DriverStepTitle from '@/components/driver/DriverStepTitle';
import SectionLabel from '@/components/driver/SectionLabel';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {
  CarType,
  EXPERIENCE,
  Experience,
  License,
  LICENSES,
  Transmission,
  TRANSMISSIONS,
} from '@/constants/options';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {setDriverProfile, useDriverProfile} from '@/state/driverProfileStore';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverExperience'>;

// TODO: load this list from your API
const VEHICLE_TYPES: CarType[] = ['sedan', 'suv', 'hatchback', 'luxury'];

function toggle<T>(list: T[], id: T) {
  return list.includes(id) ? list.filter(x => x !== id) : [...list, id];
}

export default function DriverExperienceScreen({navigation, route}: Props) {
  const strings = useStrings();
  const saved = useDriverProfile();
  const [experience, setExperience] = useState<Experience | undefined>(saved.experience);
  const [license, setLicense] = useState<License | undefined>(saved.license);
  const [vehicles, setVehicles] = useState<CarType[]>(saved.vehicles);
  const [transmission, setTransmission] = useState<Transmission[]>(saved.transmission);

  const onContinue = () => {
    // TODO: validate, then also save with the API
    setDriverProfile({experience, license, vehicles, transmission});
    if (route.params?.fromReview) {
      navigation.goBack();
    } else {
      navigation.navigate('DriverAvailability');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DriverHeader
        title={strings.driverExperience.title}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <DriverStepTitle title={strings.driverExperience.title} step={2} />

        <View style={styles.form}>
          <DriverSelectField
            label={strings.driverExperience.totalExperience}
            placeholder={strings.driverExperience.selectExperience}
            value={experience}
            options={EXPERIENCE.map(id => ({value: id, label: strings.experience[id]}))}
            onChange={setExperience}
          />
          <DriverSelectField
            label={strings.driverExperience.licenseType}
            placeholder={strings.driverExperience.selectLicense}
            value={license}
            options={LICENSES.map(id => ({value: id, label: strings.licenses[id]}))}
            onChange={setLicense}
          />
        </View>

        <SectionLabel
          title={strings.driverExperience.vehicleTypes}
          style={styles.sectionTop}
        />
        <View style={styles.grid}>
          {VEHICLE_TYPES.map(id => {
            const on = vehicles.includes(id);
            return (
              <Pressable
                key={id}
                onPress={() => setVehicles(prev => toggle(prev, id))}
                style={[styles.vehicle, on && styles.vehicleOn]}>
                {on ? (
                  <View style={styles.checkOn}>
                    <MdiIcon path={MDI.check} size={13} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.checkOff} />
                )}
                <View style={styles.vehicleText}>
                  <Text style={styles.vehicleName}>{strings.carTypes[id]}</Text>
                  <Text style={styles.vehicleSub}>
                    {on ? strings.driverExperience.selected : strings.driverExperience.available}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <SectionLabel
          title={strings.driverExperience.transmission}
          style={styles.sectionTop}
        />
        <View style={styles.transRow}>
          {TRANSMISSIONS.map(id => {
            const on = transmission.includes(id);
            return (
              <Pressable
                key={id}
                onPress={() => setTransmission(prev => toggle(prev, id))}
                style={[styles.trans, on && styles.transOn]}>
                <Text style={[styles.transText, on && styles.transTextOn]}>
                  {strings.transmissions[id]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <BottomBar>
        <ActionButton title={strings.common.continue} onPress={onContinue} />
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  form: {
    marginTop: 24,
  },
  sectionTop: {
    marginTop: 8,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  vehicle: {
    width: '47.8%',
    height: 68,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  vehicleOn: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  checkOn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOff: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  vehicleText: {
    marginLeft: 12,
  },
  vehicleName: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textDark,
  },
  vehicleSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  transRow: {
    flexDirection: 'row',
    gap: 12,
  },
  trans: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transOn: {
    borderColor: colors.primary,
    backgroundColor: colors.pinkSoft,
  },
  transText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textDark,
  },
  transTextOn: {
    color: colors.primary,
  },
});