import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";
import "./modalscreen.css";

export default function PasswordChangeSuccessModal({ closeModal }) {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div
      className="modal-screen px-5 py-1 my-3"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="d-flex flex-column align-items-center modal-content">
        <Icon icon="ep:success-filled" className="success-icon my-3" />

        <h5 className="mt-4 fw-bold">Password Changed Successfully </h5>
        <p className="text-center">Proceed to login, remember to use your new password</p>

        <button
          className="btn modal-button my-4"
          onClick={() => {
            if (location.pathname === "/admin-create-password") {
              navigate("/admin-login");
            } else {
              navigate("/login");
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
