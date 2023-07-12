import React from "react";
import { Icon } from "@iconify/react";

const ViewReason = ({ closeModal, modalTitle, reason }) => {
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
          <p className="mt-2 text-center no-network">{modalTitle}</p>
          <span className="mt-2 mb-5 text-center">{reason}</span>

          <button
            className="btn modal-button delete-btn my-4"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReason;
