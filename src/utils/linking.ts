import {Linking} from 'react-native';

// Google Maps URL that starts turn-by-turn navigation; falls back to the
// browser when the Maps app isn't installed.
// https://developers.google.com/maps/documentation/urls/get-started#directions-action
export function openNavigation(latitude: number, longitude: number) {
  return Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate`,
  );
}

export function callNumber(phone: string) {
  return Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
}
