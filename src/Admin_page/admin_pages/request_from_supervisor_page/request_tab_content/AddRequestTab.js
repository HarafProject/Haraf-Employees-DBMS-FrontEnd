import { useState } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import "./requestDetail.css";

export default function AddRequestTab() {
  const data = [
    { id: 1, name: "Gloria Zira" },
    { id: 1, name: "Gloria Zira" },
    { id: 1, name: "Gloria Zira" },
    { id: 1, name: "Gloria Zira" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log(showSuccessModal);

  const handleApproveRequest = () => {
    setIsOpen(false);
    setShowSuccessModal(true);
  };

  const closeUndoModal = () => {
    setShowSuccessModal(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {data.map((item) => (
        <div
          className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
          key={item.id}
        >
          <p>Delete Kadwama as an employee request from {item.name}</p>
          <button onClick={openModal}>View Request</button>
        </div>
      ))}

      {isOpen && (
        <ViewRequestModal
          closeModal={closeModal}
          close={handleApproveRequest}
        />
      )}

      {showSuccessModal && (
        <div>
          <div>
            <span className="close" onClick={closeUndoModal}>
              &times;
            </span>
            <p>Edit was successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}
