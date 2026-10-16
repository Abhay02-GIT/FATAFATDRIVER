// Ids of the picker options. Labels live in the localization files,
// so the saved value stays the same when the language changes.
// TODO: load these lists from your API

export const GENDERS = ['male', 'female', 'other', 'undisclosed'] as const;
export type Gender = (typeof GENDERS)[number];

export const CAR_TYPES = ['sedan', 'hatchback', 'suv', 'minivan', 'luxury'] as const;
export type CarType = (typeof CAR_TYPES)[number];

export const COLOURS = [
  'white',
  'black',
  'silver',
  'grey',
  'red',
  'blue',
  'yellow',
  'green',
  'orange',
  'other',
] as const;
export type Colour = (typeof COLOURS)[number];

export const EXPERIENCE = ['lessThan1', '1to3', '3to5', '5to10', '10plus'] as const;
export type Experience = (typeof EXPERIENCE)[number];

export const LICENSES = ['lmv', 'hmv', 'lmvHmv', 'taxiBadge'] as const;
export type License = (typeof LICENSES)[number];

export const TRANSMISSIONS = ['manual', 'automatic'] as const;
export type Transmission = (typeof TRANSMISSIONS)[number];

export type DayPart = 'morning' | 'afternoon' | 'evening' | 'night';
