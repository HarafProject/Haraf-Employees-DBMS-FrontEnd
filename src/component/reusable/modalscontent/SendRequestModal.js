import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './modalscreen.css'

export default function SendRequestModal({ closeModal, actionType }) {
    const [requestText, setRequestText] = useState('');
    // const [showSnackbar, setShowSnackbar] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  

    const handleRequestTextChange = (event) => {
        setRequestText(event.target.value);
    };
    const handleSendRequest = () => {
        closeModal();

        // setShowSnackbar(true);
    };


    // useEffect(() => {
    //     let timeout;
    //     if (showSnackbar) {
    //         timeout = setTimeout(() => {
    //             setShowSnackbar(false);
    //         }, 500);
    //     }

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [showSnackbar]);


    useEffect(() => {
        if (actionType === 'add') {
          setModalTitle('Add New Employee Request ');
          setModalText("You don’t have permission to add new employees after initial data capture, kindly request access to the regional lead by stating reason for the request below");
        } else if (actionType === 'edit') {
            setModalTitle('Profile Edit Request');
            setModalText("You don't have permission to edit an employees profile, request access from super admin by stating reason for profile edit");
          }
        else if (actionType === 'delete') {
            setModalTitle('Delete employee Request');
            setModalText("You don't have permission to delete an employees, request access from super admin by stating reason to delete employee");
          }
      }, [actionType]);
    



    return (
        <div className='modal-screen sendrequest-modal px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            <div className="">
                <button className="btn close-button" onClick={closeModal}>
                    <Icon icon="icons8:cancel" className='close-icon' />
                </button>

                <div className="d-flex flex-column align-items-center modal-content">
                    <div className="d-flex align-items-center modal-title ">
                        <Icon icon="fluent:shield-error-24-filled" className='error-icon' />
                        {/* <span>Add New Employee Request </span> */}<span>{modalTitle}</span>
                    </div>
                    
        

          <p className='mt-4'>{modalText}</p>
                    {/* <p className='mt-4'>You don't have permission to edit an employees profile, request access from super admin by stating reason for profile edit</p> */}

                    <textarea className="textarea mt-3 p-2" placeholder='Type here' value={requestText} onChange={handleRequestTextChange} />

                    <button className="btn modal-button my-4" onClick={handleSendRequest}>
                        Send Request
                    </button>
                </div>
            </div>

          

        </div>
    );
};