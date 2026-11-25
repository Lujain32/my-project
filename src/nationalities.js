// The 22 Arab League countries, in alphabetical order by name (D11).
// Codes are ISO 3166-1 alpha-2, the same codes used in opportunities.json.
export const NATIONALITIES = [
  { code: 'DZ', name: 'Algeria' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'KM', name: 'Comoros' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'EG', name: 'Egypt' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LY', name: 'Libya' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MA', name: 'Morocco' },
  { code: 'OM', name: 'Oman' },
  { code: 'PS', name: 'Palestine' },
  { code: 'QA', name: 'Qatar' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SO', name: 'Somalia' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SY', name: 'Syria' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'YE', name: 'Yemen' },
];

export const DEFAULT_NATIONALITY = 'JO';

export function isKnownNationality(code) {
  return NATIONALITIES.some((nationality) => nationality.code === code);
}
