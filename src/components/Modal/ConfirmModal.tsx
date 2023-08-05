import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import Button from "../Button/Button";

type DeleteType = {
  isOpen: boolean;
  toggle: any;
  handleConfirm: (e: React.FormEvent<HTMLFormElement>, id?: number) => void;
};

const ConfirmModal: React.FC<DeleteType> = ({
  isOpen,
  toggle,
  handleConfirm,
}) => {
  const { t } = useTranslation(["common"]);

  return (
    <Modal isOpen={isOpen} close={toggle}>
      <form onSubmit={handleConfirm}>
        <h1 className="text-xl text-center font-montserrat-bold py-3">
          {t("common:confirm_activation")}
        </h1>

        <div className="flex items-center justify-center gap-5 p-2">
          <Button bg="warning" type="submit">
            <p> {t("common:yes")} </p>
          </Button>

          <Button bg="secondary" type="button" onClick={toggle}>
            <p> {t("common:no")} </p>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmModal;
