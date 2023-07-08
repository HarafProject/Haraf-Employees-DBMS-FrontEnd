import React,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import profile from '../../assets/logo.png';
import './adminonboarding.css';
import auth from "../../class/auth.class";
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
      console.log(values);
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };

      auth
        .login(data)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
          dispatch(setToken(res?.data?.token));
          dispatch(loginSuccess(res?.data?.user));
          //redirect to admin
          navigate("/admin-home", { replace: true });
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
      <div className="admin-onboarding admin-login">
        <div className="d-flex flex-column justify-content-space-between  align-items-center admin-signup-content py-3">
          <div className="signup-logo text-center">
            <img src={profile} alt="" />
            <p className="title">LIPW Management System{<br />} (LIPWMS)</p>
          </div>
  
          <form onSubmit={formik.handleSubmit} className="mt-5">
            <p className="screen-title text-center mt-5">Super Admin LOGIN</p>
  
            <div>
              <div className="form-field my-3">
                <input
                  autoComplete="new-email"
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="form-field d-flex align-items-center justify-content-between my-3">
                <input
                  autoComplete="new-password"
                  className=""
                  placeholder="Password *"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div onClick={togglePasswordVisibility} className="admin-eye">
                  <Icon
                    icon={icon ? "mdi:eye" : "mdi:eye-off"}
                  />
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
  
            <div className="d-flex flex-column login-screen-button mt-5">
              <button disabled={!formik.isValid || isLoading} type="submit" className="btn login">
              {isLoading ? (
                <RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                "Login"
              )}
              </button>
            </div>
            <p className="admin-forgot-password mt-3">
              Forgotten Password?{" "}
              <span onClick={() => { navigate("/admin-forgot-password"); }}>
                Reset Here
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    );
  }
  