import React from "react";
import { useParams } from "react-router-dom";
import ReusableInformationList from "../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./employeeprofile.css";
import userData from "../../../component/data/EmployeesData";
import profileimage from "../../../assets/profile.png";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";

export default function EmployeeProfilePage() {
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
    { label: "Head of Household", value: user.heade_of_house },
    { label: "Household Size", value: user.household_size },
    { label: "Special Ability", value: user.special_ability },
  ];

  return (
    <div className="employee-profile-page">
      <ReusableHeader />
      <div className="profile-content my-5 p-5">
        <div className="d-flex align-item-center justify-content-around profile-info-summary">
          <img src={profileimage} alt="" />
          <div className="names mx-3">
            <h4>{user.full_name}</h4>
            <p>{user.marital_status}</p>
            <p>{user.sex}</p>
          </div>
          <div className="account-info mx-3">
            <p>
              {" "}
              <span>Work Topology: </span>
              {user.work_typology}
            </p>
            <p>
              <span>Ward:</span> {user.ward}
            </p>
            <p>
              <span>Age:</span> {user.age} Years
            </p>
          </div>
        </div>
        <div>
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
        <div className="personal-info"></div>
        <div className="bank-info"></div>
        <div className="other-info"></div>
      </div>
    </div>
  );
}
