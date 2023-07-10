import { Icon } from "@iconify/react";
import "./viewRequest.css";
import { useNavigate } from "react-router-dom";

export default function ViewRequestModal({ closeModal, close }) {
  const navigate = useNavigate();

  return (
    <div
      className="modal-screen px-4"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="">
        <button
          className="btn close-button delete-close-btn"
          onClick={closeModal}
        >
          <Icon icon="ic:round-cancel" color="#f99c39" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <p className="mt-2 text-center no-network">Delete Employee?</p>
          <span className="mt-3 mb-3 text-center">
            Request to <span>Delete </span> Kadawama Lazarus as an LIPWDMS
            Employee
          </span>
          <div className="reason">
            <h5>Reason</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              praesentium molestiae dolorum veniam sint.
            </p>
          </div>
          <div className="sent-by">
            <p>
              Request sent by: <span>Gloria Zira</span>
            </p>
            <p>
              Date: <span>17th July 2023</span>
            </p>
          </div>
          <div className="ctas">
            <button className="btn decline-btn my-4" onClick={close}>
              Decline Request
            </button>
            <button className="btn approve-btn my-4" onClick={""}>
              Approve Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
