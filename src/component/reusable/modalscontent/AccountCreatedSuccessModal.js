import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import './modalscreen.css'
import { useNavigate } from 'react-router-dom';

export default function AccountCreateSuccessModal({ closeModal }) {
    const navigate = useNavigate();
    return (
        <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            <div className="">
                <button className="btn close-button" onClick={closeModal}>
                    <Icon icon="icons8:cancel" className='close-icon' />
                </button>

                <div className="d-flex flex-column align-items-center modal-content">



                        <Icon icon="ep:success-filled"  className='success-icon' />
                        <p className='mt-2 text-center no-network'>Account Created Successfully</p>
                        <span className='mt-2 mb-5 text-center'>Your account has been successfully created, the super admin will grant you access in a short while, use the link in the confirmation email to login with your email and password</span>
                 

                    <button className="btn modal-button my-4" onClick={() => { navigate("/login"); }}>
                       ok
                    </button>
                </div>
            </div>

          

        </div>
    );
};
