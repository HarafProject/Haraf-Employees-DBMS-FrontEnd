import { useNavigate, useLocation } from "react-router-dom";
import profile from "../../assets/harafLogoWhite.png";
import mcrpLogo from "../../assets/mcrp_logo.jpeg";
import "./onboarding.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen welcome-screen">
      <div className="d-flex flex-column justify-content-space-between  align-items-center welcome-screen-content py-5">
        <div className="login-screen-logos"><img src={mcrpLogo} alt="" className="mcrp" />
          <img className="haraf" src={profile} alt="" />
          
        </div>
        <h1>MCRP/HARAF</h1>

        <p className="mt-5">Kindly select an action below</p>
        <div className="d-flex flex-column welcome-screen-button mt-5">
          <button
            onClick={() => {
              navigate("/create-account");
            }}
            className="btn create-account "
          >
            Create Account
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn login my-3"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
