import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminSupervisorList from '../../data/ListOfAdminSupervisors';
import { Icon } from '@iconify/react';
import './modalscreen.css';



export default function ManageSupervisorModal({ closeModal, buttonClick, supervisorName, getRole }) {

    const navigate = useNavigate();
    const [actionTitle, setActionTitle] = useState('');
    const [actionText, setActionText] = useState('');
    const [buttonText, setButtonText] = useState('')
    

    useEffect (() => {
       if (buttonClick === 'verify') {
            setActionTitle('Verify Supervisor');
            setActionText(`Are you sure you want to verify ${supervisorName} as a ${getRole}? This will allow ${supervisorName} to have full access to the LIPWDMS portal`);
            setButtonText("Verify");

          }
        else if (buttonClick === 'delete') {
            setActionTitle('Delete Supervisor');
            setActionText(`Are you sure you want to permanently delete ${supervisorName} as a ${getRole}? This will disable ${supervisorName} account on the LIPWDMS portal`);
            setButtonText("Delete");
          }
      }, [buttonClick, supervisorName]);

    return (
        <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            <div className="">
                <button className="btn close-button delete-close-btn" onClick={closeModal}>
              
                    <Icon icon="ic:round-cancel" className='close-icon' />
                </button>

                <div className="d-flex flex-column align-items-center modal-content">


                        <p className='mt-2 text-center no-network'>{actionTitle}</p>
                        <span className='mt-2 mb-5 text-center'>{actionText}</span>
                 

                    <button className={`btn modal-button my-4 ${buttonText === 'Verify' ? "verify-btn" : "delete-btn"}`} onClick={closeModal}>
                      {buttonText}
                    </button>
                </div>
            </div>

          

        </div>
    );
};
