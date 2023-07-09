import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import DeliveryCost from "./DeliveryCost";

const Settings = () => {
  const { t } = useTranslation(["setting"]);

  return (
    <>
      <AppLayout>
        <>
          <DeliveryCost />
        </>
      </AppLayout>
    </>
  );
};

export default Settings;
