const CompanyForm = ({
  onSubmit,
  onCompanyInputChange,
  companyInputValue,
  onLocationInputChange,
  locationInputValue,
  onRadioChange,
  priority,
}) => {
  return (
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
  );
};

export default CompanyForm;
