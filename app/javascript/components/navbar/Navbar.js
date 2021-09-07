import React, { useState } from "react";

const Navbar = (props) => {

  const user = props.user;
  const isLoggedIn = props.logged_in;
  const myItemsDisplay = isLoggedIn ? (
    <a className="nav-link active" aria-current="page" href="/items">My Items</a>
  ) : (
    null
  );
  const optionsDisplay = isLoggedIn ? (
    <a className="nav-link active" aria-current="page" href="/options">Options</a>
  ) : (
    null
  );
  const avatarDisplay = isLoggedIn ? (
    <div>
      <img src={user.image} alt="avatar"width="32" />
      <a className="btn btn-secondary" aria-current="logout" href="/logout">Logout</a>
    </div>
  ) : (
    null
  );
  const [departmentColumn, setDepartmentColumn] = useState(user.display_department_column);

  const handleDepartmentToggle = (e) => {
    console.log(!departmentColumn);
    setDepartmentColumn(!departmentColumn);
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Shopping List</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {myItemsDisplay}
              </li>
              <li className="nav-item">
                {optionsDisplay}
              </li>
            </ul>
            <div className="navbar-text">
              {avatarDisplay}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;