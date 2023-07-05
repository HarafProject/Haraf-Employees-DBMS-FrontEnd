
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './forgotpassword.css'
import { LoginMember } from "../../../utils/api/member";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Modal from 'react-modal';
import PasswordChangeSuccessModal from "../../../component/reusable/modalscontent/PasswordChangeSuccessModal";





export default function CreateNewPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("")

    const [user, setUser] = useState({
        email: "",
        password: "",

    })
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!user.email) {
            errors.email = 'Email Address is required';
        } else if (!isValidEmail(user.email)) {
            errors.email = 'Invalid email format';
        }

        if (!user.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    // Helper functions for email and phone number validation
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function handleSubmit(e) {
        e.preventDefault()

        // Validate the form inputs
        const errors = validateForm();


        // If form validation fails
        if (Object.keys(errors).length > 0) {
            const firstFieldName = Object.keys(errors)[0];
            toast.error(errors[firstFieldName]);
            return;
        }
        setIsLoading(true)
        try {
            const data = await LoginMember(user);
            localStorage.setItem("AFCS-token", data.token)
            toast.success(data.message);

            setIsLoading(false);
            navigate("/dashboard", { replace: true })
            openModal()
            // return data;
        } catch (error) {
            setIsLoading(false);
            toast.error(error.error);
        }

    }
    return (
        <div className="forgotpassword-screen ">
            <div className="">
                 <div className="form d-flex flex-column align-items-center p-5">
                <h1>Create New Password</h1>
                <p>Create new password to use for logging into your active farmers account, do not share your new password with anyone</p>
                <form className='d-flex flex-column mt-5 '>

                    <div className="my-2">
                        <input type="password" name="password" placeholder='password' required  onChange={handleChange} />
                        <p className="text-end  create">Must be at least 6 characters</p>
                    </div>
                    <div className="my-2">
                        <input type="password" name="password" placeholder='password' required  onChange={handleChange} />
                        <p className="text-end  create">Both passwords must match</p>
                    </div>

                    {isLoading && <button className='btn forgotpassword-btn mt-4 mx-auto'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                    {!isLoading && <button className='btn forgotpassword-btn mt-4 mx-auto' onClick={openModal}>Done</button>}



                </form>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Enter OTP"
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
                    <PasswordChangeSuccessModal
                        message={message} />
                        {/* <OtpInputModal message={message} /> */}
                </Modal>
                
            </div>
            </div>
           
        </div>
    )
}