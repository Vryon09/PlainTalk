import { createPortal } from "react-dom";

const modalStyles = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: `translate(-50%, -50%)`,
  zIndex: 1000,
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, 0.5)",
  zIndex: 1000,
};

function Modal({ children, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div style={overlayStyles}></div>
      <div
        style={modalStyles}
        className="flex flex-col gap-6 rounded-2xl bg-neutral-50 px-4 py-6"
      >
        {children}
        <div className="flex justify-between gap-8">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-neutral-300 px-4 py-2 hover:bg-neutral-400"
          >
            Close
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
              onClose();
            }}
            className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-neutral-50 hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}

export default Modal;
