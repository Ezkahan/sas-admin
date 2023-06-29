import { AnimatePresence, motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { IModal } from "../../common/interfaces/IModal";

const Modal: React.FC<IModal> = ({ isOpen, children, close }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            onClick={() => close()}
            className="bg-slate-900 bg-opacity-50 z-50 fixed w-screen h-screen top-0 left-0"
          ></div>

          <ReactTooltip className="font-montserrat-bold" />

          <section className="flex items-center justify-center fixed w-screen h-screen top-0 left-0 z-50 font-montserrat-medium">
            <motion.main
              initial={{ translateY: "-100%", opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-max z-50 rounded-xl overflow-x-hidden"
            >
              <div className="bg-white p-3">{children}</div>
            </motion.main>
          </section>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
