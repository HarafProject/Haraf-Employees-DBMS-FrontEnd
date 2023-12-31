import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReusableInformationList from "../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./employeeprofile.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import SendRequestModal from "../../../component/reusable/modalscontent/SendRequestModal";
import supervisor from "../../../class/supervisor.class";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


export default function EmployeeProfilePage() {
  // const user = userData.user[0];
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const userData = location.state;
  const { offline } = useSelector((state) => state?.user);

  const navigate = useNavigate();

  const personalInfo = [
    { label: "Full Name", value: userData?.fullName },
    { label: "Phone Number", value: userData?.phone },
    { label: "Community", value: userData?.community },
  ];

  const bankInfo = [
    { label: "Account Name", value: userData?.fullName },
    { label: "Bank Name", value: userData?.bankName },
    { label: "Account Number", value: userData?.accountNumber },
  ];

  const otherInfo = [
    { label: "Head of Household", value: userData?.householdHead },
    { label: "Household Size", value: userData.householdSize },
    { label: "Special Ability", value: userData.specialDisability },
  ];

  function openModal(modalType) {
    setIsOpen(true);
    setModalType(modalType);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const goBack = () => {
    navigate(-1)
  };

  async function supervisorRequest(reason) {
    if (!reason) return toast.error("Please enter a reason for the request.");
    try {
      setIsLoading(true);
      if (modalType === "edit") {
        const { message } = await supervisor.editEmployeeRequest({
          reason,
          employeeId: userData._id,
        });
        toast.success(message);
      } else {
        const { message } = await supervisor.deleteEmployeeRequest({
          reason,
          employeeId: userData._id,
        });
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <div className="employee-profile-page">
      <ReusableHeader />
      <div className="profile-content my-3 p-5">
        <div className="back-to-previous my-5">
          <Icon
            icon="mdi:arrow-back-circle"
            onClick={goBack}
            className="arrowback-icon me-3"
          />
          Back to list
        </div>
        <div className="d-flex align-items-center  profile-info-summary">
          <div className="image me-1 pe-1">
            <img src={userData?.photo} alt="" />
          </div>

          <div className="d-flex">
            <div className="names mx-4">
              <h4> {userData?.fullName}</h4>
              <p>
                <span>Marital Status: </span>
                {userData?.maritalStatus}
              </p>
              <p>
                <span>Sex: </span> {userData?.sex}
              </p>
            </div>
            <div className="work-info mx-4">
              <p>
                {" "}
                <span>Work Topology: </span>
                {userData?.workTypology?.name}
                {":"} {(userData?.subWorkTypology?.name?.length > 45)? `${userData?.subWorkTypology?.name.substring(0, 45)}...`:userData?.subWorkTypology?.name}
              </p>
              <p>
                <span>Ward:</span> {userData?.ward?.name}
              </p>
              <p>
                <span>Age:</span> {userData?.age} Years
              </p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <ReusableInformationList
            title="Personal Information"
            information={personalInfo}
          />
          <ReusableInformationList
            title="Bank Information"
            information={bankInfo}
          />
          <ReusableInformationList
            title="Other Information"
            information={otherInfo}
          />
        </div>

        <div className="d-flex mt-2 benefiacy-profile-btn">
          {/* <button onClick={openModal} className="btn request-edit mt-5 ">Request Edit Access</button>
                    <button onClick={openModal} className="btn delete-user mt-5 mx-4">Delete Employee</button> */}

          {!offline && (
            <>
              {/* <button
                onClick={() => openModal("edit")}
                className="btn request-edit mt-5 "
              >
                Request Edit Access
              </button> */}
              <button
                onClick={() =>
                  navigate("/supervisor/edit-employee", {
                    state: { employee: userData._id },
                  })
                }
                className="btn request-edit mt-5 "
              >
                Edit
              </button>
              <button
                onClick={() => openModal("delete")}
                className="btn delete-user mt-5 mx-4"
              >
                Replace Employee
              </button>
            </>
          )}
        </div>
      </div>
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
        <SendRequestModal
          closeModal={closeModal}
          action={supervisorRequest}
          actionType={modalType}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}
