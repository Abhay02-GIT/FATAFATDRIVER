import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path, Polygon} from 'react-native-svg';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeftIcon, HelpCircleIcon} from '@/components/common/Icons';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {MDI_EARN} from '@/constants/iconPathsEarnings';
import {PAYOUT_DETAIL as D} from '@/constants/payouts';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';
import type {RootStackParamList} from '@/navigation/types';
import {formatRupees} from '@/utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'PayoutDetail'>;

// outlined pie chart (Platform Service Fee) and bolt (Surge) icons
function PieIcon({color}: {color: string}) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={9} />
      <Path d="M12 3v9h9" />
    </Svg>
  );
}

function BoltIcon({color}: {color: string}) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Svg>
  );
}

// big white card with a thin dark border
function Card({children, radius = 16}: {children: React.ReactNode; radius?: number}) {
  return <View style={[styles.card, {borderRadius: radius}]}>{children}</View>;
}

// "Gross Fares" / "Tips" card: icon + title on the left, amount on the right, note below
type LineCardProps = {
  icon: React.ReactNode;
  title: string;
  amount: string;
  amountColor: string;
  note: string;
};
function LineCard({icon, title, amount, amountColor, note}: LineCardProps) {
  return (
    <Card>
      <View style={styles.lineCard}>
        <View style={styles.lineTop}>
          {icon}
          <Text style={styles.lineTitle}>{title}</Text>
          <Text style={[styles.lineAmount, {color: amountColor}]}>{amount}</Text>
        </View>
        <Text style={styles.lineNote}>{note}</Text>
      </View>
    </Card>
  );
}

type AdjustRowProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  titleColor: string;
  note: string;
  noteColor: string;
  amount: string;
  amountColor: string;
};
function AdjustRow(p: AdjustRowProps) {
  return (
    <View style={styles.adjustRow}>
      <View style={[styles.adjustIcon, {backgroundColor: p.iconBg}]}>{p.icon}</View>
      <View style={styles.adjustText}>
        <Text style={[styles.adjustTitle, {color: p.titleColor}]}>{p.title}</Text>
        <Text style={[styles.adjustNote, {color: p.noteColor}]}>{p.note}</Text>
      </View>
      <Text style={[styles.adjustAmount, {color: p.amountColor}]}>{p.amount}</Text>
    </View>
  );
}

