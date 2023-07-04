
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import profile from '../../assets/logo-light.png';
import './onboarding.css'
import SelectField from "../../component/reusable/reusableselectfield/SelectField";


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


    return (
        <div className="onboarding-screen">
            {/* <div className="login-screen"> */}
            <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content py-5">
                <div className="d-flex flex-column align-items-center signup-screen-logo">
                    <img src={profile} alt="" className="" />
                    <p className='mt-3 title text-center'>LIPW Management System{<br />}(LIPWMS)</p>
                </div>

                <form action="" className="mt-3">
                    <p className='screen-title text-center mt-5'>Supervisor SIGNUP</p>
                    <div className="d-flex align-items-start">
                        <div className="mx-3">
                            <div className="form-field my-4">
                                <input autocomplete="new-firstname" type="text" name="fname" placeholder='FirstName *' />
                            </div>
                            <div className="form-field my-4">
                                <input autocomplete="new-phone" type="tel" name="phone" placeholder='Phone Number *' />
                            </div>
                            <div className="form-field my-4">
                                <select name="lga" id="">
                                    <option value="">Zonal Region</option>
                                    <option value="">Adamawa North</option>
                                    <option value="">Adamawa South</option>
                                    <option value="">Adamawa Central</option>
                                </select>

                            </div>

                            <div className="form-field d-flex align-items-center justify-content-between my-4">
                                <input autocomplete="new-password" className='' placeholder="Password *" type={passwordType ? "password" : "text"} name="password" />
                                <div onClick={togglePasswordVisiblity} className="eye">
                                    <Icon icon={icon1 ? "mdi:eye" : "mdi:eye-off"} />
                                </div>
                            </div>
                            <span className="">Must be at least 8 characters {<br />}
                                Must have at least one special character {<br />}
                                Must  have at least one number and alphabet</span>

                        </div>
                        <div className="mx-3">
                            <div className="form-field my-4">
                                <input autocomplete="new-surname" type="text" name="surname" placeholder='Surname *' />
                            </div>
                            <div className="form-field my-4">
                                <input autocomplete="new-email" type="email" name="" placeholder='Email Address *' />
                            </div>
                            <div className="form-field my-4">
                                <select name="lga" id="">
                                    <option>LGA*</option>
                                    <option>Numan</option>
                                    <option>Girei</option>
                                    <option>Numan</option>
                                    <option>Hong</option>
                                    <option>Michika</option>
                                    <option>Yola-North</option>
                                </select>

                            </div>
                            <div className="form-field d-flex align-items-center justify-content-between my-4">
                                <input autocomplete="new-password" className='' placeholder="Confirm Password *" type={confirmPasswordType ? "password" : "text"} name="password" />
                                <div onClick={toggleConfirmPasswordVisiblity} className="eye">
                                    <Icon icon={icon2 ? "mdi:eye" : "mdi:eye-off"} />
                                </div>
                            </div>
                            <span className="float-end">Both passwords must match</span>

                        </div>
                    </div>

                </form>




                <div className="d-flex flex-column login-screen-button mt-3">
                    <button onClick={() => { navigate("/login"); }} className="btn login my-4">Create Account</button>
                </div>
                <p className='forgot-password'>Already have an account? <span onClick={() => { navigate("/login"); }}> Click here</span> </p>
            </div>
            {/* </div> */}
        </div>

    )
}