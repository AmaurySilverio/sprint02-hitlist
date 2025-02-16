import { useEffect, useRef } from "react";

const CompanyDetails = ({
  openCompanyDetailsModal,
  closeCompanyDetailsModal,
  company,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyDetailsModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openCompanyDetailsModal]);

  return (
    <dialog ref={ref} onCancel={closeCompanyDetailsModal}>
      <h2>{company.name}</h2>
      {company.priority}
      <h4>{company.location}</h4>
      <button autoFocus onClick={closeCompanyDetailsModal}>
        Close
      </button>
    </dialog>
  );
};

export default CompanyDetails;
