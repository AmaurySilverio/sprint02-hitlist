import { useEffect, useRef } from "react";
import Button from "./Button";

const CompanyDetails = ({
  openCompanyDetailsModal,
  closeCompanyDetailsModal,
  company,
  toggleImportance,
  toggleApplied,
  removeCompany,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyDetailsModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openCompanyDetailsModal]);
  const star = company.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <dialog
      className="company-dialog"
      ref={ref}
      onCancel={closeCompanyDetailsModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeCompanyDetailsModal();
        }
      }}
    >
      <div className="company-details-wrapper">
        <div className="company-details-top-page">
          <div className="company-details-content">
            <h2>{company.name}</h2>
            <p>{company.location}</p>
            <h3>{company.position}</h3>
            <p className="job-description">{company.description}</p>
          </div>
          <div className="company-details-toggles">
            <a
              href={company.link}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="icon-border"
            >
              <i className="fa-solid fa-link" style={{ color: "#7d7d7d" }}></i>
            </a>
            <i
              className={`icon-border ${star}`}
              style={{ color: "#FFD43B" }}
              onClick={() => toggleImportance(company.id)}
            ></i>
            <Button
              className={company.applied ? "applied-btn" : ""}
              onClick={() => toggleApplied(company.id)}
            >
              {company.applied ? "Applied!" : "Applied?"}
            </Button>
          </div>
        </div>
        <div className="company-details-buttons">
          <Button onClick={closeCompanyDetailsModal}>Close</Button>
          <Button
            onClick={() => removeCompany(company.id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default CompanyDetails;
