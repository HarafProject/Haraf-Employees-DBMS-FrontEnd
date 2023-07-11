import { Icon } from "@iconify/react";
import "./modalscreen.css";
import { useNavigate } from "react-router-dom";

export default function DeleteEmployeeSuccessModal({ closeModal }) {
  const navigate = useNavigate();

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
          <p className="mt-2 text-center no-network">Delete Employee?</p>
          <span className="mt-2 mb-5 text-center">
            Are you sure you want to permanently delete Kadwama Lazarus as an
            employee? This will remove Joseph's as an employee on the LIPWDMS
            portal
          </span>

          <button
            className="btn modal-button delete-btn my-4"
            onClick={() => navigate("/employee-list")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
