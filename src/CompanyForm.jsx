import { useEffect, useRef } from "react";

const CompanyForm = ({
  onSubmit,
  onCompanyInputChange,
  companyInputValue,
  onLocationInputChange,
  locationInputValue,
  onPositionInputChange,
  positionInputValue,
  onDescriptionInputChange,
  descriptionInputValue,
  onRadioChange,
  priority,
  openCompanyFormModal,
  closeCompanyFormModal,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyFormModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openCompanyFormModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeCompanyFormModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeCompanyFormModal();
        }
      }}
    >
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label htmlFor="company">Company: </label>
              <input
                type="text"
                id="company"
                placeholder="Audible"
                value={companyInputValue}
                onChange={onCompanyInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="location">Location: </label>
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
              <label htmlFor="position">Position: </label>
              <input
                type="text"
                id="position"
                placeholder="Software Engineer"
                value={positionInputValue}
                onChange={onPositionInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Position Description: </label>
              <textarea
                // type="text"
                id="description"
                // placeholder="Software Engineer"
                value={descriptionInputValue}
                onChange={onDescriptionInputChange}
                rows="4"
                cols="40"
                required
              />
            </div>
            <div>
              <label htmlFor="company-priority">
                Is this Company a top priority?
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
        <button autoFocus onClick={closeCompanyFormModal}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default CompanyForm;
