import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import "./modalscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { offlineMode } from "../../../redux/reducers/userReducer";
import { useNavigate, } from "react-router-dom";
import { replace } from "formik";

export default function NoNetworkModal({ closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function goOffline() {
    dispatch(offlineMode(true))
    closeModal()
    navigate("/supervisor/employee-list", { replace: true })

  }

  return (
    <div
      className="modal-screen px-5 py-1 my-3"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="">
        <button className="btn close-button" onClick={closeModal}>
          <Icon icon="icons8:cancel" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <Icon icon="carbon:network-public" className="network-icon" />
          <p className="mt-2 text-center no-network">No Network</p>
          <span className="mt-2 mb-5 text-center">
            There seems to be no network connection, use offline mode by tapping
            the button below to take attendance and store data locally{" "}
          </span>

          <button className="btn modal-button my-4" onClick={goOffline}>
            Use Offline Mode
          </button>
        </div>
      </div>
    </div>
  );
}
