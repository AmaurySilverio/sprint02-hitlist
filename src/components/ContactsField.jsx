import Contact from "./Contact";
const ContactsField = ({
  contactsToShow,
  toggleImportance,
  removeContact,
  showContactDetails,
}) => {
  return (
    <ul>
      {contactsToShow.length < 1 ? (
        <h3>No Contacts Found</h3>
      ) : (
        contactsToShow.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            toggleImportance={toggleImportance}
            showContactDetails={showContactDetails}
            // removeContact={removeContact}
          />
        ))
      )}
    </ul>
  );
};

export default ContactsField;
