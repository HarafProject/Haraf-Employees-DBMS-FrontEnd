import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReusableInformationList from "../../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./adminEmployeeProfile.css";
import { Icon } from "@iconify/react";

import AdminEmployeeDataSummary from "./AdminEmployeeAttendanceSummary";

export default function AdminEmployeeProfile() {
  // const user = userData.user[0];
  const location = useLocation()
  const { id } = useParams();
  const user = location.state


  const personalInfo = [
    { label: "Full Name", value: user.fullName },
    { label: "Address", value: user.address },
    { label: "Phone Number", value: user.phone },
  ];

  const bankInfo = [
    { label: "Account Name", value: user.fullName },
    { label: "Bank Name", value: user.bankName },
    { label: "Account Number", value: user.accountNumber },
  ];

  const otherInfo = [
    { label: "Head of Household", value: user.householdHead },
    { label: "Household Size", value: user.householdSize },
    { label: "Special Disability", value: user.specialDisability },
  ];

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="employee-profile-page">
      <div className="profile-content my-4 px-5">
        <div className="back-to-previous my-4">
          <Icon
            icon="mdi:arrow-back-circle"
            onClick={goBack}
            className="arrowback-icon me-3"
          />
          Back to list
        </div>
        <div className="dashboard-profile-info">
          <div className="dashboard-profile-infor-summary">
            <div className="profile-summary">
              <div className="profile-img">
              <img  src={user.photo} alt="" />
              </div>
              
              <div className="names mx-1">
                <h4>{user.fullName}</h4>
                <p>
                  {user.maritalStatus} | {user.sex}
                </p>
                <p>{user.phone}</p>
              </div>
              <div className="work-info mx-1">
                <p>
                  Work Topology:
                  <span> {user?.workTypology.name} </span>
                </p>
                <p>
                  Ward: <span>{user?.ward.name}</span>
                </p>
                <p>
                  Age:
                  <span>{user.age} Years</span>
                </p>
              </div>
            </div>
            <div className="my-3">
              <ReusableInformationList
                title="Personal Information"
                information={personalInfo}
              />
              <ReusableInformationList
                title="Bank Information"
                information={bankInfo}
              />
              <ReusableInformationList
                title="Other Information"
                information={otherInfo}
              />
            </div>
          </div>
          <AdminEmployeeDataSummary
            beneficiary={user._id}
          />
        </div>
      </div>
    </div>
  );
}
