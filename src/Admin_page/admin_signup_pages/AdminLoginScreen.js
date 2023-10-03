import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile from "../../assets/logo.png";
import mcrpLogo from "../../assets/mcrp_logo.jpeg";
import "./adminonboarding.css";
import admin from "../../class/admin.class";
import mcrp from "../../assets/mcrp_logo.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/userReducer";
import { setToken } from "../../redux/reducers/jwtReducer";
import { RotatingLines } from "react-loader-spinner";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function AdminLoginScreen() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("false");
  const [icon, setIcon] = useState("ph:eye-light");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fieldName = `field_${Date.now()}`;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };

      admin
        .login(data)
        .then((res) => {
          toast.success(res?.data?.message);
          dispatch(setToken(res?.data?.token));
          dispatch(loginSuccess(res?.data?.user));
          localStorage.setItem("HARAF-AUTH", res?.data?.token);
          //redirect to admin
          navigate("/admins/home", { replace: true });
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.error || err);
          console.log(err, "errr");
          setIsLoading(false);
        });
    },
  });

  const togglePasswordVisibility = () => {
    // Implement your logic for toggling password visibility
    setPasswordType(passwordType ? false : true);
    setIcon(!icon);
  };

  return (
    <div className="onboarding-screen login-screen admin">
      <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content py-4">
        <div className="admin-logo">
        <img src={mcrpLogo} alt="" className="mrcplogo" />
          <img src={profile} alt="" />
          
        </div>
        <h1 className="my-2">MCRP/HARAF</h1>

        <form onSubmit={formik.handleSubmit} className="mt-3">
          <p className="screen-title text-center mt-3">LOGIN</p>

          <div className="mt-3">
            <div className="form-area">
              <div className="form-field ">
                <input
                  autoComplete="new-email"
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-area">
              <div className="form-field d-flex align-items-center justify-content-between mt-4">
                <input
                  autoComplete="new-password"
                  placeholder="Password *"
                  type={passwordType ? "password" : "text"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div onClick={togglePasswordVisibility} className="admin-eye">
                  <Icon icon={icon ? "mdi:eye" : "mdi:eye-off"} />
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column login-screen-button mt-3">
            <button
              disabled={!formik.isValid || isLoading}
              type="submit"
              className="btn login my-4"
            >
              {isLoading ? (
                <RotatingLines width="25" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="forgot-password">
            Forgotten Password?{" "}
            <span
              onClick={() => {
                navigate("/admins/forgot-password");
              }}
            >
              Reset Here
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
