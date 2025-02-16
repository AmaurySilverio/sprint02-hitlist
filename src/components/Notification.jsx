import { useEffect, useRef } from "react";

const Notification = ({ message, openModal, closeModal }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <p>{message}</p>
      <button autoFocus onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
};
export default Notification;
