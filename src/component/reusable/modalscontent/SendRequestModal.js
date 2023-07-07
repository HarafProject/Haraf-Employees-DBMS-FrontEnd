import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import './sendrequestmodal.css'

export default function SendRequestModal({ closeModal }) {
  const [requestText, setRequestText] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)

  const handleRequestTextChange = (event) => {
    setRequestText(event.target.value)
  }
  const handleSendRequest = () => {
    closeModal()

    setShowSnackbar(true)
  }

  useEffect(() => {
    let timeout
    if (showSnackbar) {
      timeout = setTimeout(() => {
        setShowSnackbar(false)
      }, 500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [showSnackbar])

  return (
    <div
      className='sendrequest-modal px-5 py-1 my-3'
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className=''>
        <button className='btn close-button' onClick={closeModal}>
          <Icon icon='icons8:cancel' className='close-icon' />
        </button>

        <div className='d-flex flex-column align-items-center modal-content'>
          <div className='d-flex align-items-center modal-title '>
            <Icon icon='fluent:shield-error-24-filled' className='error-icon' />
            <span>Add New Employee Request </span>
          </div>

          <p className='mt-4'>
            You don't have permission to edit an employees profile, request
            access from super admin by stating reason for profile edit
          </p>

          <textarea
            className='textarea mt-3 p-2'
            placeholder='Type here'
            value={requestText}
            onChange={handleRequestTextChange}
          />

          <button className='btn send-button my-4' onClick={handleSendRequest}>
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}
