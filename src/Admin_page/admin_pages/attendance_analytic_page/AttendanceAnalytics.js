import React, { useState, useEffect } from "react"

import "./analytics.css";
import AdminEmployeeDataSummary from "../admin_employee_list_page/AdminEmployeeDataSummary";

import AttendanceGraphChart from "./analytic_tab_content/AttendanceGraphPage";
import AnalyticAttendanceReport from "./analytic_tab_content/AttendanceReportsPage";

export default function AttendanceAnalytics() {

  const [activeTab, setActiveTab] = useState('Attendance Analytics');

  const handleTabClick = (tabHeader) => {
    setActiveTab(tabHeader);
    sessionStorage.setItem("lastSelectedReport", tabHeader);
  };

  useEffect(() => {
    const storedComponent = sessionStorage.getItem("lastSelectedReport");
    if (storedComponent) {
      setActiveTab(storedComponent);
    }
  }, []);

  return (
    <div className="attendance-analytic-page">
      <div>
        <AdminEmployeeDataSummary />
      </div>
      <div className="attendance-tab-area py-2 my-2">
        <div className="tab-headers mt-3">
          <div
            className={`tab-header ${activeTab === 'Attendance Analytics' ? 'active' : ''}`}
            onClick={() => handleTabClick('Attendance Analytics')}
          >
            Analytics
          </div>
          <div
            className={`tab-header mx-5 ${activeTab === 'Attendance Reports' ? 'active' : ''}`}
            onClick={() => handleTabClick('Attendance Reports')}
          >
            Reports
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'Attendance Analytics' && <AttendanceGraphChart />}
          {activeTab === 'Attendance Reports' && <AnalyticAttendanceReport />}
        </div>

      </div>

    </div>
  );
}
