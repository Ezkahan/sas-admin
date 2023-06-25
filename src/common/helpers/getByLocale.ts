import i18n from "i18next";
import { ITranslatable } from "../interfaces/ITranslatable";

type LocaleType = keyof ITranslatable;
const getByLocale = (text: ITranslatable) => {
  const lang: LocaleType = i18n.language as LocaleType;
  return text[lang];
};

export default getByLocale;
