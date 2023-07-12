import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./adminhome.css";
import profile from "../../../assets/logo-light.png";
import { useNavigate } from "react-router-dom";
import AdminEmployeeList from "../admin_employee_list_page/AdminEmployeeList";
import SuperAdminProfile from "../super_admin_profile_page/SuperAdminProfile";
import AttendanceAnalytics from "../attendance_analytic_page/AttendanceAnalytics";
import ManageSupervisor from "../manage_supervisor_page/ManageSupervisor";
import AttendanceReportTable from "../attendance_page/AttendanceReportTable";

export default function AdminHomePage() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("employee");

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar ">
        <div className="p-3">
          <img src={profile} alt="" />

          <div>
            <span className="name">
              Williams Donald {<br />} Super Admin ID: 3290339300
            </span>
          </div>
        </div>
        <div className="sidebar-navlinks d-flex flex-column justify-content-center mt-3">
          <p
            className={selectedComponent === "employee" ? "active" : ""}
            onClick={() => handleComponentClick("employee")}
          >
            <Icon icon="healthicons:city-worker-outline" />
            <span>Employees</span>
          </p>

          <p
            className={selectedComponent === "reports" ? "active" : ""}
            onClick={() => handleComponentClick("reports")}
          >
            <Icon icon="mdi:file-report-outline" />
            <span>Attendance Reports</span>
          </p>

          <p
            className={selectedComponent === "analytics" ? "active" : ""}
            onClick={() => handleComponentClick("analytics")}
          >
            <Icon icon="streamline:interface-content-chart-product-data-analysis-analytics-graph-line-business-board-chart" />
            <span>Attendance Analytics</span>
          </p>

          <p
            className={selectedComponent === "requests" ? "active" : ""}
            onClick={() => handleComponentClick("requests")}
          >
            <Icon icon="fluent:branch-request-20-filled" />
            <span>Requests from Supervisors</span>
          </p>

          <p
            className={selectedComponent === "manage" ? "active" : ""}
            onClick={() => handleComponentClick("manage")}
          >
            <Icon icon="material-symbols:manage-accounts-outline-rounded" />
            <span>Manage Supervisors</span>
          </p>

          <p
            className={selectedComponent === "profile" ? "active" : ""}
            onClick={() => handleComponentClick("profile")}
          >
            <Icon icon="uiw:user" />
            <span>Super Admin Profile</span>
          </p>

          <p
            className={selectedComponent === "logout" ? "active" : ""}
            onClick={() => handleComponentClick("logout")}
          >
            <Icon icon="ant-design:logout-outlined" />
            <span onClick={() => navigate("/admin")}>Log Out</span>
          </p>
        </div>
      </div>
      <div className="content px-3">
        <div className="mx-3">
          <h4 className="header-title">LIPWDMS Super Admin Portal</h4>
          <div className="user-info-section py-3 my-3">
            <div>
              {selectedComponent === "employee" && <AdminEmployeeList />}
              {selectedComponent === "reports" && <AttendanceReportTable />}
              {selectedComponent === "analytics" && (
                <AttendanceAnalytics />
              )}
              {selectedComponent === "requests" && (
                <div>Requests from Supervisors </div>
              )}
              {selectedComponent === "manage" && <ManageSupervisor />}
              {selectedComponent === "profile" && <SuperAdminProfile />}
              {/* {selectedComponent === 'logout' && <div>Loan </div>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
