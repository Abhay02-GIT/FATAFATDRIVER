import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowRightIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import BottomBar from '@/components/registration/BottomBar';
import {SegmentedProgress} from '@/components/registration/Progress';
import StepHeader from '@/components/registration/StepHeader';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import {Vehicle, VehicleId, VEHICLES} from '@/constants/vehicles';
import type {RootStackParamList} from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleType'>;

type CardProps = {
  vehicle: Vehicle;
  width: number;
  selected: boolean;
  onPress: () => void;
};

function VehicleCard({vehicle, width, selected, onPress}: CardProps) {
  const strings = useStrings();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, {width}, selected && styles.cardSelected]}>
      {selected ? (
        <View style={styles.check}>
          <MdiIcon path={MDI.check} size={13} color="#FFFFFF" />
        </View>
      ) : null}
      <View style={[styles.iconTile, {backgroundColor: vehicle.tint}]}>
        <MdiIcon path={vehicle.iconPath} size={30} color={vehicle.iconColor} />
      </View>
      <Text style={styles.cardName}>{strings.vehicles[vehicle.id]}</Text>
      <View style={[styles.pill, selected && styles.pillSelected]}>
        <Text style={styles.pillText}>
          {strings.formatString(strings.common.commission, vehicle.commission)}
        </Text>
      </View>
    </Pressable>
  );
}

export default function VehicleTypeScreen({navigation}: Props) {
  const strings = useStrings();
  const {width} = useWindowDimensions();
  const [selected, setSelected] = useState<VehicleId>('cab');
  const cardWidth = (width - 40 - 14) / 2;


    const onContinue = () => {
    if (selected === 'driver') {
      // Driver service: go to Module 4 (Become a Driver)
      navigation.navigate('DriverIntro');
    } else {
      navigation.navigate('VehicleDetails', {vehicle: selected});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.top}>
        <StepHeader
          title="Fatafat"
          onBack={() => navigation.goBack()}
          boxedBack={false}
          bordered={false}
        />
        <View style={styles.stepRow}>
          <Text style={styles.stepNow}>
            {strings.formatString(strings.common.stepOf, 2, 4)}
          </Text>
          <Text style={styles.stepNext}>{strings.vehicleType.nextStep}</Text>
        </View>
        <View style={styles.progress}>
          <SegmentedProgress step={2} />
        </View>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.vehicleType.title}</Text>
        <Text style={styles.subtitle}>{strings.vehicleType.subtitle}</Text>

        <View style={styles.grid}>
          {VEHICLES.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              width={cardWidth}
              selected={vehicle.id === selected}
              onPress={() => setSelected(vehicle.id)}
            />
          ))}
        </View>

        <View style={styles.note}>
          <MdiIcon path={MDI.information} size={20} color={colors.green} />
          <Text style={styles.noteText}>{strings.vehicleType.note}</Text>
        </View>
      </ScrollView>

      <BottomBar shadow>
        <PrimaryButton
          title={strings.common.continue}
          onPress={onContinue}
          style={styles.cta}
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
    backgroundColor: colors.grayBg,
  },
  top: {
    paddingBottom: 21,
    backgroundColor: colors.background,
  },
  stepRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepNow: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textLabel,
  },
  stepNext: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.placeholder,
  },
  progress: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 11,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.placeholder,
  },
  grid: {
    marginTop: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 20,
  },
  card: {
    height: 130,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: {
    marginTop: 9,
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textDark,
  },
  pill: {
    marginTop: 5,
    height: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: colors.mint,
  },
  pillText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.green,
  },
  note: {
    marginTop: 30,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    backgroundColor: colors.mintSoft,
  },
  noteText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textBody,
  },
  cta: {
    height: 54,
  },
});