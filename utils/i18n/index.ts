import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import fr from './locales/fr';

const locales = getLocales();
const localeLocalDevice = locales?.[0]?.languageCode ?? 'fr';

const initializeI18n = async () => {
  const localeAsyncStorageLanguage = await AsyncStorage.getItem('language');
  const locale = localeAsyncStorageLanguage || localeLocalDevice;

  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      lng: locale,
      fallbackLng: 'fr',
      debug: __DEV__,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
};

initializeI18n();