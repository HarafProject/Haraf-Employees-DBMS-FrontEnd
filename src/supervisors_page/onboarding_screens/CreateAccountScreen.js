/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile from "../../assets/logo-light.png";
import "./onboarding.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import auth from "../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataOBJs from "../../class/data.class";
import { useDispatch } from "react-redux";
import "./onboarding.css";
import { RotatingLines } from "react-loader-spinner";

export default function CreateAccountScreen() {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("false");
  const [confirmPasswordType, setConfirmPasswordType] = useState("false");
  const [icon1, setIcon1] = useState("mdi:eye");
  const [icon2, setIcon2] = useState("mdi:eye");
  const [isLoading, setIsLoading] = useState(false);
  const [zones, setZones] = useState([]);
  const [lgas, setLgas] = useState([
    {
      name: "select zone",
      _id: "",
    },
  ]);
  const togglePasswordVisiblity = () => {
    setPasswordType(passwordType ? false : true);
    setIcon1(!icon1);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordType(confirmPasswordType ? false : true);
    setIcon2(!icon2);
  };
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        `Password requirements: 1 uppercase, 1 lowercase, 1 number, 1 special character.`
      ),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email address"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    zonalRegion: Yup.string().required("Zonal Region is required"),
    lga: Yup.string().required("lga is required"),
  });
  const formik = useFormik({
    initialValues: {
      fname: "",
      phone: "",
      password: "",
      surname: "",
      email: "",
      confirm_password: "",
      zonalRegion: "",
      lga: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      setIsLoading(true);
      const data = {
        firstname: values.fname,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        zone: values.zonalRegion, //This is zone Id
        lga: values.lga, //This is LGA Id
        password: values.password,
      };

      auth
        .register(data)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
          window.location.replace('/login')
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.error || err);
          console.log(err);
          setIsLoading(false);
        });
    },
  });
  useEffect(() => {
    dataOBJs.getZone().then((zone) => {
      console.log(zone, "zones");
      setZones(zone);
    });
    if (formik.values.zonalRegion) {
      dataOBJs.getLgaByZone(formik.values.zonalRegion).then((res) => {
        setLgas(res);
      });
    }
  }, [dataOBJs, formik.values.zonalRegion]);
  return (
    <div className="onboarding-screen">
      {/* <div className="login-screen"> */}
      <div className="d-flex flex-column justify-content-space-between  align-items-center signup-content py-5">
        <div className="d-flex flex-column align-items-center signup-screen-logo">
          <img src={profile} alt="" className="" />
          <p className="mt-3 title text-center">
            LIPW Management System{<br />}(LIPWMS)
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-3">
          <p className="screen-title text-center mt-5">auth SIGNUP</p>
          <div className="d-flex align-items-start">
            <div className="mx-3">
              <div>
                <div className="form-field mt-5">
                  <input
                    autoComplete="new-firstname"
                    type="text"
                    id="fname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fname}
                    name="fname"
                    placeholder="FirstName *"
                  />

                </div>
                {formik.touched.fname && formik.errors.fname && (
                  <div className="error">{formik.errors.fname}</div>
                )}
              </div>

              <div>
                <div className="form-field mt-5">
                  <input
                    autoComplete="new-phone"
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    placeholder="Phone Number *"
                  />

                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="error">{formik.errors.phone}</div>
                )}
              </div>

              <div>
                <div className="form-field mt-5">
                  <select
                    name="zonalRegion"
                    id="zonalRegion"
                    value={formik.values.zonalRegion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select a Zonal Region
                    </option>
                    {zones.map((a, i) => (
                      <option key={i} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>

                </div>
                {formik.touched.zonalRegion && formik.errors.zonalRegion && (
                  <div className="error">{formik.errors.zonalRegion}</div>
                )}
              </div>

              <div>
                <div className="form-field d-flex align-items-center justify-content-between mt-5">
                  <input
                    autoComplete="new-password"
                    className=""
                    id="password"
                    placeholder="Password *"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type={passwordType ? "password" : "text"}
                    name="password"
                  />
                  <div onClick={togglePasswordVisiblity} className="eye">
                    <Icon icon={icon1 ? "mdi:eye" : "mdi:eye-off"} />
                  </div>

                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
             
            </div>
            <div className="mx-3">
              <div>
                <div className="form-field mt-5">
                  <input
                    autoComplete="new-surname"
                    id="surname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                    type="text"
                    name="surname"
                    placeholder="Surname *"
                  />

                </div> {formik.touched.surname && formik.errors.surname && (
                  <div className="error">{formik.errors.surname}</div>
                )}
              </div>

              <div>
                <div className="form-field mt-5">
                  <input
                    autoComplete="new-email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    id="email"
                    name="email"
                    placeholder="Email Address *"
                  />

                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <div className="form-field mt-5">
                  <select
                    name="lga"
                    id="lga"
                    value={formik.values.lga}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select an LGA
                    </option>
                    {lgas.map((a, i) => (
                      <option key={i} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>

                </div>{formik.touched.lga && formik.errors.lga && (
                  <div className="error">{formik.errors.lga}</div>
                )}
              </div>

              <div>
                <div className="form-field d-flex align-items-center justify-content-between mt-5">
                  <input
                    autoComplete="new-password"
                    className=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm Password *"
                    type={confirmPasswordType ? "password" : "text"}
                  />
                  <div onClick={toggleConfirmPasswordVisiblity} className="eye">
                    <Icon icon={icon2 ? "mdi:eye" : "mdi:eye-off"} />
                  </div>
                </div>

                {formik.touched.confirm_password &&
                  formik.errors.confirm_password && (
                    <div className="error">{formik.errors.confirm_password}</div>
                  )}</div>

              
            </div>
          </div>
          <div className="d-flex flex-column login-screen-button mt-3">
            <button
              type="submit"
              style={{ margin: "auto" }}
              className="btn login my-4"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? (
                <RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        <p className="forgot-password">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Click here
          </span>{" "}
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}
