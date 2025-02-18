import { useEffect, useRef } from "react";

const ContactForm = ({
  onSubmit,
  onFirstNameInputChange,
  firstNameInputValue,
  onLastNameInputChange,
  lastNameInputValue,
  onJobTitleInputChange,
  jobTitleInputValue,
  onCompanyInputChange,
  companyInputValue,
  onLocationInputChange,
  locationInputValue,
  onEmailInputChange,
  emailInputValue,
  onPhoneInputChange,
  phoneInputValue,
  onChatInputChange,
  chatInputValue,
  onLinkedInInputChange,
  linkedInInputValue,
  onTwitterInputChange,
  twitterInputValue,
  onGithubInputChange,
  githubInputValue,
  onNotesInputChange,
  notesInputValue,
  priority,
  onRadioChange,
  openContactFormModal,
  closeContactFormModal,
}) => {
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 10);
  const ref = useRef();

  useEffect(() => {
    if (openContactFormModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openContactFormModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeContactFormModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeContactFormModal();
        }
      }}
    >
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                id="first-name"
                placeholder="Amaury"
                value={firstNameInputValue}
                onChange={onFirstNameInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                placeholder="Silverio"
                value={lastNameInputValue}
                onChange={onLastNameInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="job-title">Job Title:</label>
              <input
                type="text"
                id="job-title"
                placeholder="Software Engineer II"
                value={jobTitleInputValue}
                onChange={onJobTitleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                placeholder="Google"
                value={companyInputValue}
                onChange={onCompanyInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                placeholder="Philadelphia, PA"
                value={locationInputValue}
                onChange={onLocationInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="Amaury@google.com"
                value={emailInputValue}
                onChange={onEmailInputChange}
              />
            </div>
            <div>
              <label htmlFor="phone">
                Phone:<p>Format: 978-456-7890</p>
              </label>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                minLength="12"
                maxLength="12"
                placeholder="978-456-7890"
                value={phoneInputValue}
                onChange={onPhoneInputChange}
              />
            </div>
            {/* <div>
              <label htmlFor="chat">Have you had a coffee chat with this person yet? If so, When?:</label>
              <input
                    type="date"
                    id="chat"
                    value={chatInputValue}
                    // defaultValue={dateTimeLocalNow}
                    onChange={onChatInputChange}
                  />
            </div> */}
            <div>
              <label htmlFor="linkedIn">LinkedIn:</label>
              <input
                type="text"
                id="linkedIn"
                placeholder="https://www.linkedin.com/in/amaury-silverio/"
                value={linkedInInputValue}
                onChange={onLinkedInInputChange}
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter:</label>
              <input
                type="text"
                id="twitter"
                placeholder="https://x.com/AmauryCodes"
                value={twitterInputValue}
                onChange={onTwitterInputChange}
              />
            </div>
            <div>
              <label htmlFor="github">Github:</label>
              <input
                type="text"
                id="github"
                placeholder="https://github.com/AmaurySilverio"
                value={githubInputValue}
                onChange={onGithubInputChange}
              />
            </div>
            <div>
              <label htmlFor="notes">Notes about Contact:</label>
              <textarea
                // type="text"
                id="notes"
                placeholder="I met Amaury at RenderATL. He works for Google as a Software Engineer II on their emoji team. We had a great conversation about about AI and bike riding. He is very open to chat."
                value={notesInputValue}
                onChange={onNotesInputChange}
                rows="4"
                cols="40"
              />
            </div>
            <div>
              <label htmlFor="contact-priority">
                Is this Contact a top priority?
              </label>
              <input
                type="radio"
                id="yes-radio"
                value="yes"
                onChange={onRadioChange}
                checked={priority === "yes"}
              />
              <label htmlFor="yes-radio">Yes</label>
              <input
                type="radio"
                id="no-radio"
                value="no"
                onChange={onRadioChange}
                checked={priority === "no"}
              />
              <label htmlFor="no-radio">No</label>
            </div>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <button autoFocus onClick={closeContactFormModal}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default ContactForm;
