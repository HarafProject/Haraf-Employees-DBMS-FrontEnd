import { useState } from "react";
import { Icon } from '@iconify/react';
import './modalscreen.css'
import { useNavigate } from 'react-router-dom';
import supervisor from '../../../class/supervisor.class';
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function DeleteEmployeeSuccessModal({ closeModal, employee }) {
  const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate()

  async function deleteEmployee() {
    try {
      setIsLoading(true)
      const { message } = await supervisor.deleteEmployee(employee.id, employee.notification)
      toast.success(message)
      closeModal()
      navigate('/supervisor/employee-list')
    } catch (error) {
      console.log(error)
      toast.error(error)
      toast.error(error.error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className='modal-screen px-5 py-1 my-3' isOpen={true} onRequestClose={closeModal}>
      <div className="">
        <button className="btn close-button delete-close-btn" onClick={closeModal}>

          <Icon icon="ic:round-cancel" className='close-icon' />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">


          <p className='mt-2 text-center no-network'>Delete Supervisor?</p>
          <span className='mt-2 mb-5 text-center'>
            Are you sure you want to permanently delete {employee.name} as an supervisor? This will remove Joseph's as an supervisor on the LIPWDMS portal</span>

          {isLoading && <center className="btn modal-button delete-btn my-4"><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></center>}

          {
            !isLoading &&
            <button className="btn modal-button delete-btn my-4" onClick={deleteEmployee}>
              Delete
            </button>
          }
        </div>
      </div>

    </div>

  );
}
