import { useEffect, useState } from "react";
import ViewRequestModal from "../../../../component/reusable/modalscontent/ViewRequestModal";
import ResolvedRequestModal from "../../../../component/reusable/modalscontent/ResolvedRequestModal";
import "./requestDetail.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import EmployeeRequest from "../../../../class/admin.requestsFromSupervisor.class";

export default function AddRequestTab() {

 


  const data = [
    { id: 1, name: "Kishimu Shanwas", status: "Veiw Request" },
    { id: 2, name: "JKishimu Shanwas", status: "Veiw Request" },
    { id: 3, name: "BKishimu Shanwas", status: "Veiw Request" },
    { id: 4, name: "AKishimu Shanwas", status: "Veiw Request" },
    { id: 4, name: "AKishimu Shanwas", status: "Resolved" },
    { id: 4, name: "AKishimu Shanwas", status: "Resolved" },
  ];
  const [requestModalIsOpen, setIsRequestModalOpen] = useState(false);
  const [resolvedModalIsOpen, setResolvedIsModalOpen] = useState(false);

  const [declineSnackBar, setDeclineSnackBar] = useState(false);
  const [approveSnackBar, setApproveSnackBar] = useState(false);

  const [itemIdToModal, setItemIdToModal] = useState(0);
   const [addData, setAddData] = useState([]);

  const openDeclineSnackBar = async() => {
    setDeclineSnackBar(true);
      const res = await EmployeeRequest.declineEmployeeRequest({
      itemIdToModal
    });

  };

  const closeDeclineSnackBar = () => {
    setDeclineSnackBar(false);
  };

  const openApproveSnackBar = async() => {
    setApproveSnackBar(true);
        const res = await EmployeeRequest.declineEmployeeRequest({
       itemIdToModal
     });
// console.log(res);
  };

  const closeApproveSnackBar = () => {
    setApproveSnackBar(false);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };
  const [activeTabButton, setActiveTabButton] = useState("");

  function openRequestModal(activeTabButton,itemId) {
    setIsRequestModalOpen(true);
    setActiveTabButton(activeTabButton);
    setItemIdToModal(itemId);
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
       const {data} = await EmployeeRequest.getAllAddEmployeeRequest();
       setAddData(data)
       console.log("this is add request", data);
      
     } catch (error) {
       console.error(error);
       
     }
   };

   useEffect(() => {
     handleFetchAddRequestData();
   }, []);

   
  return (
    <div>
      <div>
        <div>
          {addData.length &&
            addData.map((item) => (
              <div
                className="d-flex justify-content-between my-4 px-4 py-2 request-bg"
                key={item._id}
              >
                <p>
                  Edit Kadwama Lazarus’s profile request from
                  {item.name}
                </p>

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
                    onClick={() => openRequestModal("add", item._id)}
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
