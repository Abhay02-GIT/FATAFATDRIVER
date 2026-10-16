export type DriverDocId = 'licence' | 'aadhar' | 'profile' | 'address' | 'police';

// Titles and photo labels are in strings.driverDocuments
export type DriverDocConfig = {
  id: DriverDocId;
  hasExpiry: boolean;
  optional: boolean;
};

// Order = order on the checklist screen
export const DRIVER_DOCS: DriverDocConfig[] = [
  {id: 'licence', hasExpiry: true, optional: false},
  {id: 'aadhar', hasExpiry: false, optional: false},
  {id: 'profile', hasExpiry: false, optional: false},
  {id: 'address', hasExpiry: false, optional: false},
  {id: 'police', hasExpiry: true, optional: true},
];

export function getDriverDoc(id: DriverDocId) {
  return DRIVER_DOCS.find(d => d.id === id) ?? DRIVER_DOCS[0];
}
