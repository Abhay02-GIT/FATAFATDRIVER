import {useSyncExternalStore} from 'react';
import type {DriverDocId} from '@/constants/driverDocuments';

type UploadState = Record<DriverDocId, boolean>;

// Profile photo starts as uploaded, like the checklist design.
// TODO: replace this tiny store with your real state / API data.
let state: UploadState = {
  licence: false,
  aadhar: false,
  profile: false,
  address: false,
  police: false,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markDriverDocUploaded(id: DriverDocId) {
  state = {...state, [id]: true};
  listeners.forEach(l => l());
}

export function useDriverDocuments() {
  return useSyncExternalStore(subscribe, () => state);
}