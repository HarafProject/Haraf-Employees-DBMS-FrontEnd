import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./modalscreen.css";

export default function ManageAttendanceModal({ closeModal, buttonClick, onYes, onNo }) {
  const navigate = useNavigate();
  const [actionTitle, setActionTitle] = useState("");
  const [actionText, setActionText] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if (buttonClick === "discardreport") {
      setActionTitle("Discard Report");
      setActionText(
        "Are You Sure you want to Discard this report?"
      );
      setButtonText("send report");
    } else if (buttonClick === "discardreport") {
      setActionTitle("Confirm Report");
      setActionText(
        "Are you sure you want to submit this report? Once submitted data cannot be reviewed."
      );
      setButtonText("submit report");
    }
  }, [buttonClick]);

  return (
    <div
      className="modal-screen px-5 py-1 my-3 discard-report-modal"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="">
        <button
          className="btn close-button delete-close-btn"
          onClick={closeModal}
        >
          <Icon icon="ic:round-cancel" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <p className="mt-2 text-center no-network">{actionTitle}</p>
          <span className="mt-2 mb-5 text-center">{actionText}</span>

          <div className="d-flex justify-content-around report-btns my-3">
            <button className="btn modal-button" onClick={onYes}>
              Yes
            </button>
            <button className="btn modal-button delete-btn" onClick={closeModal}>
              No
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
