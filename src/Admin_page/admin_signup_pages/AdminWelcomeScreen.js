import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import profile from "../../assets/logo.png";
import "./adminonboarding.css";
import admin from "../../class/admin.class";
import { useDispatch, useSelector } from "react-redux";
import { setCode } from "../../redux/reducers/adminReducer";

export default function AdminWelcomeScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function confirmCode() {

      try {
        const isValid = await admin.confirmAdminCode({ code: id })
        dispatch(setCode(id))
        if (isValid.success) {
          setOpen(true)
        }
      } catch (error) {

        navigate(-1, { replace: true })
      }

    }
    confirmCode()
  }, [id])

  return (
    <>
      {
        open &&
        <div className="onboarding-screen welcome-screen admin">

          <div className="d-flex flex-column justify-content-space-between  align-items-center welcome-screen-content py-5">

            <img src={profile} alt="" />

            <h1 className="my-2">LIPW Management System</h1>
            <p className="mt-5">Hello Admin, Kindly select an action below</p>
            <div className="d-flex flex-column welcome-screen-button mt-5">
              <button
                onClick={() => {
                  navigate("/admins/create-account",{replace:true});
                }}
                className="btn create-account "
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  navigate("/admins/login",{replace:true});
                }}
                className="btn login my-3"
              >
                Login
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      }
    </>

  );
}
