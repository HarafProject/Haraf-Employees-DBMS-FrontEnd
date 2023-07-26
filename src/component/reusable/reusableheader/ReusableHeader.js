import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import logo from '../../../assets/logo.png';
import './header.css';
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../redux/reducers/userReducer";
import { clearToken } from "../../../redux/reducers/jwtReducer";
import { attendanceWards, updateAttendance } from "../../../redux/reducers/attendanceReducer";
import { updateEmployees, updateWards } from "../../../redux/reducers/employeeReducer";

const ReusableHeader = () => {
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setClicked(!clicked);
  };
  const { offline } = useSelector((state) => state?.user)

  const closeMobileMenu = () => setClicked(false);

  function logout(params) {
    if(!window.confirm("This action will removed all un-sent reports and data. Do you still want to log out?")) return
    dispatch(logoutSuccess())
    dispatch(clearToken())
    dispatch(updateAttendance({}))
    dispatch(updateEmployees([]))
    dispatch(updateWards([]))
    dispatch(attendanceWards([]))
    navigate("/", {replace:true})

  }

  return (
    <div className="container-fluid header-section px-4 py-2">
      <div className="d-flex align-items-center justify-content-between header-content px-4">

        <NavLink to="/supervisor/employee-list" onClick={closeMobileMenu} className="">
          <img src={logo} alt="logo" />
        </NavLink>

        <h1>LIPWMS Supervisor Portal</h1>

        <ul className={clicked ? "header-menu active" : "header-menu"} id="header-menu" >
          <li> <NavLink to='/supervisor/employee-list' onClick={closeMobileMenu}>Beneficiary List</NavLink> </li>
          <li> <NavLink to='/supervisor/wards' onClick={closeMobileMenu}>Take Attendance</NavLink> </li>
          <li> <NavLink to='/supervisor/profile' onClick={closeMobileMenu}>Supervisor's Profile</NavLink> </li>
          <li> <NavLink to='/supervisor/notification' onClick={closeMobileMenu}>Notifications</NavLink> </li>
          <li> <NavLink to='/supervisor/report-history' onClick={closeMobileMenu}>Report History</NavLink> </li>          
          <li>
            {offline ? <p className="logout-link">Offline</p> : <div onClick={logout} className="logout-link">Logout</div>
            }
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
