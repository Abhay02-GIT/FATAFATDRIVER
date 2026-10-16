import {useSyncExternalStore} from 'react';
import type {DocId} from '@/constants/documents';

type UploadState = Record<DocId, boolean>;

// Profile photo is already done in step 1 (matches the design).
// TODO: replace this tiny store with your real state / API data.
let state: UploadState = {
  licence: false,
  rc: false,
  insurance: false,
  profile: false,
  vehiclePhoto: false,
  police: false,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markUploaded(id: DocId) {
  state = {...state, [id]: true};
  listeners.forEach(l => l());
}

export function useDocuments() {
  return useSyncExternalStore(subscribe, () => state);
}