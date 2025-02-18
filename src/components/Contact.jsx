const Contact = ({
  contact,
  toggleImportance,
  showContactDetails,
  // removeContact,
}) => {
  const star = contact.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <li>
      <span onClick={() => showContactDetails(contact)}>
        {contact.firstName} {contact.lastName} <span>{contact.jobTitle}</span>
      </span>
      <i
        className={star}
        style={{ color: "#FFD43B" }}
        onClick={() => toggleImportance(contact.id)}
      ></i>
      {/* <button onClick={() => removeContact(contact.id)}>Delete</button> */}
    </li>
  );
};

export default Contact;
