<<<<<<< HEAD
import React from "react";
import { useParams } from "react-router-dom";
import ReusableInformationList from "../../../component/reusable/employeeinformationcard/ReusableInformationList";
import "./employeeprofile.css";
import { Icon } from "@iconify/react";
import userData from "../../../component/data/EmployeesData";
import profileimage from "../../../assets/profile.png";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";

export default function EmployeeProfilePage() {
  // const user = userData.user[0];
=======
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReusableInformationList from '../../../component/reusable/employeeinformationcard/ReusableInformationList';
import './employeeprofile.css';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import userData from '../../../component/data/EmployeesData';
import profileimage from '../../../assets/profile.png'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader';
import SendRequestModal from '../../../component/reusable/modalscontent/SendRequestModal'

export default function EmployeeProfilePage() {
    // const user = userData.user[0];
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
>>>>>>> origin/admin_sidebar

  const { id } = useParams();
  const user = userData.find((user) => user.id === parseInt(id));
  if (!user) {
    return <p>Employee not found</p>;
  }
  const personalInfo = [
    { label: "Full Name", value: user.full_name },
    { label: "Address", value: user.home_address },
    { label: "Phone Number", value: user.phone_number },
  ];

  const bankInfo = [
    { label: "Account Name", value: user.full_name },
    { label: "Bank Name", value: user.bank_name },
    { label: "Account Number", value: user.account_number },
  ];

  const otherInfo = [
    { label: "Head of Household", value: user.head_of_house },
    { label: "Household Size", value: user.household_size },
    { label: "Special Disability", value: user.special_disability },
  ];

<<<<<<< HEAD
  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="employee-profile-page">
      <ReusableHeader />
      <div className="profile-content my-5 p-5">
        <div className="back-to-previous my-5">
          <Icon
            icon="mdi:arrow-back-circle"
            onClick={goBack}
            className="arrowback-icon me-3"
          />
          Back to list
=======

    function openModal(modalType) {
        setIsOpen(true);
        setModalType(modalType);
      }

    function closeModal() {
        setIsOpen(false);
    }
    const goBack = () => {
        window.history.go(-1);
    };

    return (
        <div className="employee-profile-page">
            <ReusableHeader />
            <div className="profile-content my-3 p-5">
                <div className="back-to-previous my-5">
                    <Icon icon="mdi:arrow-back-circle" onClick={goBack} className='arrowback-icon me-3' />
                    Back to list
                </div>
                <div className="d-flex align-item-start  profile-info-summary">
                    <img src={profileimage} alt="" />
                    <div className="d-flex my-3">
                        <div className="names mx-5">
                            <h4>{user.full_name}</h4>
                            <p>{user.marital_status}</p>
                            <p>{user.sex}</p>
                        </div>
                        <div className='work-info mx-5'>
                            <p> <span>Work Topology: </span>{user.work_typology}</p>
                            <p><span>Ward:</span> {user.ward}</p>
                            <p><span>Age:</span> {user.age} Years</p>
                        </div>
                    </div>

                </div>
                <div className='my-3'>
                    <ReusableInformationList title="Personal Information" information={personalInfo} />
                    <ReusableInformationList title="Bank Information" information={bankInfo} />
                    <ReusableInformationList title="Other Information" information={otherInfo} />
                </div>

                <div className='d-flex mt-2'>
                    {/* <button onClick={openModal} className="btn request-edit mt-5 ">Request Edit Access</button>
                    <button onClick={openModal} className="btn delete-user mt-5 mx-4">Delete Employee</button> */}
                    <button onClick={() => openModal('edit')} className="btn request-edit mt-5 ">Request Edit Access</button>
  <button onClick={() => openModal('delete')} className="btn delete-user mt-5 mx-4">Delete Employee</button>
                </div>
            </div>
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
                
                <SendRequestModal closeModal={closeModal} actionType={modalType}/>
            </Modal>
>>>>>>> origin/admin_sidebar
        </div>
        <div className="d-flex align-item-start  profile-info-summary">
          <img src={profileimage} alt="" />
          <div className="d-flex my-3">
            <div className="names mx-5">
              <h4>{user.full_name}</h4>
              <p>{user.marital_status}</p>
              <p>{user.sex}</p>
            </div>
            <div className="work-info mx-5">
              <p>
                {" "}
                <span>Work Topology: </span>
                {user.work_typology}
              </p>
              <p>
                <span>Ward:</span> {user.ward}
              </p>
              <p>
                <span>Age:</span> {user.age} Years
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
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
      </div>
    </div>
  );
}
