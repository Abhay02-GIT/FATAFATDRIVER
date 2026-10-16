import {useSyncExternalStore} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalizedStrings from 'react-native-localization';
import {en} from './en';
import {hi} from './hi';

export type Language = 'en' | 'hi';

const STORAGE_KEY = 'language';

// English is first, so it is the fallback. Until the user picks a language,
// the library uses the phone's language (Hindi phones get Hindi).
export const strings = new LocalizedStrings({en, hi});

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function applyLanguage(language: string) {
  strings.setLanguage(language);
  listeners.forEach(l => l());
}

// Call this from the language picker (e.g. the settings screen).
export function setLanguage(language: Language) {
  applyLanguage(language);
  AsyncStorage.setItem(STORAGE_KEY, language).catch(() => {});
}



// Restores the language the user picked last time.
export async function loadLanguage() {
   try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyLanguage(saved);
    }
  } catch {
    // storage not available: keep the phone's language
  }
}

export function useLanguage() {
  return useSyncExternalStore(subscribe, () => strings.getLanguage() as Language);
}

// Re-renders the component when the language changes.
export function useStrings() {
  useLanguage();
  return strings;
}
