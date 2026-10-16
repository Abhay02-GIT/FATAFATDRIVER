import type {DocId} from '@/constants/documents';
import type {DriverDocId} from '@/constants/driverDocuments';
import type {
  CarType,
  Colour,
  DayPart,
  Experience,
  Gender,
  License,
  Transmission,
} from '@/constants/options';
import type {VehicleId} from '@/constants/vehicles';

type DocumentText = {
  title: string;
  subtitle?: string;
  sides: string[]; // one entry per photo (1 or 2)
  numberLabel?: string;
};

type DriverDocumentText = DocumentText & {uploadTitle: string};

const documents: Record<DocId, DocumentText> = {
  licence: {
    title: 'Driving Licence',
    sides: ['Scan Front of Licence', 'Upload Back of Licence'],
    numberLabel: 'Document Number',
  },
  rc: {
    title: 'Registration (RC)',
    sides: ['Scan Front of RC', 'Upload Back of RC'],
    numberLabel: 'Document Number',
  },
  insurance: {
    title: 'Vehicle Insurance',
    sides: ['Upload Insurance Paper'],
    numberLabel: 'Policy Number',
  },
  profile: {
    title: 'Profile Photo',
    sides: ['Upload Profile Photo'],
  },
  vehiclePhoto: {
    title: 'Vehicle Photo',
    subtitle: 'Front & Back clearly visible',
    sides: ['Upload Front of Vehicle', 'Upload Back of Vehicle'],
  },
  police: {
    title: 'Police Verification',
    sides: ['Upload Police Certificate'],
    numberLabel: 'Certificate Number',
  },
};

const driverDocuments: Record<DriverDocId, DriverDocumentText> = {
  licence: {
    title: 'Driving Licence',
    uploadTitle: 'Upload Driving Licence',
    sides: ['Scan Front of Licence', 'Upload Back of Licence'],
    numberLabel: 'Document Number',
  },
  aadhar: {
    title: 'Aadhar Card / ID Proof',
    uploadTitle: 'Upload Aadhar Card',
    sides: ['Scan Front of Aadhar Card', 'Upload Back of Aadhar Card'],
    numberLabel: 'Aadhar Number',
  },
  profile: {
    title: 'Profile Photo',
    uploadTitle: 'Upload Profile Photo',
    sides: ['Take or Upload Your Photo'],
  },
  address: {
    title: 'Address Proof',
    uploadTitle: 'Upload Address Proof',
    sides: ['Upload Address Proof'],
    numberLabel: 'Document Number',
  },
  police: {
    title: 'Police Verification Certificate',
    uploadTitle: 'Upload Police Certificate',
    sides: ['Upload Police Certificate'],
    numberLabel: 'Certificate Number',
  },
};

const vehicles: Record<VehicleId, string> = {
  cab: 'Cab',
  auto: 'Auto',
  bike: 'Bike',
  scooty: 'Pink Scooty',
  carpool: 'Carpool',
  parcel: 'Parcel',
  driver: 'Hire a Driver',
};

const genders: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  undisclosed: 'Prefer not to say',
};

const carTypes: Record<CarType, string> = {
  sedan: 'Sedan',
  hatchback: 'Hatchback',
  suv: 'SUV',
  minivan: 'Minivan',
  luxury: 'Luxury',
};

const colours: Record<Colour, string> = {
  white: 'White',
  black: 'Black',
  silver: 'Silver',
  grey: 'Grey',
  red: 'Red',
  blue: 'Blue',
  yellow: 'Yellow',
  green: 'Green',
  orange: 'Orange',
  other: 'Other',
};

const experience: Record<Experience, string> = {
  lessThan1: 'Less than 1 yr',
  '1to3': '1-3 yrs',
  '3to5': '3-5 yrs',
  '5to10': '5-10 yrs',
  '10plus': '10+ yrs',
};

const licenses: Record<License, string> = {
  lmv: 'LMV (Light Motor Vehicle)',
  hmv: 'HMV (Heavy Motor Vehicle)',
  lmvHmv: 'LMV + HMV',
  taxiBadge: 'Commercial (Taxi) Badge',
};

const transmissions: Record<Transmission, string> = {
  manual: 'Manual',
  automatic: 'Automatic',
};

const dayParts: Record<DayPart, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
};

