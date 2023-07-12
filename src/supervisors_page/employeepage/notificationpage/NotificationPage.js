import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import ReusableNotificationCard from "../../../component/reusable/reusablenotification/ReusableNotificationCard";
import "./notification.css";
import DeleteEmployeeSuccessModal from "../../../component/reusable/modalscontent/DeleteEmployeeSuccessModal";
import AddEmployeeScreen from "../addemployeepage/AddEmployee";

export default function NotificationScreen() {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleButtonClick = (buttonType, notification) => {
    if (buttonType === "Add") {
      setSelectedNotification(null);
      setIsOpen(false);
      navigate("/add-employee");
    } else if (buttonType === "Delete") {
      setSelectedNotification(notification);
      setIsOpen(true);
    } else if (buttonType === "Edit") {
      setSelectedNotification(notification);
      setIsOpen(false);
      navigate("/add-employee", { state: { prefilledData: notification } });
    }
  };

  const notificationList = [
    {
      message: "Request to edit Kadwama's profile approved",
      buttonType: "Edit",
      date_time: "5 mins ago",
    },
    {
      message: "Request to edit John Deo's profile approved",
      buttonType: "Edit",
      date_time: "30 mins ago",
    },
    {
      message: "Request to delete Kadwama's as an employee approved",
      buttonType: "Delete",
      date_time: "3 hrs ago",
    },
    {
      message: "Request to edit Lawblaze's profile approved",
      buttonType: "Edit",
      date_time: "3 hrs ago",
    },
    {
      message: "Request to add new employee approved",
      buttonType: "Add",
      date_time: "3 hrs ago",
    },
  ];
  return (
    <div className="notification-page">
      <ReusableHeader />

      <div className="notification my-3 p-5">
        <h1 className="mt-5">NOTIFICATIONS</h1>
        <div className="notification-list mt-3">
          <ReusableNotificationCard
            notificationContent={notificationList}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>

      {modalIsOpen && (
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
          <DeleteEmployeeSuccessModal closeModal={() => setIsOpen(false)} />
        </Modal>
      )}

      {selectedNotification && (
        <AddEmployeeScreen
          prefilledData={selectedNotification}
          closeModal={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
}
