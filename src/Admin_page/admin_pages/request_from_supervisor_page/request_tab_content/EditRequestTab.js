import { useState, useEffect } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import ResolvedRequestModal from "../../../../component/reusable/modalscontent/ResolvedRequestModal";
import "./requestDetail.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import EmployeeRequest from "../../../../class/admin.requestsFromSupervisor.class";

export default function EditRequestTab() {
  
  const [requestModalIsOpen, setIsRequestModalOpen] = useState(false);
  const [resolvedModalIsOpen, setResolvedIsModalOpen] = useState(false);

  const [declineSnackBar, setDeclineSnackBar] = useState(false);
  const [approveSnackBar, setApproveSnackBar] = useState(false);

    const [editRequest, setEditRequest] = useState([]);

  const openDeclineSnackBar = () => {
    setDeclineSnackBar(true);
  };

  const closeDeclineSnackBar = () => {
    setDeclineSnackBar(false);
  };

  const openApproveSnackBar = () => {
    setApproveSnackBar(true);
  };

  const closeApproveSnackBar = () => {
    setApproveSnackBar(false);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };
  const [activeTabButton, setActiveTabButton] = useState("");

  function openRequestModal(activeTabButton) {
    setIsRequestModalOpen(true);
    setActiveTabButton(activeTabButton);
  }
  const closeResolvedModal = () => {
    setResolvedIsModalOpen(false);
  };

  function openResolvedModal(activeTabButton) {
    setResolvedIsModalOpen(true);
    setActiveTabButton(activeTabButton);
  }

  
    const handleFetchEditRequestData = async () => {
      try {
        const  {data}  = await EmployeeRequest.getAllEditEmployeeRequest();
        setEditRequest(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      handleFetchEditRequestData();
    }, []);

    const data = [
      { id: 1,  beneficiary: "beneficiary",  supervisor: "supervisor", status: "status" },
      
    ];
  return (
    <div>
      <div>
        <div>
          {editRequest.map((item) => (
            <div
              className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
              key={item._id}
            >
              <p>
                Edit {item?.employee} profile request from {item?.user?.firstname}
              </p>

              {item.status === "Resolved" ? (
                <button
                  className={"btn-black"}
                  onClick={() => openResolvedModal("edit")}
                >
                  Resolved
                </button>
              ) : (
                <button
                  className={"btn-orange"}
                  onClick={() => openRequestModal("edit")}
                >
                  View Request
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* {modalIsOpen && ( */}
      <Modal
        isOpen={requestModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeRequestModal}
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
          closeModal={closeRequestModal}
          openDeclineSnackBar={openDeclineSnackBar}
          openApproveSnackBar={openApproveSnackBar}
          activeTabButton={activeTabButton}
        />
      </Modal>

      <Modal
        isOpen={resolvedModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeResolvedModal}
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
        <ResolvedRequestModal
          closeModal={closeResolvedModal}
          activeTabButton={activeTabButton}
        />
      </Modal>

      {declineSnackBar && (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 snackbar ">
          <Icon
            onClick={closeDeclineSnackBar}
            icon="system-uicons:cross"
            className="snackbar-close"
          />
          <p>Edit Request Decline</p>
          <button onClick={closeDeclineSnackBar}>Undo</button>
        </div>
      )}
      {approveSnackBar && (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 snackbar ">
          <Icon
            icon="teenyicons:tick-circle-outline"
            color="white"
            onClick={closeApproveSnackBar}
            className="snackbar-close"
          />
          <p>Signed in request approved</p>
          <button onClick={closeApproveSnackBar}>Undo</button>
        </div>
      )}
      {/* )} */}
    </div>
  );
}
