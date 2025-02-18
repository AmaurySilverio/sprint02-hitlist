import { useEffect, useRef } from "react";

const ContactDetails = ({
  openContactDetailsModal,
  closeContactDetailsModal,
  contact,
  toggleImportance,
  removeContact,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openContactDetailsModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openContactDetailsModal]);
  const star = contact.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <dialog
      ref={ref}
      onCancel={closeContactDetailsModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeContactDetailsModal();
        }
      }}
    >
      <div>
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <h4>{contact.jobTitle}</h4>
        <h3>{contact.company}</h3>
        <h3>{contact.location}</h3>
        <h3>{contact.email}</h3>
        <h3>{contact.phone}</h3>
        <h3>{contact.linkedIn}</h3>
        <h3>{contact.twitter}</h3>
        <h3>{contact.github}</h3>
        <p>{contact.notes}</p>
        <i
          className={star}
          style={{ color: "#FFD43B" }}
          onClick={() => toggleImportance(contact.id)}
        ></i>
        <button autoFocus onClick={closeContactDetailsModal}>
          Close
        </button>
        <button onClick={() => removeContact(contact.id)}>Delete</button>
      </div>
    </dialog>
  );
};

export default ContactDetails;
