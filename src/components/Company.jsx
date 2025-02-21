const Company = ({
  company,
  toggleImportance,
  showCompanyDetails,
  // removeCompany,
}) => {
  const star = company.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  const applied = company.applied ? "applied" : "";
  return (
    <li className="card" id={applied}>
      <span onClick={() => showCompanyDetails(company)}>
        {company.name} <span>{company.location}</span>
      </span>
      <i
        className={star}
        style={{ color: "#FFD43B" }}
        onClick={() => toggleImportance(company.id)}
      ></i>
      {/* <span>{company.applied}</span> */}
      {/* <button onClick={() => removeCompany(company.id)}>Delete</button> */}
    </li>
  );
};

export default Company;
