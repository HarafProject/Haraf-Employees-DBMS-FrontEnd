import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import './forgotpassword.css'
import { Icon } from '@iconify/react';

export default function LoginOtpVerify() {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
            
        }, 3000);navigate('/createpassword');
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




                        {/* {isLoading && <button className='login-btn'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-4 mx-auto' onClick={handleClick} >Verify OTP</button>} */}
                        <button className='btn forgotpassword-btn mt-4 mx-auto' onClick={handleClick} >Verify OTP</button>

                    </form>
                    {showSnackbar ? (<button className=' d-flex align-items-center btn mx-4 profile-saved' >
                        <p>Verification Successful</p><Icon icon="clarity:success-standard-line" className='btn-icon' />
                    </button>)
                        : (
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
                        // <p>Yet to receive OTP?<a href="" style={{ color: "#FB9129", fontWeight: "600" }} onClick={handleResendOTP}> {' '} Resend OTP ({countdown.toString().padStart(2, '0')})</a></p>
                        )
                        }

                </div>
            </div>
        </div>
    )
}