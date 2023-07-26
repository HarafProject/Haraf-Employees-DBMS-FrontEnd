import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./modalscreen.css";

export default function ViewRequestModal({
  closeModal,
  activeTabButton,
  openDeclineSnackBar,
  openApproveSnackBar,
  modalData,
}) {
  const [modalText, setModalText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalReason, setModalReason] = useState({});

  const declineRequest = () => {
    closeModal();
    openDeclineSnackBar();
  };

  const approveRequest = () => {
    closeModal();
    openApproveSnackBar();
  };

  useEffect(() => {
    if (activeTabButton === "add") {
      setModalText("Add Employee Request");
      setModalMessage(
        `Request to add an LIPWDMS employeee`
      );
      setModalReason(modalData);
    } else if (activeTabButton === "delete") {
      setModalText("Delete Employee Request");
      setModalMessage(
        `Request to delete ${modalData?.employee?.fullName} as an LIPWDMS employeee`
      );
    } else if (activeTabButton === "edit") {
      setModalText("Edit Profile Request");
      setModalMessage(`Request to edit ${modalData?.employee?.fullName} profile.`)
    }
  }, [activeTabButton]);

  return (
    <div className="modal-screen sendrequest-modal p-4">
      <div className="">
        <button className="btn close-button" onClick={closeModal}>
          <Icon icon="ic:round-cancel" color="#F99C39" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <h6 className="modal-title"> {modalText}</h6>
          <p className="request-by mt-2">{modalMessage}</p>
          <div class="d-flex justify-content-around align-items-center">
            <p style={{marginRight:"3rem"}}>LGA : {modalData?.employee?.lga?.name}</p>
            <p>WARD : {modalData?.employee?.ward?.name}</p>
          </div>
          <div className="reason-section mt-3">
            <span>Reasons</span>
            {modalData?.reason ? <p>{modalData?.reason}</p> : <p> </p>}
          </div>
          <div className="d-flex justify-content-between request-info my-3">
            <p>
              Request sents by: <span>{modalData?.user?.firstname} {modalData?.user?.surname}</span>
            </p>
            <p>
              Date: <span>{new Date(modalData?.createdAt).toDateString()}</span>
            </p>
          </div>
          <div className="d-flex request-btn-section">
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
