import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import ReusableNotificationCard from "../../../component/reusable/reusablenotification/ReusableNotificationCard";
import "./notification.css";
import DeleteEmployeeSuccessModal from "../../../component/reusable/modalscontent/DeleteEmployeeSuccessModal";
import AddEmployeeScreen from "../addemployeepage/AddEmployee";
import { useQuery } from "react-query";
import supervisor from "../../../class/supervisor.class";
import { toast } from "react-toastify";
import ViewReason from "../../../component/reusable/modalscontent/ViewReason";

const fetchNotifications = async (key) => {
  try {
    const res = await supervisor.getNotifications();
    return res;
  } catch (error) {
    toast.error(error?.error);
  }
};
export default function NotificationScreen() {
  // React query fecth data
  const { data, status } = useQuery(['fetchNotifications'], fetchNotifications)
  const [notificationList, setNotificationList] = useState([])
  const [reason, setReason] = useState(null)
  const [employeeToDelete, setEmployeeToDelete] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState("")
  useEffect(() => {
    if (!data) return;

    let notice = []
    for (let i = 0; i < data.notifications.length; i++) {
      console.log(data.notifications[i])
      if (data.notifications[i].request?.type === "add-employee") {

 

        notice.push({
          message: `Request to edit beneficiary has been ${data.notifications[i].request?.status}.`,
          buttonType: data.notifications[i].request?.status === "declined" ? "View Reason" : data.notifications[i]?.actionTaken ? "Completed" : "Edit",
          date_time: data.notifications[i]?.createdAt,
          reason: data.notifications[i]?.reason,
          employee: data.notifications[i]?.request?.employee?._id,
          notificationId: data.notifications[i]?._id
        })
      } else {
        notice.push({
          message: `Request to delete beneficiary has been ${data.notifications[i]?.request?.status}.`,
          buttonType: data.notifications[i].request?.status === "declined" ? "View Reason" : data.notifications[i]?.actionTaken ? "Completed" : "Delete",
          date_time: data.notifications[i]?.createdAt,
          reason: data.notifications[i]?.reason,
          employee: data.notifications[i]?.request?.employee?._id,
          employeeName: data.notifications[i]?.request?.employee?.fullName,
          notificationId: data.notifications[i]?._id
        })
      }
    }
    setNotificationList(notice)
  }, [data])

  const closeModal = () => {
    setIsOpen(false);
  };


  const navigate = useNavigate();

  const handleButtonClick = (buttonType, notification) => {
    if (buttonType === 'Add') {
      setSelectedNotification(null);
      setIsOpen(false);
      navigate('/supervisor/add-employee');

    } else if (buttonType === 'Delete') {
      setSelectedNotification(notification);
      setEmployeeToDelete({
        notification: notificationList[notification].notificationId,
        name: notificationList[notification].employeeName,
        id: notificationList[notification].employee
      })
      setIsOpen(true);


    } else if (buttonType === 'Edit') {
      setSelectedNotification(notification);
      setIsOpen(false);

      navigate('/supervisor/edit-employee',
        {
          state: {
            employee: notificationList[notification].employee,
            notificationId: notificationList[notification].notificationId
          }
        });
    } else if (buttonType === "View Reason") {
      setIsOpen(true);
      setReason(notificationList[notification].reason)
    }
  };


  // const notificationList = [
  //     {
  //         message: "Request to edit Kadwama's profile approved",
  //         buttonType: "Edit",
  //         date_time: "5 mins ago"
  //     },
  //     {
  //         message: "Request to edit John Deo's profile approved",
  //         buttonType: "Edit",
  //         date_time: "30 mins ago",
  //     },
  //     {
  //         message: "Request to delete Kadwama's as an employee approved",
  //         buttonType: "Delete",
  //         date_time: "3 hrs ago"
  //     },
  //     {
  //         message: "Request to edit Lawblaze's profile approved",
  //         buttonType: "Edit",
  //         date_time: "3 hrs ago"
  //     },
  //     {
  //         message: "Request to add new employee approved",
  //         buttonType: "Add",
  //         date_time: "3 hrs ago"
  //     },
  // ];
  return (
    <div className="notification-page">
      <ReusableHeader />

      <div className="notification my-3 p-5">
        <h1 className="mt-5">NOTIFICATIONS</h1>
        <div className="notification-list mt-3">
          <ReusableNotificationCard notificationContent={notificationList} onButtonClick={handleButtonClick} />
        </div>
      </div>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className={{
            base: 'modal-base',
            afterOpen: 'modal-base_after-open',
            beforeClose: 'modal-base_before-close'
          }}
          overlayClassName={{
            base: 'overlay-base',
            afterOpen: 'overlay-base_after-open',
            beforeClose: 'overlay-base_before-close'
          }}
          shouldCloseOnOverlayClick={true}
          closeTimeoutMS={2000}
        >
          {
            reason ?
              <ViewReason reason={reason}
                closeModal={closeModal}
                modalTitle={"Admin Decline Reason"} />
              :
              < DeleteEmployeeSuccessModal
                closeModal={() => setIsOpen(false)}
                employee={employeeToDelete}
              />
          }

        </Modal>
      )}

      {selectedNotification && (
        <AddEmployeeScreen
          prefilledData={selectedNotification}
          closeModal={() => setSelectedNotification(null)}
        />
      )}

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
          {reason ? (
            <ViewReason
              reason={reason}
              closeModal={closeModal}
              modalTitle={"Admin Decline Reason"}
            />
          ) : (
            <DeleteEmployeeSuccessModal closeModal={() => setIsOpen(false)} />
          )}
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
