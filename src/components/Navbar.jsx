import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const accountClicked = () => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      setHighlight(true);
    } else {
      setHighlight(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <h1>[arr]ange</h1>
        </Link>
        <div className="navbar-items">
          <ul>
            {/* {navItems.map((item) => (
              <NavLink
                key={item.length}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => {
                  return isActive ? "highlight" : "";
                }}
              />
            ))} */}
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "highlight" : "";
              }}
            >
              <li className="item">Home</li>
            </NavLink>
            <NavLink
              to="/board"
              className={({ isActive }) => (isActive ? "highlight" : "")}
            >
              <li className="item">Board</li>
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) => (isActive ? "highlight" : "")}
            >
              <li className="item">Contacts</li>
            </NavLink>
            <div
              className="account-wrapper"
              onMouseLeave={() => setShowDropDown(false)}
            >
              <li
                className={`item cursor ${highlight ? "highlight" : ""}`}
                onClick={accountClicked}
              >
                Account
                {showDropDown && (
                  <div className="account-dropdown-container">
                    <Link to="/profile" className="dropdown-item">
                      <span className="item">Profile</span>
                    </Link>
                    <div className="dropdown-item">
                      <span className="item">Log Out</span>
                    </div>
                  </div>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