export const en = {
  common: {
    continue: 'Continue',
    registration: 'Registration',
    edit: 'Edit',
    done: 'Done',
    required: 'Required',
    optional: 'Optional',
    uploaded: 'Uploaded',
    notUploaded: 'Not Uploaded',
    camera: 'Camera',
    gallery: 'Gallery',
    contactSupport: 'Contact Support',
    checkStatus: 'Check Status',
    startRegistration: 'Start Registration',
    submitDocuments: 'Submit Documents',
    stepOf: 'Step {0} of {1}',
    commission: '{0}% Commission',
    fullLegalName: 'Full Legal Name',
    fullLegalNamePlaceholder: 'As it appears on your license',
    emailAddress: 'Email Address',
    phonePlaceholder: '10-digit mobile number',
    expiryDate: 'Expiry Date',
    numberPlaceholder: 'Enter exact number from card',
    photoTipTitle: 'Clear photos are required',
    photoTipText:
      'Ensure all corners are visible, text is legible, and there is no glare. Place on a dark background.',
    documentsIntro:
      'Upload the following documents to activate your profile. Verification usually takes 2-4 hours.',
    payoutTitle: 'Get paid every Tuesday',
    payoutSubtitle:
      "Link your bank account to receive your weekly earnings directly. It's fast and easy.",
    securityTitle: 'Bank-level Security',
    securityText: 'Your data is encrypted and securely stored.',
    verifiedTitle: 'Verified Instantly',
    verifiedText: 'Most major banks connect in seconds.',
    editableTitle: 'Fully Editable',
    editableText: 'Update your payout details at any time.',
    addBankAccount: 'Add Bank Account',
    doThisLater: 'Do this later',
    fullName: 'Full Name',
    phone: 'Phone',
    email: 'Email',
    bankName: 'Bank Name',
    notAddedYet: 'Not added yet',
    noneUploaded: 'None uploaded yet',
    reviewSubmit: 'Review & Submit',
    pendingTitle: 'Verification Pending',
    pendingSubtitle:
      "We're reviewing your documents. This usually takes 24-48 hours. We'll notify you once you're ready to go online.",
    submitted: 'Submitted',
    reviewing: 'Reviewing',
    approval: 'Approval',
    approved: 'Approved',
    underReview: 'Under Review',
    cleared: 'Cleared',
    rejected: 'REJECTED',
    rejectedTitle: 'Verification Rejected',
    rejectedSubtitle:
      "We couldn't verify some of your documents. Please review the issues below and try again.",
    driversLicense: "Driver's License",
    aadharCard: 'Aadhar Card',
    backgroundCheck: 'Background Check',
    blurryReason:
      'The photo provided is too blurry to read the expiration date clearly.',
    blurryTip: 'Ensure good lighting and lay the card flat.',
  },
  sessionCheck: {
    message: 'Checking your session...',
  },
  noInternet: {
    title: 'No Internet Connection',
    description: 'Please check your Wi-Fi or mobile data and try again.',
    retry: 'Retry Connection',
  },
  maintenance: {
    title: 'Under Maintenance',
    description:
      "We're making improvements to serve you\nbetter. Please check back in a few minutes.",
    estimate: 'Estimated: ~{0} minutes',
  },
  updateRequired: {
    title: 'Update Required',
    description:
      'A new version is available with important\nsecurity fixes and performance\nimprovements.',
    available: 'v{0} now available',
    updateNow: 'Update Now',
  },
  resumeTrip: {
    title: 'Resuming Your Trip',
    description: 'You have an active booking. Reconnecting you\nnow...',
    progress: '{0}% reconnected',
    activeBooking: 'Active Booking',
    live: 'LIVE',
    connecting: 'Connecting to last known location...',
  },
  login: {
    title: 'Login as Rider',
    subtitle: 'Enter your registered mobile number to\ncontinue.',
    mobileNumber: 'MOBILE NUMBER',
    invalidNumber: 'Enter a valid 10-digit mobile number',
    support: 'Support',
    terms: 'Terms & Privacy',
    newUser: 'New to Fatafat? ',
    register: 'Register as Rider',
  },
  otp: {
    title: 'Verify Your Number',
    subtitle: 'Enter the 6-digit code sent to {0}',
    notReceived: "Didn't receive the code? ",
    resendIn: 'Resend in {0}',
    resend: 'Resend code',
    verify: 'Verify & Continue',
    safe: 'Your number is safe with us',
  },
  becomeRider: {
    badge: 'FATAFAT PARTNER PROGRAM',
    title: 'Become a Rider',
    subtitle: 'Join the fleet. Earn on your schedule.',
    whyRide: 'WHY RIDE WITH US',
    earningsTitle: 'Top Earnings',
    earningsText: 'Competitive rates,\nbonuses & weekly\npayouts',
    earningsBadge: '₹1k+/day',
    hoursTitle: 'Flexible Hours',
    hoursText: "Drive anytime. You're always in control.",
    safetyTitle: 'Safety Cover',
    safetyText: '24/7 support & comprehensive\ninsurance on every trip',
    activeRiders: 'Active Riders',
    avgRating: 'Avg Rating',
    signupBonus: 'Signup Bonus',
  },
  personalDetails: {
    title: 'Personal Details',
    uploadPhoto: 'Upload Profile Photo',
    photoHint: 'Clear, front-facing image. No sunglasses.',
    choosePhoto: 'Choose Photo',
    identity: 'IDENTITY',
    phoneNumber: 'Phone Number',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    select: 'Select',
    saveContinue: 'Save & Continue',
    invalidPhoneTitle: 'Invalid phone number',
    invalidPhoneMessage: 'Please enter a valid 10-digit phone number.',
  },
  vehicleType: {
    nextStep: 'Vehicle Details next',
    title: 'Select Vehicle Type',
    subtitle:
      'Choose your primary service. This determines your\ncommission rate and trip offers.',
    note: 'Commission rates may vary with surge\nmultipliers based on zone and time. Final rates\nconfirmed in your contract.',
  },
  vehicleDetails: {
    title: 'Vehicle Details',
    standardRide: 'Standard Ride',
    standardRideInfo: '4 Seats • Basic Luggage',
    serviceRide: '{0} Ride',
    selectedService: 'Selected service',
    active: 'Active',
    vehicleInfo: 'VEHICLE INFORMATION',
    vehicleType: 'Vehicle Type',
    selectVehicleType: 'Select Vehicle Type',
    vehicleNumber: 'Vehicle Number',
    vehicleNumberPlaceholder: 'e.g. AB12 CDE',
    vehicleModel: 'Vehicle Model',
    vehicleModelPlaceholder: 'e.g. Prius',
    vehicleColour: 'Vehicle Color',
    selectColour: 'Select Colour',
    registrationYear: 'Registration Year',
    selectYear: 'Select Year',
    save: 'Save Vehicle Details',
  },
  documentChecklist: {
    title: 'Document Checklist',
    uploadedCount: 'Documents Uploaded',
  },
  uploadDocument: {
    preview: 'Preview',
    save: 'Save Document',
  },
  payoutIntro: {
    title: 'Get paid every\nTuesday',
  },
  reviewSubmit: {
    stepOf: 'STEP {0} OF {1}',
    subtitle:
      'Please review your information carefully before submitting your application. This data will be used for your background check.',
    personalInfo: 'Personal Information',
    vehicleDetails: 'Vehicle Details',
    makeModel: 'Make & Model',
    year: 'Year',
    licensePlate: 'License Plate',
    colour: 'Color',
    documents: 'Documents',
    bankDetails: 'Bank Details',
    accountEnding: 'Account Ending In',
    declarations: 'Declarations',
    declareAccurate:
      'I declare that all information provided is accurate and true to the best of my knowledge.',
    agreeTerms:
      'I agree to the {0} and {1}, and consent to a background check.',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    submit: 'Submit for Verification',
  },
  verificationPending: {
    vehicleRegistration: 'Vehicle Registration',
    documentStatus: 'Document Status',
  },
  verificationRejected: {
    expiredReason:
      'The document appears to be expired. The coverage dates must be current.',
    expiredTip: 'Upload your most recent, active policy document.',
    resubmit: 'Re-submit Documents',
  },
  driverIntro: {
    title: 'Become a Driver',
    subtitle:
      'Join Fatafat as a professional driver. Get hired by vehicle owners and earn on your schedule.',
    hoursTitle: 'Flexible Hours',
    hoursText: 'Drive when you want. You are in complete control of your time.',
    earningsTitle: 'Good Earnings',
    earningsText:
      'Get paid every Tuesday directly to your bank account with transparent statements.',
    safetyTitle: 'Safety Support',
    safetyText:
      '24/7 in-app emergency support and comprehensive insurance coverage on every trip.',
  },
  driverPersonal: {
    title: 'Personal Details',
    mobileNumber: 'Mobile Number',
    city: 'Current City',
    cityPlaceholder: 'e.g. New Delhi',
    address: 'Address',
    addressPlaceholder: 'Enter your full address',
  },
  driverExperience: {
    title: 'Driving Experience',
    totalExperience: 'Total Driving Experience',
    selectExperience: 'Select experience',
    licenseType: 'License Type',
    selectLicense: 'Select license type',
    vehicleTypes: 'VEHICLE TYPES YOU CAN DRIVE',
    selected: 'Selected',
    available: 'Available',
    transmission: 'TRANSMISSION PREFERENCES',
  },
  driverAvailability: {
    title: 'Availability & Preferences',
    serviceType: 'SERVICE TYPE PREFERENCE',
    services: {
      hourly: {name: 'Hourly', sub: 'Minimum 2 hrs booking'},
      halfday: {name: 'Half Day', sub: 'Up to 6 hrs duty slot'},
      fullday: {name: 'Full Day', sub: 'Up to 12 hrs duty slot'},
      outstation: {name: 'Outstation', sub: 'Multi-day out of city trips'},
    },
    timings: 'PREFERRED TIMINGS',
    zone: 'PREFERRED OPERATING ZONE',
    region: 'Operating Region',
    regionPlaceholder: 'Enter your operating region',
    note: 'You can update your availability anytime from your profile settings.',
  },
  driverChecklist: {
    title: 'Document Checklist',
    heading: 'Required Documents',
  },
  driverUploadDocument: {
    upload: 'Upload Document',
  },
  driverPayout: {
    title: 'Payout Setup',
  },
  driverReview: {
    title: 'Review Application',
    subtitle:
      'Please review your information carefully before submitting your application.',
    personalDetails: 'PERSONAL DETAILS',
    city: 'City',
    address: 'Address',
    drivingExperience: 'DRIVING EXPERIENCE',
    experience: 'Experience',
    licenseType: 'License Type',
    vehicles: 'Vehicles',
    transmission: 'Transmission',
    documentsSubmitted: 'DOCUMENTS SUBMITTED',
    documents: 'Documents',
    bankDetails: 'BANK DETAILS',
    accountNumber: 'Account Number',
    declarations: 'DECLARATIONS & CONSENT',
    declareAccurate:
      'I declare that all information provided is accurate and authentic to the best of my knowledge.',
    agreeTerms:
      'I agree to the Terms of Service, Privacy Policy, and consent to a secure driver background check.',
    submit: 'Submit Application',
  },
  driverVerificationPending: {
    documentStatus: 'DOCUMENT STATUS',
  },
  driverVerificationRejected: {
    attention: 'ATTENTION REQUIRED ({0})',
    drivingLicense: 'Driving License',
    expiredReason:
      'The document appears to be expired. Please upload a current document.',
    expiredTip: 'Upload your most recent valid Aadhar card.',
    tip: 'Tip: ',
    fixResubmit: 'Fix & Re-submit',
  },
  tabs: {
    HomeTab: 'Home',
    Trips: 'Trips',
    Earnings: 'Earnings',
    Profile: 'Profile',
    Alerts: 'Alerts',
    Account: 'Account',
    comingSoon: '{0} (coming soon)',
  },

    payoutHistory: {
    title: 'Payout History',
    totalTransferred: 'TOTAL TRANSFERRED THIS MONTH',
    recentTransfers: 'Recent Transfers',
    filter: 'Filter',
    loadMore: 'Load More History',
    processing: 'Processing',
    paid: 'Paid',
    failed: 'Failed',
  },
  activity: {
    totalThisWeek: 'Total earnings this week',
    allActivity: 'All Activity',
    trips: 'Trips',
    incentives: 'Incentives',
    adjustments: 'Adjustments',
    today: 'Today',
    yesterday: 'Yesterday, {0}',
    tripId: 'Trip • ID {0}',
    empty: 'No activity to show',
  },
  payoutDetail: {
    title: 'Weekly Payout',
    transferred: 'Transferred',
    grossFares: 'Gross Fares',
    tripsCompleted: '{0} Trips completed',
    tips: 'Tips',
    tipsNote: '100% goes directly to you',
    deductions: 'Deductions & Adjustments',
    platformFee: 'Platform Service Fee',
    commission: '{0}% commission on gross fares',
    surge: 'Surge / Fare-Match',
    surgeNote: 'High demand area bonus',
    transactionDetails: 'Transaction Details',
    status: 'Status',
    settled: 'Settled',
    initiated: 'Initiated',
    utr: 'UTR / Ref Number',
  },

    weeklyPlan: {
    title: 'Weekly Plan',
    planName: 'Max Earnings Plan',
    subtitleBefore: 'Pay a flat fee and keep ',
    subtitleHighlight: '{0}% of every fare',
    subtitleAfter: '.',
    subtitleSecond: 'Stop paying high commissions on long trips.',
    mostPopular: 'MOST POPULAR',
    weeklyPass: 'Weekly Pass',
    perWeek: 'per week',
    keepFares: 'Keep {0}% of all trip fares',
    noSurge: 'Zero hidden surge fees',
    priority: 'Priority dispatch on airport runs',
    calculator: 'Savings Calculator',
    calculatorText:
      'See how much you save based on your weekly trip volume compared to the standard {0}% commission rate.',
    estimatedTrips: 'Estimated Weekly Trips',
    standard: 'Standard ({0}% fee)',
    weeklyPassCost: 'Weekly Pass ({0} + {1}%)',
    yourSavings: 'Your Weekly Savings',
    terms:
      'Subscription auto-renews weekly. Cancel anytime before the next billing cycle. Tolls and taxes remain 100% yours. ',
    readTerms: 'Read full terms.',
    subscribe: 'Subscribe Now',
  },

  earnings: {
    greeting: {
      morning: 'Good morning 👋',
      afternoon: 'Good afternoon 👋',
      evening: 'Good evening 👋',
    },

   appTitle: 'Fatafat {0}',
    thisWeek: 'THIS WEEK',
    vsLastWeek: '{0} vs last week',
    dailyEarnings: 'Daily Earnings',
    details: 'Details',
    nextPayout: 'NEXT PAYOUT',
    tomorrow: 'Tomorrow',
    incentives: 'Incentives',
    incentiveText: '{0} trips to {1} bonus',
    active: 'ACTIVE',
    subscription: 'Subscription',
    subscriptionText: 'Active till {0}',
    days: {mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun'},
    dayNames: {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    },
  },

  home: {
    online: "You're Online",
    offline: "You're Offline",
    lookingForTrips: 'Looking for trip requests near you...',
    tapToStart: 'Tap to start receiving trip requests',
    goOnline: 'GO ONLINE',
    goOffline: 'GO OFFLINE',
    todaysEarnings: "TODAY'S EARNINGS",
    trips: 'TRIPS',
  },
  onlineHome: {
    driver: 'Driver',
    rider: 'Rider',
    partner: 'Partner',
    badge: 'ONLINE',
    waiting: 'Waiting for ride requests...',
    bonusQuest: 'BONUS QUEST',
    questTitle: 'Complete {0} more trips → earn {1} bonus',
    todaysEarnings: "Today's Earnings",
    trips: 'Trips',
    goOffline: 'Go Offline',
  },
  alerts: {
    markAllRead: 'Mark all as read',
    today: 'TODAY',
    bonusTitle: 'New bonus available',
    bonusBody: 'Complete 5 trips for ₹500 bonus',
    paymentTitle: 'Payment received',
    paymentBody: '₹1,240 credited to bank',
    expiringTitle: 'Document expiring',
    expiringBody: 'Your insurance expires in 7 days',
    cancelledTitle: 'Trip cancelled',
    cancelledBody: 'Rider cancelled trip #4521',
    hoursAgo: '{0}h ago',
    daysAgo: '{0}d ago',
  },
  serviceHours: {
    locked: 'Locked',
    title: 'Service Hours Locked',
    subtitle:
      'Your service hours are outside the allowed window. You can go online during your scheduled hours.',
    schedule: 'YOUR SCHEDULE',
    viewSchedule: 'View Schedule',
  },

  documents,
  driverDocuments,
  vehicles,
  genders,
  carTypes,
  colours,
  experience,
  licenses,
  transmissions,
  dayParts,
};
