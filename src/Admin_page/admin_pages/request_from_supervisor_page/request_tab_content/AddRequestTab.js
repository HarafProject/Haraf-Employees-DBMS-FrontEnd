import { useEffect, useState } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import EmployeeRequest from "../../../../class/admin.requestsFromSupervisor.class";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function AddRequestTab({setIsSubmitting}) {
  const [requestModalIsOpen, setIsRequestModalOpen] = useState(false);
  const [resolvedModalIsOpen, setResolvedIsModalOpen] = useState(false);

  const [declineSnackBar, setDeclineSnackBar] = useState(false);
  const [approveSnackBar, setApproveSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [itemIdToModal, setItemIdToModal] = useState(0);
  const [modalData, setModalData] = useState()
  const [addData, setAddData] = useState([]);

  const openDeclineSnackBar = async () => {

    try {
      setIsSubmitting(true)
      const res = await EmployeeRequest.handleSupervisorRequest(itemIdToModal, "add", "declined");
      setDeclineSnackBar(true);
      setAddData(addData.filter(item => item._id !== res.request._id))
    } catch (error) {
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsSubmitting(false)
    }


  };

  const closeDeclineSnackBar = () => {
    setDeclineSnackBar(false);
  };

  const openApproveSnackBar = async () => {
    try {
      setIsSubmitting(true)
      const res = await EmployeeRequest.handleSupervisorRequest(itemIdToModal, "add", "approved");
      setApproveSnackBar(true);
      setAddData(addData.filter(item => item._id !== res.request._id))
    } catch (error) {
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsSubmitting(false)
    }

    // console.log(res);
  };

  const closeApproveSnackBar = () => {
    setApproveSnackBar(false);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };
  const [activeTabButton, setActiveTabButton] = useState("");

  function openRequestModal(activeTabButton, itemId,) {
    setIsRequestModalOpen(true);
    setActiveTabButton(activeTabButton);
    setItemIdToModal(itemId._id);
  }
  const closeResolvedModal = () => {
    setResolvedIsModalOpen(false);
  };


  function openResolvedModal(activeTabButton) {
    setResolvedIsModalOpen(true);
    setActiveTabButton(activeTabButton);
  }

  const handleFetchAddRequestData = async () => {
    try {
      setIsLoading(true)
      const { data } = await EmployeeRequest.getAllAddEmployeeRequest();
      setAddData(data)

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    handleFetchAddRequestData();
  }, []);


  return (
    <div>
      <div>
        {isLoading && <div className='d-flex align-items-center px-5 py-3'><RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc" }}>Loading please wait...</p></div>}
        <div>
          {addData?.map((item, i) => (
            <div
              className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
              key={item._id}
            >
              <p> <span style={{ marginRight: '10px' }}>{i + 1}</span>Add Beneficiary request from {item.user.firstname} {item.user.surname}</p>

              {item.status === "Resolved" ? (
                <button
                  className={"btn-black"}
                  onClick={() => openResolvedModal("add")}
                >
                  Resolved
                </button>
              ) : (
                <button
                  className={"btn-orange"}
                  onClick={() => {
                    if (!isLoading) {
                      openRequestModal("add", item);
                      setModalData(item);
                    }

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

     

      {declineSnackBar && (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 snackbar ">
          <Icon
            onClick={closeDeclineSnackBar}
            icon="system-uicons:cross"
            className="snackbar-close"
          />
          <p>Add Beneficiary request Declined Succesfully</p>
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
          <p>Add Beneficiary request Declined Succesfully</p>
          <button onClick={closeDeclineSnackBar}>Close</button>
        </div>
      )}
      {/* )} */}
    </div>
  );
}
