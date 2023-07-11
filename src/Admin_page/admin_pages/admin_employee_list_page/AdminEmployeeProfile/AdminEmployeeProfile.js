import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReusableInformationList from "../../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./adminEmployeeProfile.css";
import { Icon } from "@iconify/react";
import userData from "./adminEmployeesData";
import profileimage from "../../../../assets/profile.png";
import AdminEmployeeDataSummary from "./AdminEmployeeAttendanceSummary";

export default function AdminEmployeeProfile() {
  // const user = userData.user[0];
  const { id } = useParams();
  const user = userData.find((user) => user.id === parseInt(id));
  if (!user) {
    return <p>Employee not found</p>;
  }
  const personalInfo = [
    { label: "Full Name", value: user.full_name },
    { label: "Address", value: user.home_address },
    { label: "Phone Number", value: user.phone_number },
  ];

  const bankInfo = [
    { label: "Account Name", value: user.full_name },
    { label: "Bank Name", value: user.bank_name },
    { label: "Account Number", value: user.account_number },
  ];

  const otherInfo = [
    { label: "Head of Household", value: user.head_of_house },
    { label: "Household Size", value: user.household_size },
    { label: "Special Disability", value: user.special_disability },
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
              <img className="profile-img" src={profileimage} alt="" />
              <div className="names mx-1">
                <h4>{user.full_name}</h4>
                <p>
                  {user.marital_status} | {user.sex}
                </p>
                <p>{user.phone_number}</p>
              </div>
              <div className="work-info mx-1">
                <p>
                  Work Topology:
                  <span> {user.work_typology} </span>
                </p>
                <p>
                  Ward: <span>{user.ward}</span>
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
          <AdminEmployeeDataSummary />
        </div>
      </div>
    </div>
  );
}