export default function PayoutDetailScreen({navigation}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const t = strings.payoutDetail;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, {paddingTop: insets.top + 18}]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <ArrowLeftIcon size={22} color={colors.placeholder} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.title}</Text>
        {/* TODO: open support / help */}
        <Pressable hitSlop={10}>
          <HelpCircleIcon size={22} color={colors.placeholder} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* summary */}
        <Card radius={28}>
          <View style={styles.summary}>
            <Text style={styles.period}>{D.period}</Text>
            <Text style={styles.amount}>{formatRupees(D.amount, 2)}</Text>
            <View style={styles.greenPill}>
              <MdiIcon path={MDI_EARN.checkCircle} size={14} color={colors.green} />
              <Text style={styles.greenPillText}>{t.transferred}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.bankRow}>
              <View style={styles.bankLeft}>
                <MdiIcon path={MDI_DOCS.bank} size={20} color={colors.faded} />
                <Text style={styles.bankText}>{`${D.bank} •••• ${D.last4}`}</Text>
              </View>
              <Text style={styles.when}>{D.transferredAt}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.gap} />
        <LineCard
          icon={<MdiIcon path={MDI.car} size={22} color={colors.faded} />}
          title={t.grossFares}
          amount={formatRupees(D.grossFares, 2)}
          amountColor={colors.textDark}
          note={String(strings.formatString(t.tripsCompleted, String(D.trips)))}
        />

        <View style={styles.gap} />
        <LineCard
          icon={<MdiIcon path={MDI_EARN.heart} size={22} color={colors.green} />}
          title={t.tips}
          amount={`+${formatRupees(D.tips, 2)}`}
          amountColor={colors.green}
          note={t.tipsNote}
        />

        {/* deductions & adjustments */}
        <View style={styles.gap} />
        <Card>
          <Text style={styles.sectionTitle}>{t.deductions}</Text>
          <AdjustRow
            icon={<PieIcon color={colors.fadedRed} />}
            iconBg={colors.pinkTint}
            title={t.platformFee}
            titleColor={colors.faded}
            note={String(strings.formatString(t.commission, String(D.commissionPercent)))}
            noteColor={colors.faded}
            amount={`-${formatRupees(D.platformFee, 2)}`}
            amountColor={colors.fadedRed}
          />
          <AdjustRow
            icon={<BoltIcon color={colors.amberStrong} />}
            iconBg={colors.amberTint}
            title={t.surge}
            titleColor={colors.textDark}
            note={t.surgeNote}
            noteColor={colors.placeholder}
            amount={`+${formatRupees(D.surgeBonus, 2)}`}
            amountColor={colors.amberStrong}
          />
        </Card>

        {/* transaction details */}
        <View style={styles.gap} />
        <Card>
          <View style={styles.tx}>
            <Text style={styles.sectionTitleTx}>{t.transactionDetails}</Text>

            <View style={styles.txRow}>
              <Text style={styles.txLabel}>{t.status}</Text>
              <View style={styles.settled}>
                <Text style={styles.settledText}>{t.settled}</Text>
              </View>
            </View>

            <View style={styles.txRow}>
              <Text style={styles.txLabel}>{t.initiated}</Text>
              <Text style={styles.txValue}>{D.initiatedAt}</Text>
            </View>

            <View style={styles.txRow}>
              <Text style={styles.txLabel}>{t.utr}</Text>
              <View style={styles.utr}>
                <Text style={styles.utrText}>{D.utr}</Text>
                {/* TODO: copy D.utr to the clipboard (e.g. @react-native-clipboard/clipboard) */}
                <Pressable hitSlop={8}>
                  <MdiIcon path={MDI_EARN.contentCopy} size={16} color={colors.textSecondary} />
                </Pressable>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  header: {
    paddingHorizontal: 24,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDark,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
  },
  content: {padding: 20, paddingBottom: 40},
  gap: {height: 18},
  card: {
    borderWidth: 1,
    borderColor: colors.borderDark,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },

  // summary card
  summary: {paddingTop: 24, paddingBottom: 24, alignItems: 'center'},
  period: {
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.faded,
  },
  amount: {
    marginTop: 8,
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.green,
  },
  greenPill: {
    marginTop: 8,
    paddingHorizontal: 12,
    height: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenPill,
  },
  greenPillText: {
    marginLeft: 6,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.green,
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    marginTop: 24,
    marginHorizontal: 24,
    backgroundColor: '#D1D5DB',
  },
  bankRow: {
    alignSelf: 'stretch',
    marginTop: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bankLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.faded,
  },
  when: {
    width: 72,
    marginLeft: 12,
    textAlign: 'right',
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.faded,
  },

  // Gross Fares / Tips
  lineCard: {padding: 20},
  lineTop: {flexDirection: 'row', alignItems: 'center'},
  lineTitle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.faded,
  },
  lineAmount: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
  lineNote: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.faded,
  },

  // Deductions & Adjustments
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: colors.textDark,
  },
  adjustRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderDark,
  },
  adjustIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustText: {flex: 1, marginLeft: 12},
  adjustTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  adjustNote: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 11,
  },
  adjustAmount: {
    marginLeft: 8,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },

  // Transaction Details
  tx: {padding: 20},
  sectionTitleTx: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.textDark,
  },
  txRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.faded,
  },
  txValue: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
  },
  settled: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.greenPill,
  },
  settledText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.green,
  },
  utr: {flexDirection: 'row', alignItems: 'center'},
  utrText: {
    marginRight: 8,
    fontFamily: fonts.regular,
    fontSize: 12,
    letterSpacing: 0.5,
    color: '#DADCE0',
  },
});