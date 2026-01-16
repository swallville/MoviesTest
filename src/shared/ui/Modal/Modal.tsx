import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onModalClose = () => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    onClose();
  };

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return createPortal(
    <section
      data-testid="modal-overlay"
      className="fixed top-0 w-screen h-screen z-1000 bg-[rgba(0,0,0,0.5)]"
    >
      <dialog
        ref={dialogRef}
        className="flex justify-start items-start pt-15 pb-5 md:pb-10 px-5 md:px-10 m-10 relative w-[80%] md:w-[95%] max-w-125 md:max-w-full h-auto rounded-xl border-none bg-white font-[Roboto] text-2xl font-medium leading-6 text-[#757575]"
        onClose={onModalClose}
      >
        {children}
        <button
          type="button"
          className="flex justify-center items-center absolute top-4 right-4 rounded-[50%] w-8 md:w-10 h-8 md:h-10 bg-[rgba(0,0,0,0.7)] z-1100 text-2xl font-bold text-white hover:text-[#DEDEDE] focus:outline-none cursor-pointer"
          onClick={onModalClose}
        >
          X
        </button>
      </dialog>
    </section>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
