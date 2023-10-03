import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReusableInformationList from "../../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./adminEmployeeProfile.css";
import { Icon } from "@iconify/react";

import AdminEmployeeDataSummary from "./AdminEmployeeAttendanceSummary";

export default function AdminEmployeeProfile() {
  // const user = userData.user[0];
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();
  const user = location.state

  useEffect(() => {

    if (!user) navigate(-1, { replace: true });
  }, [user])

  const personalInfo = [
    { label: "Full Name", value: user?.fullName },
    { label: "Address", value: user?.address },
    { label: "Phone Number", value: user?.phone },
  ];

  const bankInfo = [
    { label: "Account Name", value: user?.fullName },
    { label: "Bank Name", value: user?.bankName },
    { label: "Account Number", value: user?.accountNumber },
  ];

  const otherInfo = [
    { label: "Head of Household", value: user?.householdHead },
    { label: "Household Size", value: user?.householdSize },
    { label: "Special Ability", value: user?.specialDisability },
  ];

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="employee-profile-page">
      <div className="profile-content my-2 px-5">
        <div className="back-to-previous mt-2 mb-5">
          <Icon icon="mdi:arrow-back-circle" onClick={goBack} className="arrowback-icon me-3" />
          Back to list
        </div>
        <div className="dashboard-profile-info">
          <div className="d-flex flex-column profile-info-summary">
            <div className="d-flex ">
              <div className="profile-img image me-1 pe-1">
                <img src={user?.photo} alt="" />
              </div>
              <div className="d-flex">
                <div className="names mx-4">
                  <h4>{user?.fullName}</h4>
                  <p> {user?.maritalStatus} | {user?.sex} </p>
                  <p>{user?.phone}</p>
                </div>
                <div className="work-info mx-4">
                  <p><span> Work Topology:</span> {user?.workTypology.name} </p>
                  <p> <span>Ward: </span> {user?.ward.name}</p>
                  <p><span> Age:</span> {user?.age} Years
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-employee-data-stats mobile">
              <AdminEmployeeDataSummary
                beneficiary={user?._id}
              />
            </div>


            <div className="my-3">
              <ReusableInformationList title="Personal Information" information={personalInfo} />
              <ReusableInformationList title="Bank Information" information={bankInfo} />
              <ReusableInformationList title="Other Information" information={otherInfo} />
            </div>
          </div>

          <div className="admin-employee-data-stats desktop">
            <AdminEmployeeDataSummary
              beneficiary={user?._id}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
