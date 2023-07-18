import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.css";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import auth from "../../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/reducers/jwtReducer";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email address"),
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
          const redirectURL = `/send-otp?email=${values.email}`;
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
    <div className="forgotpassword-screen ">
      {/* <div className=""> */}
      <div className="form d-flex flex-column align-items-center p-5">
        <h1>Forgotten Password</h1>
        <p>
          {" "}
          To reset your password, an OTP will be sent to your email, please
          input the email address you registered with below
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column my-5"
        >
          {/* <div> */}
            <div className="form-field mt-4">
              <input
                autoComplete="new-email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                name="email"
                placeholder="Email Address"
              />

            </div> {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          {/* </div> */}

          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="btn forgotpassword-btn mt-4 mx-auto"
          >
            {" "}
            {isLoading ? (
              <RotatingLines width="20" strokeColor="#FFF" strokeWidth="2" />
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
        <p>
          Having Issues or don’t have access to email?{" "}
          <span><a href="mailto:">Contact Admin</a></span>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}
