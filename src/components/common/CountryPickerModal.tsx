import React, {useMemo, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import {COUNTRIES} from '@/constants/countries';
import type {Country} from '@/constants/countries';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

type Props = {
  visible: boolean;
  selected: Country;
  onSelect: (country: Country) => void;
  onClose: () => void;
};

export default function CountryPickerModal({
  visible,
  selected,
  onSelect,
  onClose,
}: Props) {
  const strings = useStrings();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return COUNTRIES;
    }
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso.toLowerCase() === q,
    );
  }, [query]);

  const close = () => {
    setQuery('');
    onClose();
  };

  const pick = (country: Country) => {
    setQuery('');
    onSelect(country);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={close}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backdrop} onPress={close} />
        <View
          style={[
            styles.sheet,
            {paddingBottom: Math.max(insets.bottom, 12) + 8},
          ]}>
          <View style={styles.handle} />
          <Text style={styles.title}>{strings.login.selectCountry}</Text>

          <TextInput
            style={styles.search}
            value={query}
            onChangeText={setQuery}
            placeholder={strings.login.searchCountry}
            placeholderTextColor={colors.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <FlatList
            data={data}
            keyExtractor={item => item.iso}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.empty}>{strings.login.noCountries}</Text>
            }
            renderItem={({item}) => {
              const isSelected = item.iso === selected.iso;
              return (
                <Pressable
                  style={[styles.row, isSelected && styles.rowSelected]}
                  onPress={() => pick(item)}>
                  <Text style={styles.rowFlag}>{item.flag}</Text>
                  <Text style={styles.rowName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.rowCode, isSelected && styles.rowCodeSelected]}>
                    {item.dialCode}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15,18,36,0.45)',
  },
  sheet: {
    maxHeight: '75%',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  title: {
    marginTop: 16,
    marginBottom: 12,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
  },
  search: {
    height: 46,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
  },
  row: {
    height: 52,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  rowSelected: {
    backgroundColor: colors.primaryLight,
  },
  rowFlag: {
    fontSize: 20,
  },
  rowName: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textDark,
  },
  rowCode: {
    marginLeft: 8,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textSecondary,
  },
  rowCodeSelected: {
    color: colors.primary,
  },
  empty: {
    paddingVertical: 24,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
});