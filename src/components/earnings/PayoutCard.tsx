import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI_DOCS} from '@/constants/iconPathsDocs';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

type Props = {
  when: string; // already formatted, e.g. "Tomorrow, 9:00 AM"
  accountLast4: string;
  onPress?: () => void;
};

// "NEXT PAYOUT" card with the bank account chip on the right.
export default function PayoutCard({when, accountLast4, onPress}: Props) {
  const strings = useStrings();

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.label}>{strings.earnings.nextPayout}</Text>
        <Text style={styles.when} numberOfLines={1}>
          {when}
        </Text>
      </View>
      <View style={styles.account}>
        <MdiIcon path={MDI_DOCS.bank} size={18} color={colors.textSecondary} />
        <Text style={styles.accountText}>{`•••• ${accountLast4}`}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  left: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  when: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },
  account: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  accountText: {
    marginLeft: 8,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    letterSpacing: 0.5,
    color: colors.textLabel,
  },
});