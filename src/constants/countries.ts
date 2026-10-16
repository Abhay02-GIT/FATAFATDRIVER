export type Country = {
  /** ISO 3166-1 alpha-2 code, also used as the list key */
  iso: string;
  name: string;
  flag: string;
  /** Dial code including the leading "+" */
  dialCode: string;
  /** Number of digits in the national (local) number */
  phoneLength: number;
  /** How the digits are grouped for display, e.g. [5, 5] -> "98765 43210" */
  groups: number[];
};

export const COUNTRIES: Country[] = [
  {iso: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', phoneLength: 10, groups: [5, 5]},
  {iso: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', phoneLength: 10, groups: [3, 3, 4]},
  {iso: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', phoneLength: 10, groups: [3, 3, 4]},
  {iso: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', phoneLength: 10, groups: [4, 6]},
  {iso: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971', phoneLength: 9, groups: [2, 3, 4]},
  {iso: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', phoneLength: 9, groups: [2, 3, 4]},
  {iso: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '+974', phoneLength: 8, groups: [4, 4]},
  {iso: 'KW', name: 'Kuwait', flag: '🇰🇼', dialCode: '+965', phoneLength: 8, groups: [4, 4]},
  {iso: 'OM', name: 'Oman', flag: '🇴🇲', dialCode: '+968', phoneLength: 8, groups: [4, 4]},
  {iso: 'BH', name: 'Bahrain', flag: '🇧🇭', dialCode: '+973', phoneLength: 8, groups: [4, 4]},
  {iso: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92', phoneLength: 10, groups: [3, 7]},
  {iso: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880', phoneLength: 10, groups: [4, 6]},
  {iso: 'NP', name: 'Nepal', flag: '🇳🇵', dialCode: '+977', phoneLength: 10, groups: [3, 7]},
  {iso: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94', phoneLength: 9, groups: [2, 7]},
  {iso: 'BT', name: 'Bhutan', flag: '🇧🇹', dialCode: '+975', phoneLength: 8, groups: [4, 4]},
  {iso: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65', phoneLength: 8, groups: [4, 4]},
  {iso: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60', phoneLength: 9, groups: [2, 3, 4]},
  {iso: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', phoneLength: 9, groups: [3, 3, 3]},
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0];

/** Groups digits using the country's grouping, e.g. "9876543210" -> "98765 43210". */
export function formatPhoneNumber(digits: string, country: Country): string {
  const parts: string[] = [];
  let index = 0;
  for (const size of country.groups) {
    if (index >= digits.length) {
      break;
    }
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  return parts.join(' ');
}

/** Placeholder like "00000 00000" that matches the country's grouping. */
export function phonePlaceholder(country: Country): string {
  return formatPhoneNumber('0'.repeat(country.phoneLength), country);
}