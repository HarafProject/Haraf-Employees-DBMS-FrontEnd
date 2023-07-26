import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./sendrequestmodal.css";

export default function ReportSentSuccessModal({ closeModal }) {
  const navigate = useNavigate();

  return (
    <div
      className="modal-screen px-5 py-1 my-3"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="d-flex flex-column align-items-center modal-content">
        <Icon icon="ep:success-filled" className="success-icon my-3" />

        <h5 className="mt-4">Report Sent Successfully</h5>
        <span className="text-center">Your report for today has been sent successfully</span>

        <button className="btn modal-button my-4" onClick={closeModal}>
          OK
        </button>
      </div>
    </div>
  );
}
