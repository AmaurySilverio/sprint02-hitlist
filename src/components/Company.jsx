const Company = ({ company, toggleImportance }) => {
  const star = company.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <li>
      {company.name} <span>{company.location}</span>
      <i
        className={star}
        style={{ color: "#FFD43B" }}
        onClick={() => toggleImportance(company.id)}
      ></i>
    </li>
  );
};

export default Company;
