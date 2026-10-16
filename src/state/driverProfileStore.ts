import {useSyncExternalStore} from 'react';
import type {CarType, Experience, License, Transmission} from '@/constants/options';

export type DriverProfile = {
  photoUri?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  experience?: Experience;
  license?: License;
  vehicles: CarType[];
  transmission: Transmission[];
  bank?: string;
  account?: string;
};

// Starting values match the design. TODO: load the real profile from your API.
let profile: DriverProfile = {
  name: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  experience: '3to5',
  license: 'lmv',
  vehicles: ['sedan', 'suv'],
  transmission: ['manual'],
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setDriverProfile(patch: Partial<DriverProfile>) {
  profile = {...profile, ...patch};
  listeners.forEach(l => l());
}

export function useDriverProfile() {
  return useSyncExternalStore(subscribe, () => profile);
}