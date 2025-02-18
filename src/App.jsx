import { useState, useEffect } from "react";
import axios from "axios";
import companyService from "./services/companies";
import Navbar from "./components/Navbar";
import CompanyForm from "./CompanyForm";
import Filter from "./components/Filter";
import CompaniesField from "./components/CompaniesField";
import Notification from "./components/Notification";
import ConfirmNotification from "./components/ConfirmNotification";
import CompanyDetails from "./components/CompanyDetails";

function App() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [priority, setPriority] = useState("no");
  const [showAll, setShowAll] = useState(true);
  const [newSearch, setNewSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedCompany, setClickedCompany] = useState(null);
  const [companyDetailsModal, setCompanyDetailsModal] = useState(false);
  const [createJob, setCreateJob] = useState(false);
  const [companyFormModal, setCompanyFormModal] = useState(false);

  useEffect(() => {
    companyService
      .getAll()
      .then((initialCompanies) => {
        setCompanies(initialCompanies);
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          "There is a problem with the server. Please refresh the page"
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
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
    const company = companies.find((c) => c.id === id);
    const changedCompany = { ...company, priority: !company.priority };
    companyService
      .update(id, changedCompany)
      .then((returnedCompany) => {
        setCompanies(companies.map((c) => (c.id === id ? returnedCompany : c)));
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.id === id ? returnedCompany : c))
          );
        }
        if (clickedCompany) {
          setClickedCompany(changedCompany);
        }
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          `'${company.name}' was already deleted from the server.`
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setCompanies(companies.filter((c) => c.id !== id));
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.id === id ? returnedCompany : c))
          );
        }
      });
  };

  const addCompany = (event) => {
    event.preventDefault();
    setCompanyFormModal(false);
    const companyObject = {
      name: newCompany.trim(),
      location: newLocation.trim(),
      position: newPosition.trim(),
      description: newDescription.trim(),
      priority: priority === "yes" ? true : false,
    };
    if (
      companies.find(
        (company) =>
          company.name.toUpperCase() === companyObject.name.toUpperCase()
      )
    ) {
      setModal(true);
      setErrorMessage(
        `'${companyObject.name}' has already been already added to your Hitlist.`
      );
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setNewCompany("");
      setNewLocation("");
      setNewPosition("");
      setNewDescription("");
      setPriority("no");
      return false;
    }

    companyService
      .create(companyObject)
      .then((returnedCompany) => {
        setCompanies(companies.concat(returnedCompany));
        setNewCompany("");
        setNewLocation("");
        setNewPosition("");
        setNewDescription("");
        setPriority("no");
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("Company could not be added. Please try again.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  };

  const removeCompany = (id) => {
    setConfirmationModal(true);

    // Store the function in a variable to pass the ID at confirmation time
    const handleConfirmDeletion = () => {
      companyService
        .remove(id)
        .then(() => {
          setCompanies(companies.filter((c) => c.id !== id));
          setCompanyDetailsModal(false);
          setClickedCompany(null);
          if (filteredCompanies.length > 0) {
            setFilteredCompanies(filteredCompanies.filter((c) => c.id !== id));
          }
        })
        .catch((error) => {
          setModal(true);
          setErrorMessage("Company was already deleted from the server.");
          setTimeout(() => {
            setModal(false);
            setErrorMessage("");
          }, 5000);
          setCompanies(companies.filter((c) => c.id !== id));
          if (filteredCompanies.length > 0) {
            setFilteredCompanies(filteredCompanies.filter((c) => c.id !== id));
          }
        });

      setConfirmationModal(false);
    };

    // Pass `handleConfirmDeletion` to modal
    setConfirmRemove(() => handleConfirmDeletion);
  };
  const showCompanyDetails = (company) => {
    setClickedCompany(company);
    setCompanyDetailsModal(true);
  };

  const handleCompanyInputChange = (event) => {
    setNewCompany(event.target.value);
  };
  const handleLocationInputChange = (event) => {
    setNewLocation(event.target.value);
  };
  const handlePositionInputChange = (event) => {
    setNewPosition(event.target.value);
  };
  const handleDescriptionInputChange = (event) => {
    setNewDescription(event.target.value);
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
    console.log(company);
    console.log(searchTerm);
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
      <button onClick={() => setCompanyFormModal(true)}>Add Company</button>
      {companyFormModal ? (
        <CompanyForm
          onSubmit={addCompany}
          onCompanyInputChange={handleCompanyInputChange}
          companyInputValue={newCompany}
          onLocationInputChange={handleLocationInputChange}
          locationInputValue={newLocation}
          onPositionInputChange={handlePositionInputChange}
          positionInputValue={newPosition}
          onDescriptionInputChange={handleDescriptionInputChange}
          descriptionInputValue={newDescription}
          priority={priority}
          onRadioChange={handlePriorityChange}
          openCompanyFormModal={companyFormModal}
          closeCompanyFormModal={() => setCompanyFormModal(false)}
        />
      ) : null}
      <h2>Companies</h2>
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
      />
      <ConfirmNotification
        openConfirmationModal={confirmationModal}
        closeConfirmationModal={() => setConfirmationModal(false)}
        confirmRemove={confirmRemove}
        // removeCompany={removeCompany}
      />
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
        // removeCompany={removeCompany}
        showCompanyDetails={showCompanyDetails}
      />
      {companyDetailsModal && clickedCompany && (
        <CompanyDetails
          openCompanyDetailsModal={companyDetailsModal}
          closeCompanyDetailsModal={() => {
            setCompanyDetailsModal(false);
            setClickedCompany(null);
          }}
          toggleImportance={toggleImportanceOf}
          removeCompany={removeCompany}
          company={clickedCompany}
        />
      )}
    </>
  );
}

export default App;
