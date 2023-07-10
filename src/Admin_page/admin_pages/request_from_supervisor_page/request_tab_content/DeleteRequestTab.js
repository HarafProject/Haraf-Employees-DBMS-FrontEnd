import { useState } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import "./requestDetail.css";

export default function DeleteRequestTab() {
  const data = [
    { id: 1, name: "Kishimu Shanwas" },
    { id: 2, name: "JKishimu Shanwas" },
    { id: 3, name: "BKishimu Shanwas" },
    { id: 4, name: "AKishimu Shanwas" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
          <p>Delete Kadwama as a nemployee request from {item.name}</p>
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
