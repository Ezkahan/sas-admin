import i18n from "i18next";

const changeLocale = (locale: string) => {
  // set new locale
  localStorage.setItem("sas_locale", locale);

  // get default locale
  const defaultLocale = localStorage.getItem("sas_locale") ?? "tm";

  // change locale
  i18n.changeLanguage(defaultLocale);
};

export default changeLocale;
