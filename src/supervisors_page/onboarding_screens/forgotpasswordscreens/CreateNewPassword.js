import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./forgotpassword.css";
// import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Modal from "react-modal";
import PasswordChangeSuccessModal from "../../../component/reusable/modalscontent/PasswordChangeSuccessModal";
import auth from "../../../class/auth.class";
import "react-toastify/dist/ReactToastify.css";

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      setIsLoading(true);
      auth
        .ResetPassword({ password: values.password })
        .then((res) => {
          console.log(res);
          // toast.success(res?.data?.message);
          setSnackbarMessage(res?.data?.message);
          setSnackbarType("success");
          setIsLoading(false);
        })
        .catch((err) => {
          // toast.error(err.error || err);
          setSnackbarMessage(err.error || err);
          setSnackbarType("error");
          console.log(err);
          setIsLoading(false);
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
    <div className="forgotpassword-screen ">
      {/* <div className=""> */}
      <div className="form d-flex flex-column align-items-center p-5">
        <h1>Create New Password</h1>
        <p>
          Create new password to use for logging into your active farmers
          account, do not share your new password with anyone
        </p>
        <form
          className="d-flex flex-column mt-5 "
          onSubmit={formik.handleSubmit}
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-end error">{formik.errors.password}</span>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mt-2"
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <span className="text-end error">
                {formik.errors.confirmPassword}
              </span>
            )}
          <button
            className="btn forgotpassword-btn mt-4 mx-auto"
            type="submit"
            disabled={!formik.isValid || isLoading}
          >
            {isLoading ? (
              <RotatingLines width="20" strokeColor="#FFF" strokeWidth="2" />
            ) : (
              "Done"
            )}
          </button>
        </form>

        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Enter OTP"
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
          <PasswordChangeSuccessModal message={message} />
          {/* <OtpInputModal message={message} /> */}
        </Modal>
      </div>
      {snackbarMessage && (
        <div className={`snack-bar ${snackbarType === "success" ? "success" : "error"}`}>
          {snackbarMessage} 
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
