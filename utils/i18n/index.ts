import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fr from './locales/fr';

const locales = getLocales();
const deviceLocalLanguage = locales?.[0]?.languageCode ?? 'fr';

const initializeI18n = async () => {
  const localeAsyncStorageLanguage = await AsyncStorage.getItem('language');

  if (!localeAsyncStorageLanguage) {
    await AsyncStorage.setItem('language', deviceLocalLanguage);
  }

  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      lng: localeAsyncStorageLanguage ?? deviceLocalLanguage,
      fallbackLng: 'fr',
      debug: __DEV__,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
};
initializeI18n();
