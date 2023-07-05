import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sendrequestmodal.css'

export default function PasswordChangeSuccessModal({ closeModal }) {
    const navigate = useNavigate();

    

    return (
        <div className='sendrequest-modal px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            
               

                <div className="d-flex flex-column align-items-center modal-content">
                    <div className=" modal-title ">
                        <Icon icon="ep:success-filled" className='success-icon my-3' />
                        <span>Password Changed Successfully </span>
                    </div>

                    <p className='mt-4'>Proceed to login, remember to use your new password</p>


                    <button className="btn send-button my-4" onClick={() => { navigate("/login"); }}>
                        Login
                    </button>
                </div>

          

        </div>
    );
};
