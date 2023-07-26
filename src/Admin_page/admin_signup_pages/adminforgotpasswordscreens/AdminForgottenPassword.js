import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../../../supervisors_page/onboarding_screens/forgotpasswordscreens/forgotpassword.css";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import auth from "../../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/reducers/jwtReducer";

export default function AdminForgottenPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      setIsLoading(true);
      auth
        .forgotPassword(values)
        .then((res) => {
          console.log(res);
          dispatch(setToken(res?.data?.token));
          const redirectURL = `/admins/send-otp?email=${values.email}`;
          navigate(redirectURL, { replace: true });
          toast.success(res?.data?.message);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.error || err);
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="forgotpassword-screen admin-site">
      {/* <div className=""> */}
        <div className="form d-flex flex-column align-items-center p-5">
          <h1>Forgotten Password</h1>
          <p>
            To reset your password, an OTP will be sent to your email. Please
            input the email address you registered with below.
          </p>
          <form
            className="d-flex flex-column my-5"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`email-input ${
                formik.errors.email && formik.touched.email ? "error" : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <button
              type="submit"
              className="btn forgotpassword-btn mt-4 mx-auto"
            >
              {isLoading ? (
                <RotatingLines width="20" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
          <p>
            Having issues or don't have access to email?{" "}
            <span><a href="mailto:">Contact Admin</a></span>
          </p>
        </div>
      </div>
    // </div>
  );
}
