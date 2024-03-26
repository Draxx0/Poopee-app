import { getLocales } from 'expo-localization';

import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import fr from './locales/fr';

const locales = getLocales();
const locale = locales?.[0]?.languageCode ?? 'en';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: locale,
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}
