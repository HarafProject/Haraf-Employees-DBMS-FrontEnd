import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './adminforgotpassword.css'
import { Icon } from '@iconify/react';

export default function AdminLoginOtpVerify() {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    // useEffect(() => {
    //     let timeout;
    
    //     if (showSnackbar) {
    //       timeout = setTimeout(() => {
    //         setShowSnackbar(false);
    //         navigate('/createpassword');
    //       }, 3000); // Show snackbar for 3 seconds
    //     }
    
    //     return () => clearTimeout(timeout);
    //   }, [showSnackbar, navigate]);
    
      const handleClick = () => {
        // setShowSnackbar(true);
        navigate('/admin-create-password');
      };

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [countdown]);

    const handleResendOTP = () => {
        setCountdown(94); // Set the initial countdown time (e.g., 01:34)
        setShowSnackbar(false); // Assuming you want to hide the snackbar when resending OTP
    };





    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("Text");
        const otpArray = value.split("").slice(0, 6);
        setOtp([...otpArray, ...otp.slice(otpArray.length)]);
    };







    return (
        <div className="forgotpassword-screen">
            <div className=''>

                <div className="form d-flex flex-column align-items-center p-5">
                    <h1>OTP Verification</h1>
                    <p>A One Time Pin (OTP) has been sent to your registered phone number, kindly input the pin below</p>
                    <form className='d-flex flex-column my-5'>
                        <div className="otp-input">
                            {otp.map((digit, index) => (
                                <input
                                    type="number"
                                    key={index}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onPaste={handlePaste}
                                    maxLength={1}
                                />
                            ))}
                        </div>





                        <button className='btn forgotpassword-btn mt-4 mx-auto' onClick={handleClick} >Verify OTP</button>

                    </form>
                    {showSnackbar && (<div><span className=' d-flex align-items-center justify-content-around mx-4 snackbar py-2' >
                        <p>Verification Successful</p><Icon icon="clarity:success-standard-line" className='snackbar-icon' />
                    </span></div>)}

                    <p>
                        Yet to receive OTP?
                        {countdown > 0 ? (
                            <span style={{ color: "#FB9129", fontWeight: "600" }}>
                                {' '}
                                Resend OTP ({Math.floor(countdown / 60)
                                    .toString()
                                    .padStart(2, '0')}:
                                {Math.floor(countdown % 60).toString().padStart(2, '0')})
                            </span>
                        ) : (
                            <span style={{ color: "#FB9129", fontWeight: "600" }} onClick={handleResendOTP}>
                                {' '}
                                Resend OTP
                            </span>
                        )}
                    </p>



                </div>
            </div>
        </div>
    )
}