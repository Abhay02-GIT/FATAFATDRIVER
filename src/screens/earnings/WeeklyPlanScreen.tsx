import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeftIcon, ArrowRightIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import TripSlider from '@/components/earnings/TripSlider';
import ActionButton from '@/components/registration/ActionButton';
import BottomBar from '@/components/registration/BottomBar';
import {colors} from '@/constants/colors';
import {MDI_PLAN} from '@/constants/iconPathsPlan';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList>;

const PLAN = {
  weeklyFee: 399,
  keepPercent: 100,
  standardCommission: 20,
  planCommission: 0,
  defaultTrips: 30,
  minTrips: 10,
  maxTrips: 100,
};

const calculateSavings = (trips: number) => {
  const estimatedFarePerTrip = 250;
  const standard = (trips * estimatedFarePerTrip * PLAN.standardCommission) / 100;
  const withPlan = PLAN.weeklyFee +
    (trips * estimatedFarePerTrip * PLAN.planCommission) / 100;

  return {standard, withPlan, savings: standard - withPlan};
};

export default function WeeklyPlanScreen({navigation}: Props) {
  const strings = useStrings();
  const t = (strings as typeof strings & {weeklyPlan: Record<string, string>}).weeklyPlan;
  const insets = useSafeAreaInsets();
  const [trips, setTrips] = useState(PLAN.defaultTrips);
  const calc = calculateSavings(trips);

  const f = (text: string, ...values: string[]) =>
    String(strings.formatString(text, ...values));

  const benefits = [
    f(t.keepFares, String(PLAN.keepPercent)),
    t.noSurge,
    t.priority,
  ];

  const onSubscribe = () => {
    // TODO: start the subscription with your API / payment flow
  };

  const onTerms = () => {
    // TODO: open the full terms page
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
          <ArrowLeftIcon size={20} color={colors.faded} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.title}</Text>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.starTile}>
          <MdiIcon path={MDI_PLAN.star} size={30} color="#10A64A" />
        </View>
        <Text style={styles.title}>{t.planName}</Text>
        <Text style={styles.subtitle}>
          {t.subtitleBefore}
          <Text style={styles.subtitleGreen}>
            {f(t.subtitleHighlight, String(PLAN.keepPercent))}
          </Text>
          {t.subtitleAfter}
          {'\n'}
          {t.subtitleSecond}
        </Text>

        <View style={styles.passCard}>
          <View style={styles.passTop}>
            <View style={styles.passLeft}>
              <View style={styles.popular}>
                <Text style={styles.popularText}>{t.mostPopular}</Text>
              </View>
              <Text style={styles.passName}>{t.weeklyPass}</Text>
            </View>
            <View style={styles.priceBlock}>
              <View style={styles.priceRow}>
                <Text style={styles.rupee}>₹</Text>
                <Text style={styles.price}>{PLAN.weeklyFee}</Text>
              </View>
              <Text style={styles.perWeek}>{t.perWeek}</Text>
            </View>
          </View>
          <View style={styles.rule} />
          {benefits.map(text => (
            <View key={text} style={styles.benefit}>
              <MdiIcon path={MDI_PLAN.checkCircleOutline} size={22} color={colors.green} />
              <Text style={styles.benefitText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.calcCard}>
          <View style={styles.calcHead}>
            <MdiIcon path={MDI_PLAN.calculator} size={20} color="#F5A81C" />
            <Text style={styles.calcTitle}>{t.calculator}</Text>
          </View>
          <Text style={styles.calcDesc}>
            {f(t.calculatorText, String(PLAN.standardCommission))}
          </Text>

          <View style={styles.tripsRow}>
            <Text style={styles.tripsLabel}>{t.estimatedTrips}</Text>
            <Text style={styles.tripsValue}>{trips}</Text>
          </View>
          <TripSlider
            value={trips}
            min={PLAN.minTrips}
            max={PLAN.maxTrips}
            onChange={setTrips}
          />
          <View style={styles.scale}>
            <Text style={styles.scaleText}>{PLAN.minTrips}</Text>
            <Text style={styles.scaleText}>{PLAN.maxTrips}+</Text>
          </View>

          <View style={styles.result}>
            <View style={styles.compare}>
              <View style={styles.compareCol}>
                <Text style={styles.compareLabel}>
                  {f(t.standard, String(PLAN.standardCommission))}
                </Text>
                <Text style={styles.strike}>{formatRupees(calc.standard)}</Text>
              </View>
              <View style={styles.vRule} />
              <View style={[styles.compareCol, styles.compareRight]}>
                <Text style={styles.compareLabel}>
                  {f(t.weeklyPassCost, formatRupees(PLAN.weeklyFee), String(PLAN.planCommission))}
                </Text>
                <Text style={styles.passCost}>{formatRupees(calc.withPlan)}</Text>
              </View>
            </View>
            <View style={styles.hRule} />
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>{t.yourSavings}</Text>
              <View style={styles.savingsPill}>
                <Text style={styles.savingsText}>{formatRupees(Math.max(calc.savings, 0))}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.terms}>
          {t.terms}
          <Text style={styles.termsLink} onPress={onTerms}>
            {t.readTerms}
          </Text>
        </Text>
      </ScrollView>

      <BottomBar shadow>
        <ActionButton
          style={styles.subscribe}
          title={t.subscribe}
          onPress={onSubscribe}
          icon={<ArrowRightIcon size={18} color="#FFFFFF" />}
        />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {flex: 1, backgroundColor: colors.background},
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDark,
    backgroundColor: colors.background,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ringFill,
  },
  headerTitle: {marginLeft: 12, fontFamily: fonts.medium, fontSize: 18, color: colors.textDark},
  content: {paddingHorizontal: 20, paddingTop: 22, paddingBottom: 24},
  starTile: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15,165,75,0.44)',
    backgroundColor: 'rgba(15,165,75,0.2)',
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.faded,
  },
  subtitleGreen: {fontFamily: fonts.regular, color: colors.green},
  passCard: {
    marginTop: 26,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    backgroundColor: colors.background,
    elevation: 6,
    shadowColor: colors.green,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  passTop: {flexDirection: 'row', justifyContent: 'space-between'},
  passLeft: {justifyContent: 'space-between'},
  popular: {
    alignSelf: 'flex-start',
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 13,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(20,173,71,0.28)',
    backgroundColor: 'rgba(20,173,71,0.1)',
  },
  popularText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: '#10A74A',
  },
  passName: {marginTop: 14, fontFamily: fonts.regular, fontSize: 18, color: colors.textDark},
  priceBlock: {alignItems: 'flex-end'},
  priceRow: {flexDirection: 'row', alignItems: 'flex-start'},
  rupee: {
    marginTop: 9,
    marginRight: 3,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  price: {fontFamily: fonts.bold, fontSize: 28, color: colors.textDark},
  perWeek: {marginTop: 2, fontFamily: fonts.regular, fontSize: 12, color: colors.placeholder},
  rule: {marginTop: 18, marginBottom: 6, height: 1, backgroundColor: colors.borderDark},
  benefit: {marginTop: 14, flexDirection: 'row', alignItems: 'center'},
  benefitText: {marginLeft: 12, fontFamily: fonts.regular, fontSize: 15, color: colors.textDark},
  calcCard: {
    marginTop: 26,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.borderDark,
    backgroundColor: colors.background,
  },
  calcHead: {flexDirection: 'row', alignItems: 'center'},
  calcTitle: {marginLeft: 10, fontFamily: fonts.regular, fontSize: 18, color: colors.textDark},
  calcDesc: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.faded,
  },
  tripsRow: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripsLabel: {fontFamily: fonts.bold, fontSize: 12, color: colors.textDark},
  tripsValue: {fontFamily: fonts.bold, fontSize: 20, color: colors.amber},
  scale: {marginTop: 4, flexDirection: 'row', justifyContent: 'space-between'},
  scaleText: {fontFamily: fonts.regular, fontSize: 12, color: colors.placeholder},
  result: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  compare: {flexDirection: 'row'},
  compareCol: {flex: 1},
  compareRight: {paddingLeft: 14},
  vRule: {width: 1, backgroundColor: colors.borderDark},
  compareLabel: {fontFamily: fonts.regular, fontSize: 12, color: colors.faded},
  strike: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  passCost: {marginTop: 6, fontFamily: fonts.regular, fontSize: 18, color: colors.green},
  hRule: {marginVertical: 14, height: 1, backgroundColor: colors.borderDark},
  savingsRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  savingsLabel: {fontFamily: fonts.bold, fontSize: 14, color: colors.textDark},
  savingsPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    backgroundColor: colors.mint,
  },
  savingsText: {fontFamily: fonts.bold, fontSize: 26, color: colors.green},
  terms: {
    marginTop: 22,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#C6C6CB',
  },
  termsLink: {textDecorationLine: 'underline'},
  subscribe: {
    elevation: 8,
    shadowColor: '#16A34A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
});