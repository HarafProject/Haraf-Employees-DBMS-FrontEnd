import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.css";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import auth from "../../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
        .register(values)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.error || err);
          console.log(err);
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="forgotpassword-screen ">
      <div className="">
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
            <div className="form-field my-4">
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
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className="btn forgotpassword-btn mt-4 mx-auto"
            >
              {" "}
              {isLoading ? "loading" : "Send OTP"}
            </button>
          </form>
          <p>
            Having Issues or don’t have access to email?{" "}
            <span>Contact Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
