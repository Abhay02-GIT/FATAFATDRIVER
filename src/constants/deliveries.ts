// TODO: everything in this file is sample data. Load it from your API.

export type PackageSize = 'small' | 'medium' | 'large';

export type DeliveryPlace = {
  address: string;
  latitude: number;
  longitude: number;
};

export type DeliveryRequest = {
  id: string;
  orderNo: string;
  packageCode: string;
  packageSize: PackageSize;
  weightKg: number;
  fare: number;
  distanceKm: number;
  durationMin: number;
  pickup: DeliveryPlace;
  dropoff: DeliveryPlace;
  recipient: {name: string; phone: string};
  codAmount?: number; // missing when the parcel is prepaid
  // Seconds the driver has to accept. The API should send an absolute expiry time instead.
  acceptSeconds: number;
};

export const DELIVERY_REQUESTS: DeliveryRequest[] = [
  {
    id: 'd1',
    orderNo: '882-9A',
    packageCode: 'PKG-8492-BX',
    packageSize: 'medium',
    weightKg: 4.2,
    fare: 180,
    distanceKm: 4.5,
    durationMin: 12,
    pickup: {
      address: '1024 Logistics Way, Loading Bay C',
      latitude: 28.6469,
      longitude: 77.3152,
    },
    dropoff: {
      address: '885 Riverside Dr, Suite 400',
      latitude: 28.6412,
      longitude: 77.3361,
    },
    recipient: {name: 'Smriti', phone: '+91 98765 43210'},
    codAmount: 450,
    acceptSeconds: 30,
  },
];

export function getDeliveryRequest(id: string) {
  return DELIVERY_REQUESTS.find(d => d.id === id) ?? DELIVERY_REQUESTS[0];
}

// Distance and time left while driving to the drop.
// TODO: take these from live location updates.
export const DELIVERY_PROGRESS = {distanceKm: 2.3, etaMin: 8};

// ---------- Multiple drop-offs ----------
export type DropStatus = 'pending' | 'delivered';

export type DropStop = {
  id: string;
  name: string;
  place: string;
  latitude: number;
  longitude: number;
  packageSize: PackageSize;
  weightKg: number;
  note: string;
  extraMin?: number; // added to the trip by this stop
  status: DropStatus;
};

export type DropTrip = {id: string; stops: DropStop[]};

export const DROP_TRIPS: DropTrip[] = [
  {
    id: 't1',
    stops: [
      {
        id: 's1',
        name: 'Smriti',
        place: 'ISBT Kashmere Gate',
        latitude: 28.6675,
        longitude: 77.2282,
        packageSize: 'medium',
        weightKg: 2.4,
        note: 'Pull up near the blue canopy. Passenger has small luggage.',
        status: 'pending',
      },
      {
        id: 's2',
        name: 'Rajesh V.',
        place: 'India Gate',
        latitude: 28.6129,
        longitude: 77.2295,
        packageSize: 'small',
        weightKg: 1.8,
        note: 'Meet at the lobby entrance.',
        extraMin: 8,
        status: 'pending',
      },
      {
        id: 's3',
        name: 'Priya S.',
        place: 'Red Fort',
        latitude: 28.6562,
        longitude: 77.241,
        packageSize: 'large',
        weightKg: 3.1,
        note: 'Wait near the ticket counter.',
        extraMin: 14,
        status: 'pending',
      },
    ],
  },
];

export function getDropTrip(id: string) {
  return DROP_TRIPS.find(t => t.id === id) ?? DROP_TRIPS[0];
}

// ---------- Carpool ----------
export type RiderStatus = 'upcoming' | 'arrived' | 'boarded';

export type CarpoolRider = {
  id: string;
  name: string;
  pickup: string;
  fare: number;
  photo?: string; // drawable name for the sample; a URL from the API
  extraSeats?: number; // riders travelling with this one
  status: RiderStatus;
};

export type CarpoolTrip = {
  id: string;
  soloFare: number; // what the trip would cost without sharing
  extraMin: number;
  distanceKm: number;
  highDemand: boolean;
  riders: CarpoolRider[];
  // Seconds the driver has to accept. The API should send an absolute expiry time instead.
  acceptSeconds: number;
};

export const CARPOOL_TRIPS: CarpoolTrip[] = [
  {
    id: 'c1',
    soloFare: 24,
    extraMin: 12,
    distanceKm: 8.4,
    highDemand: true,
    riders: [
      {id: 'r1', name: 'Sarah', pickup: '123 Main St.', fare: 6.5, photo: 'carpool_rider_1', status: 'boarded'},
      {id: 'r2', name: 'Alex', pickup: '45 Oak Ave.', fare: 7, photo: 'carpool_rider_2', status: 'arrived'},
      {id: 'r3', name: 'Maya', pickup: '88 River Rd.', fare: 5, extraSeats: 1, status: 'upcoming'},
    ],
    acceptSeconds: 10,
  },
];

export function getCarpoolTrip(id: string) {
  return CARPOOL_TRIPS.find(t => t.id === id) ?? CARPOOL_TRIPS[0];
}

export const CANCEL_REASONS = ['noShow', 'unsafePickup', 'luggage', 'riderRequested'] as const;
export type CancelReason = (typeof CANCEL_REASONS)[number];

// ---------- Fare match ----------
export type FareMatch = {
  id: string;
  originalFare: number;
  offer: number; // the competitor price the rider asks us to match
};

export const FARE_MATCHES: FareMatch[] = [{id: 'f1', originalFare: 24.5, offer: 19.5}];

export function getFareMatch(id: string) {
  return FARE_MATCHES.find(f => f.id === id) ?? FARE_MATCHES[0];
}
