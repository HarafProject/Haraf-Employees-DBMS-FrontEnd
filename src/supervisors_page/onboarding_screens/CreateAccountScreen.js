
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import profile from '../../assets/logo-light.png';
import './onboarding.css'


export default function CreateAccountScreen() {




    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState("false");
    const [confirmPasswordType, setConfirmPasswordType] = useState("false");
    const [icon1, setIcon1] = useState("mdi:eye");
    const [icon2, setIcon2] = useState("mdi:eye");
    const togglePasswordVisiblity = () => {
        setPasswordType(passwordType ? false : true);
        setIcon1(!icon1);
    };
    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordType(confirmPasswordType ? false : true);
        setIcon2(!icon2);
    };

    const fieldName = `field_${Date.now()}`;
    return (
        <div className="onboarding-screen">
            {/* <div className="login-screen"> */}
            <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content">
                <div className="d-flex flex-column align-items-center signup-screen-logo">
                    <img src={profile} alt="" />
                    <p className='my-1 title '>Employees Database {<br />} Management System (EDMS)</p>
                </div>

                <form action="" className="mt-3">
                    <p className='screen-title mt-5'>SUPERVISOR CREATE ACCOUNT</p>
                    <div className="d-flex align-items-center">
                        <div className="mx-3">
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field my-4">

                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field d-flex align-items-center justify-content-between my-4">
                                <input autocomplete="new-password" className='' placeholder="Password *" type={passwordType ? "password" : "text"} name="password" />
                                <div onClick={togglePasswordVisiblity} className="eye">
                                    <Icon icon={icon1 ? "mdi:eye" : "mdi:eye-off"} />
                                </div>
                            </div>

                        </div>
                        <div className="mx-3">
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field d-flex align-items-center justify-content-between my-4">
                                <input autocomplete="new-password" className='' placeholder="Confirm Password *" type={confirmPasswordType ? "password" : "text"} name="password" />
                                <div onClick={toggleConfirmPasswordVisiblity} className="eye">
                                    <Icon icon={icon2 ? "mdi:eye" : "mdi:eye-off"} />
                                </div>
                            </div>

                        </div>
                    </div>

                </form>




                <div className="d-flex flex-column login-screen-button mt-3">
                    <button onClick={() => { navigate("/profile"); }} className="btn login my-4">Create Account</button>
                </div>
                <p className='forgot-password'>Already have an account? <span onClick={() => { navigate("/login"); }}> Click here</span> </p>
            </div>
            {/* </div> */}
        </div>

    )
}