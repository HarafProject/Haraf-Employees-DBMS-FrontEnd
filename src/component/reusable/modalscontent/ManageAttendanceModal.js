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
    if (buttonClick === "discard") {
      setActionTitle("discard Supervisor");
      setActionText(
        `Are you sure you want to discard john as a? This will allow john to have full access to the LIPWDMS portal`
      );
      setButtonText("discard");
    } else if (buttonClick === "discardreport") {
      setActionTitle("send report Supervisor");
      setActionText(
        `Are you sure you want to permanently send report john as a? This will disable john account on the LIPWDMS portal`
      );
      setButtonText("send report");
    } else if (buttonClick === "savereport") {
      setActionTitle("save report Supervisor");
      setActionText(
        `Are you sure you want to permanently save report john as a? This will disable john account on the LIPWDMS portal`
      );
      setButtonText("save report");
    }
  }, [buttonClick]);

  return (
    <div
      className="modal-screen px-5 py-1 my-3"
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

          <button className="btn" onClick={onYes}>
            Yes
          </button>
          <button className="btn" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
