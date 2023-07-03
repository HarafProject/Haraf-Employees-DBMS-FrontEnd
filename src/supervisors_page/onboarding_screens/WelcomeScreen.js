

import { useNavigate, useLocation } from "react-router-dom";
import profile from '../../assets/logo-light.png';
import './onboarding.css'


export default function WelcomeScreen() {
    
    const navigate = useNavigate();

    return (
        <div className="onboarding-screen">
            {/* <div className="welcome-screen"> */}
                <div className="d-flex flex-column justify-content-space-between  align-items-center welcome-screen-content">
                    <div className="welcomescreen-logo">
                        <img src={profile} alt="" />
                    </div>
                    <h1 className='my-4'>Employees Database {<br />} Management System (EDMS)</h1>
                    <p className='my-5'>Kindly select an action below</p>
                    <div className="d-flex flex-column welcome-screen-button mt-2">
                        <button onClick={() => { navigate("/createaccount"); }} className="btn create-account ">Create Account</button>
                        <button onClick={() => { navigate("/login"); }} className="btn login my-4">Login</button>
                    </div>
                </div>
            {/* </div> */}
        </div>

    )
}