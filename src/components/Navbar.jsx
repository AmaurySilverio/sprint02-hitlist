import { NavLink, Link } from "react-router-dom";
const Navbar = () => {
  const navItems = ["Home", "Board", "Contacts"];
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
              className={({ isActive }) => {
                return isActive ? "highlight" : "";
              }}
            >
              <li className="item">Board</li>
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) => {
                return isActive ? "highlight" : "";
              }}
            >
              <li className="item">Contacts</li>
            </NavLink>
            {/* <li className="item">Sign In</li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
