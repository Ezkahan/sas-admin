import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import Button from "../Button/Button";
import { useEffect } from "react";

type DeleteType = {
  isOpen: boolean;
  toggle: any;
  handleDelete: (e: React.FormEvent<HTMLFormElement>, id?: number) => void;
};

const DeleteModal: React.FC<DeleteType> = ({
  isOpen,
  toggle,
  handleDelete,
}) => {
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // handle enter key pressed
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal isOpen={isOpen} close={toggle}>
      <form onSubmit={handleDelete}>
        <h1 className="text-xl text-center font-montserrat-bold py-3">
          {t("common:confirm_delete")}
        </h1>

        <div className="flex items-center justify-center gap-5 p-2">
          <Button bg="danger" type="submit">
            <p> {t("common:yes")} </p>
          </Button>

          <Button onClick={toggle}>
            <p> {t("common:no")} </p>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
