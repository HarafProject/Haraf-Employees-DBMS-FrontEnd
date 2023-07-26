import React from "react";
const moment = require("moment");
// import './reusableinfo.css';

const ReusableNotificationCard = ({ notificationContent, onButtonClick }) => {
  return (
    <div className="mt-3 notification-card">
      {notificationContent.map((item, index) => (
        <>
          <div
            className="d-flex justify-content-between align-items-center px-3"
            key={index}
          >
            <p className="">{item.message}</p>
            <div className="d-flex notification-action align-items-center justify-content-around">
              <button
                className="btn notification-btn"
                onClick={() => onButtonClick(item.buttonType, index)}
              >
                {item.buttonType} {item.buttonType !== "Completed" && "Now"}
              </button>
              <span>{moment(item.date_time).fromNow()}</span>
            </div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default ReusableNotificationCard;
