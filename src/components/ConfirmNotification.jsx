import { useEffect, useRef } from "react";

const ConfirmNotification = ({
  openConfirmationModal,
  closeConfirmationModal,
  confirmRemove,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openConfirmationModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openConfirmationModal]);

  return (
    <dialog ref={ref} onCancel={closeConfirmationModal}>
      <p>Are you sure you want to delete?</p>
      <button autoFocus onClick={closeConfirmationModal}>
        Cancel
      </button>
      <button onClick={confirmRemove}>Yes</button>
    </dialog>
  );
};
export default ConfirmNotification;
