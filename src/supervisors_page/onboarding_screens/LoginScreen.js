import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import profile from "../../assets/harafLogoWhite.png";
import mcrpLogo from "../../assets/mcrp_logo.jpeg";
import "./onboarding.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/reducers/userReducer";
import { setToken } from "../../redux/reducers/jwtReducer";
import { RotatingLines } from "react-loader-spinner";
import { updateWards } from "../../redux/reducers/employeeReducer";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import NoNetworkModal from "../../component/reusable/modalscontent/NoNetworkModal";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const [passwordType, setPasswordType] = useState("false");
  const [icon, setIcon] = useState("mdi:eye");
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordType(passwordType ? false : true);
    setIcon(!icon);
  };
  const dispatch = useDispatch();

  useSelector((state) => {
    // console.log(state.user.user, "state");
  });

  const openModal = () => {
    // Modify openModal function
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };

      auth
        .login(data)
        .then((res) => {
          // toast.success(res?.data?.message);
          setSnackbarMessage(res?.data?.message);
          localStorage.setItem("HARAF-AUTH", res?.data?.token);
          dispatch(setToken(res?.data?.token));
          dispatch(loginSuccess(res?.data?.user));
          dispatch(updateWards(res?.data.wards));
          //redirect to emp
          navigate("/supervisor", { replace: true });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err)
          toast.error(err?.error || err);
          setIsLoading(false);
          if (!err) {
            let auth = JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).auth
            )?.token;

            if (auth && !isOnline) {
              openModal();
            } else {
              toast.error("You appear to be offline.");
            }
          }
        });
    },
  });
  useEffect(() => {
    if (snackbarMessage) {
      const timeout = setTimeout(() => {
        setSnackbarMessage("");
        setSnackbarType("");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [snackbarMessage]);

  return (
    <div className="onboarding-screen login-screen">
      <div className="d-flex flex-column justify-content-between  align-items-center signup-content py-4">
        <div className="login-screen-logos"> <img src={mcrpLogo} alt="" />
          <img className="haraf" src={profile} alt="" />

        </div>
        <h1>MCRP/HARAF</h1>
        <form onSubmit={formik.handleSubmit} className="mt-3">
          <p className="screen-title text-center mt-5">LOGIN</p>

          <div>
            <div className="form-area">
              <div className="form-field">
                <input
                  autoComplete="new-email"
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>{" "}
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-area">
              <div className="form-field d-flex align-items-center justify-content-between mt-4">
                <input
                  autoComplete="new-password"
                  className=""
                  placeholder="Password *"
                  type={passwordType ? "password" : "text"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div onClick={togglePasswordVisiblity} className="eye">
                  <Icon icon={icon ? "mdi:eye" : "mdi:eye-off"} />
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column align-items-center login-screen-button mt-3">
            <button
              type="submit"
              className="btn login my-4"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? (
                <RotatingLines width="25" strokeColor="#FFF" strokeWidth="2" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="forgot-password">
            Forgotten Password?{" "}
            <span>
              {" "}
              <a href="/forgot-password">Reset Here</a>
            </span>{" "}
          </p>
        </form>
      </div>
      {/* </div> */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={{
          base: "modal-base",
          afterOpen: "modal-base_after-open",
          beforeClose: "modal-base_before-close",
        }}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-base_after-open",
          beforeClose: "overlay-base_before-close",
        }}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        <NoNetworkModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}
