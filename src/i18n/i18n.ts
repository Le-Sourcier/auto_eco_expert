import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Cookies from "js-cookie";

import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import esTranslation from "./locales/es.json";
import deTranslation from "./locales/de.json";

const LANGUAGE_COOKIE = "i18next";
const COOKIE_EXPIRATION_DAYS = 365;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation },
      de: { translation: deTranslation },
    },
    fallbackLng: "fr",
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      lookupCookie: LANGUAGE_COOKIE,
      lookupLocalStorage: LANGUAGE_COOKIE,
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// ✅ Mémoriser le changement de langue dans cookie + localStorage
i18n.on("languageChanged", (lng) => {
  Cookies.set(LANGUAGE_COOKIE, lng, {
    expires: COOKIE_EXPIRATION_DAYS,
    path: "/",
    sameSite: "strict",
  });
  localStorage.setItem(LANGUAGE_COOKIE, lng);
});

export default i18n;
