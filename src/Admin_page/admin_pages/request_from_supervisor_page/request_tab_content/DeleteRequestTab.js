import { useState, useEffect } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import ResolvedRequestModal from "../../../../component/reusable/modalscontent/ResolvedRequestModal";
import "./requestDetail.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import EmployeeRequest from "../../../../class/admin.requestsFromSupervisor.class";
import axios from "axios";

export default function DeleteRequestTab() {

  const [requestModalIsOpen, setIsRequestModalOpen] = useState(false);
  const [itemIdToModal, setItemIdToModal] = useState(0)
  const [resolvedModalIsOpen, setResolvedIsModalOpen] = useState(false);

  const [declineSnackBar, setDeclineSnackBar] = useState(false);
  const [approveSnackBar, setApproveSnackBar] = useState(false);

  const [deleteData, setDeleteData] = useState([]);
  const [modalData, setModalData] = useState()


  const openDeclineSnackBar = async () => {
    const res = await EmployeeRequest.handleSupervisorRequest(itemIdToModal,"delete","declined");

    // const res = await axios.delete(`https://example.com/id/${itemIdToModal}`);

    setDeclineSnackBar(true);
  };

  const closeDeclineSnackBar = () => {
    setDeclineSnackBar(false);
  };

  const openApproveSnackBar = async () => {
    setApproveSnackBar(true);
    setApproveSnackBar(true);
    const res = await EmployeeRequest.handleSupervisorRequest(itemIdToModal,"delete","approved");
   
  };

  const closeApproveSnackBar = () => {
    setApproveSnackBar(false);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };
  const [activeTabButton, setActiveTabButton] = useState("");

  function openRequestModal(activeTabButton, item) {

    setIsRequestModalOpen(true);
    setActiveTabButton(activeTabButton);
    setItemIdToModal(item._id);
    setModalData(item)
  }
  const closeResolvedModal = () => {
    setResolvedIsModalOpen(false);
  };

  function openResolvedModal(activeTabButton) {
    setResolvedIsModalOpen(true);
    setActiveTabButton(activeTabButton);
  }


  const handleFetchDeleteRequestData = async () => {
    try {
      const { data } = await EmployeeRequest.getAllDeleteEmployeeRequest();
      setDeleteData(data);
      console.log('DEGLETdE DAggTA', deleteData)
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    handleFetchDeleteRequestData();
  }, []);

  return (
    <div>
      <div>
        <div>
          {
            deleteData?.map((item, i) => (
              <div
                className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
                key={item._id}
              >

                <p> <span style={{ marginRight: '10px' }}>{i + 1}</span>Delete Employee request from {item.user.firstname} {item.user.surname}</p>

                {item.status === "Resolved" ? (
                  <button
                    className={"btn-black"}
                    onClick={() => openResolvedModal("delete")}
                  >
                    Resolved
                  </button>
                ) : (
                  <button
                    className={"btn-orange"}
                    onClick={() => {
                      openRequestModal("delete", item);
                      setModalData(item);
                    }}
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
          modalData={modalData}

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
          <p>Delete Employee request Declined Succesfully</p>
          <button onClick={closeDeclineSnackBar}>Close</button>
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
          <p>Delete Employee request approved Succesfully</p>
          <button onClick={closeApproveSnackBar}>Close</button>
        </div>
      )}
      {/* )} */}
    </div>
  );
}
