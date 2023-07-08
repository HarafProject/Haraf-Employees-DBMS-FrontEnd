import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Icon } from '@iconify/react';
import './modalscreen.css'

export default function PasswordChangeSuccessModal({ closeModal }) {
    const navigate = useNavigate();

    const location = useLocation();

    return (
        <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>



            <div className="d-flex flex-column align-items-center modal-content">

                <Icon icon="ep:success-filled" className='success-icon my-3' />


                <p className='mt-4'>Password Changed Successfully </p>
                <span >Proceed to login, remember to use your new password</span>


                <button
                    className="btn modal-button my-4"
                    onClick={() => {
                        if (location.pathname === '/admin-create-password') {
                            navigate("/admin-login");
                        } else {
                            navigate("/login");
                        }
                    }
                    }
                >
                    Login
                </button>
            </div>



        </div>
    );
};