import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile from "../../assets/logo-light.png";
import "./onboarding.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import supervisor from "../../class/supervisors.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/reducers/userReducer";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("false");
  const [icon, setIcon] = useState("ph:eye-light");
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordType(passwordType ? false : true);
    setIcon(!icon);
  };
  const dispatch = useDispatch();

  useSelector((state) => {
    console.log(state.user.user, "state");
  });
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
      console.log(values);
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };

      supervisor
        .login(data)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
          dispatch(loginSuccess(res?.data?.token));
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.error || err);
          console.log(err, "errr");
          setIsLoading(false);
        });
    },
  });
  const fieldName = `field_${Date.now()}`;
  return (
    <div className="onboarding-screen">
      {/* <div className="login-screen"> */}
      <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content py-5">
        <div className="signup-logo text-center">
          <img src={profile} alt="" />
          <p className="my-1 title">LIPW Management System{<br />}(LIPWMS)</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-3">
          <p className="screen-title text-center mt-5">SUPERVISOR LOGIN</p>

          <div>
            <div className="form-field my-4">
              <input
                autoComplete="new-email"
                type="email"
                name="email"
                placeholder="Email Address *"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-field d-flex align-items-center justify-content-between my-4">
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
                <Icon icon={icon} />
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <div className="d-flex flex-column login-screen-button mt-3">
            <button
              type="submit"
              className="btn login my-4"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? "Loading" : "Login"}
            </button>
          </div>
          <p className="forgot-password">
            Forgotten Password? <span> <a href="/forgotpassword">Reset Here</a></span>{" "}
          </p>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
