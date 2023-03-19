// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./translations/fr.js";
import en from "./translations/en.js";
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      fr: {translation: fr}
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });


export default i18n;
