import { useNavigate, useLocation } from "react-router-dom";
import profile from "../../assets/logo.png";
import "./adminonboarding.css";

export default function AdminWelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="admin-onboarding admin-welcome">
      {/* <div className="welcome-screen"> */}
      <div className="d-flex flex-column justify-content-space-between  align-items-center asmin-welcome-content py-5">
        <div className="welcomescreen-logo">
          <img src={profile} alt="" />
        </div>
        <h1 className="my-2">LIPW Management System</h1>
        <p className="mt-5">Hello Admin, Kindly select an action below</p>
        <div className="d-flex flex-column welcome-screen-button mt-5">
          <button
            onClick={() => {
              navigate("/admin-create-account");
            }}
            className="btn create-account "
          >
            Create Account
          </button>
          <button
            onClick={() => {
              navigate("/admin-login");
            }}
            className="btn login my-3"
          >
            Login
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
