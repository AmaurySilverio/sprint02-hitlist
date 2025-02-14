import Company from "./Company";
const CompaniesField = ({ companiesToShow, toggleImportance }) => {
  return (
    <ul>
      {companiesToShow.length < 1 ? (
        <h3>No Companies Found</h3>
      ) : (
        companiesToShow.map((company) => (
          <Company
            key={company.id}
            company={company}
            toggleImportance={toggleImportance}
          />
        ))
      )}
    </ul>
  );
};

export default CompaniesField;
