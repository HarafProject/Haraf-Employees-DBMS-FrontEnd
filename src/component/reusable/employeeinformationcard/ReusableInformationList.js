import React from "react";
// import './reusableinfo.css';

const ReusableInformationList = ({ title, information }) => {
  return (
    <div className=" reusable-info-list">
      <p className="h6">{title}</p>
      <div className="personalinfo-user">
        {information.map((item, index) => (
          <p className="d-flex flex-column info" key={index}>
            <span>{item.label}</span>
            
            {item.value ? item.value : "Unavailable"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReusableInformationList;
