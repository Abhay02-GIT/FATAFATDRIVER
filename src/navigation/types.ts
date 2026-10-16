import type {VehicleId} from '@/constants/vehicles';
import type {DocId} from '@/constants/documents';
import type {DriverDocId} from '@/constants/driverDocuments';
import type {NavigatorScreenParams} from '@react-navigation/native';


export type RootStackParamList = {
  Splash: undefined;
  SessionCheck: undefined;
  NoInternet: undefined;
  Maintenance: undefined;
  UpdateRequired: undefined;
  ResumeTrip: undefined;
  RiderLogin: undefined;
  OtpVerification: {phone?: string} | undefined;
  BecomeRider: undefined;
  PersonalDetails: {fromReview?: boolean} | undefined;
  VehicleType: undefined;
  VehicleDetails: {vehicle?: VehicleId; fromReview?: boolean} | undefined;
  DocumentChecklist: undefined;
  UploadDocument: {docId: DocId};
  PayoutIntro: undefined;
  ReviewSubmit: undefined;
  VerificationPending: undefined;
  VerificationRejected: undefined;
  DriverIntro: undefined;
  DriverPersonal: {fromReview?: boolean} | undefined;
  DriverExperience: {fromReview?: boolean} | undefined;
  DriverAvailability: undefined;
  DriverDocuments: undefined;
  DriverUploadDocument: {docId: DriverDocId};
  DriverPayout: undefined;
  DriverReview: undefined;
  DriverVerificationPending: undefined;
  DriverVerificationRejected: undefined;
  Home: NavigatorScreenParams<MainTabParamList> | undefined;
  Alerts: undefined;
  PayoutHistory: undefined;
  EarningsActivity: undefined;
  PayoutDetail: {payoutId?: string} | undefined;
  WeeklyPlan: undefined; 
};

export type MainTabParamList = {
  HomeTab: undefined;
  Trips: undefined;
  Earnings: undefined;
  Profile: undefined;
};