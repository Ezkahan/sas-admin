import { useState } from "react";
import TM_FLAG from "../../assets/icons/locales/tm.png";
import EN_FLAG from "../../assets/icons/locales/en.jpg";
import changeLocale from "../../common/helpers/changeLocale";

const Locale = () => {
  const [select, setSelect] = useState(false);
  const locale = localStorage.getItem("sas_locale") ?? "tm";
  const locales = {
    tm: TM_FLAG,
    en: EN_FLAG,
  };

  const localeChange = (locale: any) => {
    changeLocale(locale);
    setSelect(!select);
  };

  return (
    <aside className="flex items-center">
      <div
        className="uppercase font-bold w-8"
        onClick={() => setSelect(!select)}
      >
        {locale === "tm" ? (
          <img className="w-8" src={locales.tm} alt={locale} />
        ) : (
          <img className="w-8" src={locales.en} alt={locale} />
        )}
      </div>
      {select && (
        <main className="bg-white bg-opacity-10 absolute bottom-16 left-20 flex items-center gap-2 p-2 rounded-xl shadow">
          <div onClick={() => localeChange("tm")} className="cursor-pointer">
            <img className="w-10 p-1 mx-1" src={TM_FLAG} alt="Turkmen" />
          </div>

          <div onClick={() => localeChange("en")} className="cursor-pointer">
            <img className="w-10 p-1 mx-1" src={EN_FLAG} alt="English" />
          </div>
        </main>
      )}
    </aside>
  );
};

export default Locale;
