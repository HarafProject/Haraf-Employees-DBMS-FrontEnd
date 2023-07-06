import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import './modalscreen.css'

export default function NoNetworkModal({ closeModal }) {

    return (
        <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            <div className="">
                <button className="btn close-button" onClick={closeModal}>
                    <Icon icon="icons8:cancel" className='close-icon' />
                </button>

                <div className="d-flex flex-column align-items-center modal-content">



                        <Icon icon="carbon:network-public"  className='network-icon' />
                        <p className='mt-2 text-center no-network'>No Nerwork</p>
                        <span className='mt-2 mb-5 text-center'>There seems to be no network connection, use offline mode by tapping the button below to take attendance and store data locally  </span>
                 

                    <button className="btn modal-button my-4" onClick={closeModal}>
                       Use Offline Mode
                    </button>
                </div>
            </div>

          

        </div>
    );
};
