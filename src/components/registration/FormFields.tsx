import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MdiIcon from '@/components/common/MdiIcon';
import {colors} from '@/constants/colors';
import {MDI} from '@/constants/iconPaths';
import {fonts} from '@/constants/typography';

type TextFieldProps = TextInputProps & {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextField({
  label,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={[styles.box, styles.input, focused && styles.boxFocused, style]}
        placeholderTextColor={colors.placeholder}
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
    </View>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  placeholder: string;
  value?: T;
  options: {value: T; label: string}[];
  onChange: (value: T) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export function SelectField<T extends string>({
  label,
  placeholder,
  value,
  options,
  onChange,
  containerStyle,
}: SelectFieldProps<T>) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.box, styles.select, open && styles.boxFocused]}>
        <Text
          numberOfLines={1}
          style={[styles.selectText, !value && styles.placeholderText]}>
          {selectedLabel ?? placeholder}
        </Text>
        <MdiIcon path={MDI.menuDown} size={24} color={colors.textSecondary} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setOpen(false)}>
        <View style={styles.modalRoot}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />
          <View style={[styles.sheet, {paddingBottom: Math.max(insets.bottom, 16)}]}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView style={styles.sheetList}>
              {options.map(option => {
                const selected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    style={styles.option}
                    onPress={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}>
                    <Text
                      style={[styles.optionText, selected && styles.optionTextOn]}>
                      {option.label}
                    </Text>
                    {selected ? (
                      <MdiIcon path={MDI.check} size={20} color={colors.primary} />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textLabel,
  },
  box: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  boxFocused: {
    borderColor: colors.primary,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 12,
  },
  selectText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
  placeholderText: {
    color: colors.placeholder,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.background,
  },
  sheetTitle: {
    marginBottom: 8,
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
  },
  sheetList: {
    maxHeight: 320,
  },
  option: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.track,
  },
  optionText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
  optionTextOn: {
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
});