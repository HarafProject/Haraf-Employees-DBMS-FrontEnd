import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../../assets/logo.png";
import "./header.css";

const ReusableHeader = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileMenu = () => setClicked(false);

  return (
    <div className="container-fluid header-section px-4 py-2">
      <div className="d-flex align-items-center justify-content-between header-content px-4">
        <NavLink to="/employee-list" onClick={closeMobileMenu}>
          <img src={logo} alt="logo" />
        </NavLink>

        <h1>LIPWMS Supervisor Portal</h1>

        <ul
          className={clicked ? "header-menu active" : "header-menu"}
          id="header-menu"
        >
          <li>
            {" "}
            <NavLink to="/employee-list" onClick={closeMobileMenu}>
              Employee List
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/attendance" onClick={closeMobileMenu}>
              Take Attendance
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/profile" onClick={closeMobileMenu}>
              Supervisor's Profile
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/notification" onClick={closeMobileMenu}>
              Notifications
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/" onClick={closeMobileMenu}>
              Logout
            </NavLink>{" "}
          </li>
        </ul>
        <div className="hamburger-icon" onClick={handleClick}>
          <Icon
            icon={clicked ? "jam:close" : "ci:menu-alt-02"}
            className={clicked ? "close" : "bar"}
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableHeader;
