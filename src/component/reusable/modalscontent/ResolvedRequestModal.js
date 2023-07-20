import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./modalscreen.css";

export default function ResolvedRequestModal({ closeModal, activeTabButton }) {
  const [modalText, setModalText] = useState("");
  const [modalMessage, setModalMessage] = useState("");



  useEffect(() => {
    if (activeTabButton === "add") {
      setModalText("Add Profile Request");
       setModalMessage(
         "Request to Add Kadwama Lazarus as an LIPWDMS Employee"
       );
    } else if (activeTabButton === "delete") {
      setModalText("Delete Profile Request");
      setModalMessage(
        "Request to delete Kadwama Lazarus as an LIPWDMS Employee"
      );
    } else if (activeTabButton === "edit") {
      setModalMessage(
        "Request to Edit Kadwama Lazarus as an LIPWDMS Employee"
      );
      setModalText("Edit Profile Request");
    }
  }, [activeTabButton]);

  return (
    <div className="modal-screen sendrequest-modal p-4 my-3">
      <div className="">
        <button className="btn close-button" onClick={closeModal}>
          <Icon icon="ic:round-cancel" color="#f99c39" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <h5 className="modal-title"> {modalText}</h5>
          <p className="request-by mt-2">{modalMessage}</p>
          <div className="reason-section mt-3">
            <span>Reasons</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <div className="request-info my-3">
            <p>
              Request sents by: <span> Musa</span>
            </p>
            <p>
               Date: <span> 17th July 2023</span>
            </p>
          </div>
          <div className="approved mt-4">
            <h3 className="my-2"> Request Declined & Resolved</h3>
            <p>By Jeremiah Adu (Super Admin 2)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
