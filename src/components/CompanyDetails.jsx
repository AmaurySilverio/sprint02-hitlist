import { useEffect, useRef } from "react";

const CompanyDetails = ({
  openCompanyDetailsModal,
  closeCompanyDetailsModal,
  company,
  toggleImportance,
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
      ref={ref}
      onCancel={closeCompanyDetailsModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeCompanyDetailsModal();
        }
      }}
    >
      <div>
        <h2>{company.name}</h2>
        <h4>{company.location}</h4>
        <h3>{company.position}</h3>
        <p>{company.description}</p>
        <i
          className={star}
          style={{ color: "#FFD43B" }}
          onClick={() => toggleImportance(company.id)}
        ></i>
        <button autoFocus onClick={closeCompanyDetailsModal}>
          Close
        </button>
        <button onClick={() => removeCompany(company.id)}>Delete</button>
      </div>
    </dialog>
  );
};

export default CompanyDetails;
