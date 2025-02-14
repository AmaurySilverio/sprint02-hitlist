import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CompanyForm from "./CompanyForm";
import Filter from "./components/Filter";
import CompaniesField from "./components/CompaniesField";

function App() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [priority, setPriority] = useState("no");
  const [showAll, setShowAll] = useState(true);
  const [newSearch, setNewSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/companies").then((response) => {
      setCompanies(response.data);
    });
  }, []);

  const companiesToShow =
    filteredCompanies.length === 0 && newSearch.trim() !== ""
      ? []
      : showAll
      ? filteredCompanies.length < 1
        ? companies
        : filteredCompanies
      : filteredCompanies.length < 1
      ? companies.filter((company) => company.priority)
      : filteredCompanies.filter((company) => company.priority);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/companies/${id}`;
    const company = companies.find((n) => n.id === id);
    const changedCompany = { ...company, priority: !company.priority };
    axios.put(url, changedCompany).then((response) => {
      setCompanies(companies.map((n) => (n.id === id ? response.data : n)));
    });
  };

  const addCompany = (event) => {
    event.preventDefault();
    const companyObject = {
      name: newCompany.trim(),
      location: newLocation.trim(),
      priority: priority === "yes" ? true : false,
      // id: String(companies.length + 1),
    };
    if (
      companies.find(
        (company) =>
          company.name.toUpperCase() === companyObject.name.toUpperCase()
      )
    ) {
      alert(`${companyObject.name} was already added to your Hitlist`);
      setNewCompany("");
      setNewLocation("");
      setPriority("no");
      return false;
    }

    axios
      .post("http://localhost:3001/companies", companyObject)
      .then((response) => {
        setCompanies(companies.concat(response.data));
        setNewCompany("");
        setNewLocation("");
        setPriority("no");
      });
  };
  const handleCompanyInputChange = (event) => {
    setNewCompany(event.target.value);
  };
  const handleLocationInputChange = (event) => {
    setNewLocation(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    setNewSearch(searchTerm);

    if (searchTerm.trim() === "") {
      // If search is empty, reset to all companies
      setFilteredCompanies([]);
    } else {
      // Filter companies as the user types
      const filteredSearch = companies.filter((company) =>
        filterByCompanyOrLocation(company, searchTerm)
      );
      setFilteredCompanies(filteredSearch);
    }
  };
  function filterByCompanyOrLocation(company, searchTerm) {
    return (
      company.name.toUpperCase().includes(searchTerm.toUpperCase().trim()) ||
      company.location.toUpperCase().includes(searchTerm.toUpperCase().trim())
    );
  }
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   let filteredSearch = companies.filter(filterByCompanyOrLocation);
  //   setFilteredCompanies(filteredSearch);
  //   console.log(filteredSearch);
  //   // setNewSearch("");
  // };
  const handleClearSearchClick = () => {
    setFilteredCompanies([]);
    setNewSearch("");
  };
  const handleShowAllClick = () => setShowAll(!showAll);
  return (
    <>
      <Navbar />
      <CompanyForm
        onSubmit={addCompany}
        onCompanyInputChange={handleCompanyInputChange}
        companyInputValue={newCompany}
        onLocationInputChange={handleLocationInputChange}
        locationInputValue={newLocation}
        priority={priority}
        onRadioChange={handlePriorityChange}
      />
      <h2>Companies</h2>
      <Filter
        searchValue={newSearch}
        onSearchChange={handleSearchChange}
        onClearSearchClick={handleClearSearchClick}
        // onSubmitClick={handleSearchSubmit}
        // submitType="submit"
        onShowAllClick={handleShowAllClick}
        showAll={showAll}
      />
      <CompaniesField
        companiesToShow={[...companiesToShow]}
        toggleImportance={toggleImportanceOf}
      />
    </>
  );
}

export default App;
