import { useState } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import "./requestDetail.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

export default function EditRequestTab() {
  const data = [
    { id: 1, name: "Kishimu Shanwas", status: "Veiw Request" },
    { id: 2, name: "JKishimu Shanwas", status: "Veiw Request" },
    { id: 3, name: "BKishimu Shanwas", status: "Veiw Request" },
    { id: 4, name: "AKishimu Shanwas", status: "Veiw Request" },
    { id: 4, name: "AKishimu Shanwas", status: "Resolved" },
    { id: 4, name: "AKishimu Shanwas", status: "Resolved" },
  ];
  const [modalIsOpen, setIsOpen] = useState(false);

  const [snackBar, setSnackBar] = useState(false);

  const openSnackBar = () => {
    setSnackBar(true);
  };

  const closeSnackBar = () => {
    setSnackBar(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [activeTabButton, setActiveTabButton] = useState("");

  function openModal(activeTabButton) {
    setIsOpen(true);
    setActiveTabButton(activeTabButton);
  }

  return (
    <div>
      <div>
        <div>
          {data.map((item) => (
            <div
              className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
              key={item.id}
            >
              <p>
                Edit Kadwama Lazarus’s profile request from
                {item.name}
              </p>

              <button
                className={
                  item.status === "Resolved" ? "btn-black" : "btn-orange"
                }
                onClick={() => openModal("edit")}
              >
                {item.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* {modalIsOpen && ( */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={{
          base: "modal-base",
          afterOpen: "modal-base_after-open",
          beforeClose: "modal-base_before-close",
        }}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-base_after-open",
          beforeClose: "overlay-base_before-close",
        }}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        <ViewRequestModal
          closeModal={closeModal}
          openSnackBar={openSnackBar}
          activeTabButton={activeTabButton}
        />
      </Modal>

      {snackBar && (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 snackbar ">
          <Icon
            onClick={closeSnackBar}
            icon="system-uicons:cross"
            className="snackbar-close"
          />
          <p>Edit Request Decline</p>
          <button onClick={closeSnackBar}>Undo</button>
        </div>
      )}
      {/* )} */}
    </div>
  );
}
