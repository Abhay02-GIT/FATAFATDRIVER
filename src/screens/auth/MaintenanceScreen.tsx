import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import BrandLogo from '@/components/common/BrandLogo';
import IconCircle from '@/components/common/IconCircle';
import {ClockIcon, ToolboxIcon} from '@/components/common/Icons';
import {Description, Title} from '@/components/common/StatusText';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/typography';
import {useStrings} from '@/localization';

// TODO: take this from the server response
const ESTIMATED_MINUTES = 15;

export default function MaintenanceScreen() {
  const strings = useStrings();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <IconCircle backgroundColor={colors.amberLight}>
        <ToolboxIcon size={28} color={colors.amber} />
      </IconCircle>

      <Title>{strings.maintenance.title}</Title>
      <Description>{strings.maintenance.description}</Description>

      <View style={styles.pill}>
        <ClockIcon size={14} color={colors.textBody} />
        <Text style={styles.pillText}>
          {strings.formatString(strings.maintenance.estimate, ESTIMATED_MINUTES)}
        </Text>
      </View>

      <View style={styles.logo}>
        <BrandLogo width={100} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    paddingBottom: 64,
  },
  pill: {
    marginTop: 32,
    height: 36,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pillText: {
    marginLeft: 8,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textBody,
  },
  logo: {
    marginTop: 24,
  },
});