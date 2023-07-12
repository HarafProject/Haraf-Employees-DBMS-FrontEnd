import React from 'react'
import { Icon } from '@iconify/react';

const OfflineMode = ({ closeModal, modalTitle }) => {

    return (
        <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
            <div className="">

                <div className="d-flex flex-column align-items-center modal-content">

                    <p className='mt-2 text-center no-network'>{modalTitle}</p>
                    <span className='mt-2 mb-5 text-center'></span>

                    <button className="btn modal-button delete-btn my-4" onClick={()=> {}}>
                        Use Offline Mode
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OfflineMode