import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

let defaultLocale = localStorage.getItem("sas_locale");

if (defaultLocale === null) {
  localStorage.setItem("sas_locale", "tm");
  defaultLocale = localStorage.getItem("sas_locale");
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    lng: defaultLocale ?? "tm",
    supportedLngs: ["tm", "ru"],
    fallbackLng: "tm",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
