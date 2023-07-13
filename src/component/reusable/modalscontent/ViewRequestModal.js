import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./modalscreen.css";

export default function ViewRequestModal({
  closeModal,
  activeTabButton,
  openDeclineSnackBar,
  openApproveSnackBar,
}) {
  const [modalText, setModalText] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const declineRequest = () => {
    closeModal();
    openDeclineSnackBar();
  };

  const approveRequest = () => {
    closeModal();
    openApproveSnackBar();
  };

  console.log(activeTabButton);

  useEffect(() => {
    if (activeTabButton === "add") {
      setModalText("Add Employee Request");
      setModalMessage("Request add new employee to LIPWDMS ");
    } else if (activeTabButton === "delete") {
      setModalText("Delete Employee Request");
      setModalMessage(
        "Request to delete Kadwama Lazarus as an LIPWDMS employeee"
      );
    } else if (activeTabButton === "edit") {
      setModalText("Edit Profile Request");
      setModalMessage("Request to edit Kadwama Lazarus's profile");
    }
  }, [activeTabButton]);

  return (
    <div className="modal-screen sendrequest-modal p-4 my-3">
      <div className="">
        <button className="btn close-button" onClick={closeModal}>
          <Icon icon="ic:round-cancel" color="#F99C39" className="close-icon" />
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
          <div className="d-flex justify-content-between request-info my-3">
            <p>
              Request sents by: <span>Musa</span>
            </p>
            <p>
              Date: <span>17th July 2023</span>
            </p>
          </div>
          <div className="d-flex">
            <button
              className="btn modal-button delete-request"
              onClick={declineRequest}
            >
              Decline Request
            </button>
            <button
              className="btn modal-button delete-request"
              onClick={approveRequest}
            >
              Approve Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
