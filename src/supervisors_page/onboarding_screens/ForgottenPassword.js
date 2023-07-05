import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './onboarding.css';
import { RotatingLines } from "react-loader-spinner";

export default function ForgottenPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",

    })

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

    // async function handleSubmit(e) {
    //     e.preventDefault()

    //     // Validate the form inputs
    //     const errors = validateForm();


    //     // If form validation fails
    //     if (Object.keys(errors).length > 0) {
    //         const firstFieldName = Object.keys(errors)[0];
    //         toast.error(errors[firstFieldName]);
    //         return;
    //     }
    //     setIsLoading(true)
    //     try {
    //         const data = await LoginMember(user);
    //         localStorage.setItem("AFCS-token", data.token)
    //         toast.success(data.message);

    //         setIsLoading(false);
    //         navigate("/dashboard", { replace: true })
    //         // return data;
    //     } catch (error) {
    //         setIsLoading(false);
    //         toast.error(error.error);
    //     }

    // }

    return (
        <div className="login-page pt-3 px-5">
            <div className=''>

                <div className="form d-flex flex-column align-items-center mt-5 px-5 pt-3">
                    <h1>Forgotten Password</h1>
                    To reset your password, an OTP will be sent to your email, please input the email address you registered with below
                    <form className='d-flex flex-column my-5'>
                        <input type="email" name="email" placeholder='email' required value={user.email} onChange={handleChange} />

                        {isLoading && <button className='login-btn'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button onClick={() => { navigate("/sendotp"); }} className='login-btn mt-4 mx-auto' >Send OTP</button>}



                    </form>
                    <p>Having Issues or don’t have access to email? <span  style={{ color: "#FB9129", fontWeight: "600" }}>Contact Admin</span></p>
                </div>
            </div>
        </div>
    )
}