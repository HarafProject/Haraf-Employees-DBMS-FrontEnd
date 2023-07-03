
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import profile from '../../assets/logo-light.png';
import './onboarding.css'


export default function LoginScreen() {




    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState("false");
    const [icon, setIcon] = useState("ph:eye-light");
    const togglePasswordVisiblity = () => {
        setPasswordType(passwordType ? false : true);
        setIcon(!icon);
    };

const fieldName = `field_${Date.now()}`;
    return (
        <div className="onboarding-screen">
            {/* <div className="login-screen"> */}
            <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content">
                <div className="signup-logo">
                    <img src={profile} alt="" />
                    <p className='my-1 title'>Employees Database {<br />} Management System (EDMS)</p>
                </div>

                <form action="" className="mt-3">
                    <p className='screen-title mt-5'>SUPERVISOR LOGIN</p>

                    <div>

                        <div className="form-field my-4">
                            <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                        </div>
                        <div className="form-field d-flex align-items-center justify-content-between my-4">
                            <input autocomplete="new-password" className='' placeholder="Password *" type={passwordType ? "password" : "text"} name="password" />
                            <div onClick={togglePasswordVisiblity} className="eye">
                                <Icon icon={icon ? "mdi:eye" : "mdi:eye-off"} />
                            </div>
                        </div>

                    </div>
                </form>




                <div className="d-flex flex-column login-screen-button mt-3">
                    <button onClick={() => { navigate("/profile"); }} className="btn login my-4">Login</button>
                </div>
                <p className='forgot-password'>Forgotten Password? <span> Reset Here</span> </p>
            </div>
            {/* </div> */}
        </div>

    )
}