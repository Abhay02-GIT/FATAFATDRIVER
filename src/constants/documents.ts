import {MDI} from '@/constants/iconPaths';
import {MDI_DOCS} from '@/constants/iconPathsDocs';

export type DocId =
  | 'licence'
  | 'rc'
  | 'insurance'
  | 'profile'
  | 'vehiclePhoto'
  | 'police';

// Titles and photo labels are in strings.documents
export type DocumentConfig = {
  id: DocId;
  iconPath: string;
  hasExpiry: boolean;
};

// Order = order on the checklist screen
export const DOCUMENTS: DocumentConfig[] = [
  {id: 'licence', iconPath: MDI_DOCS.cardAccountDetails, hasExpiry: true},
  {id: 'rc', iconPath: MDI_DOCS.fileDocument, hasExpiry: true},
  {id: 'insurance', iconPath: MDI_DOCS.shieldPlus, hasExpiry: true},
  {id: 'profile', iconPath: MDI_DOCS.accountCircle, hasExpiry: false},
  {id: 'vehiclePhoto', iconPath: MDI.car, hasExpiry: false},
  {id: 'police', iconPath: MDI_DOCS.shieldStar, hasExpiry: false},
];

export function getDocument(id: DocId) {
  return DOCUMENTS.find(d => d.id === id) ?? DOCUMENTS[0];
}
