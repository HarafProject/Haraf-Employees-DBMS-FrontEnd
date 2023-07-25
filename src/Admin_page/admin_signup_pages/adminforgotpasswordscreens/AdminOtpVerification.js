import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import "../../../supervisors_page/onboarding_screens/forgotpasswordscreens/forgotpassword.css";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import auth from "../../../class/auth.class";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";

export default function AdminLoginOtpVerify() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().required(""))
      .min(6, "Please enter a 6-digit OTP")
      .max(6, "Please enter a 6-digit OTP"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      auth
        .passwordResetOTP({ token: values.otp.join("") })
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
         navigate("/admins/create-password",{replace:true});
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.error);
          console.log(err);
          setIsLoading(false);
        });
    },
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    console.log(email);
    // Use the email value as needed
    setEmail(email);
  }, []);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const handleResendOTP = () => {
    setCountdown(94); // Set the initial countdown time (e.g., 01:34)
    setShowSnackbar(false); // Assuming you want to hide the snackbar when resending OTP
    //send otp
    auth
      .forgotPassword({ email: email })
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
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const value = e.clipboardData.getData("Text");
    const otpArray = value.split("").slice(0, 6);
    setOtp(otpArray.concat(otp.slice(otpArray.length)));
  };

  return (
    <div className="forgotpassword-screen">
      <div className="">
        <div className="form d-flex flex-column align-items-center p-5">
          <h1>OTP Verification</h1>
          <p>
            A One Time Pin (OTP) has been sent to your registered phone number,
            kindly input the pin below
          </p>
          <form
            className="d-flex flex-column my-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="otp-input">
              {formik.values.otp.map((digit, index) => (
                <input
                  type="number"
                  key={index}
                  value={digit}
                  style={{
                    border: `${
                      formik.touched.otp && formik.errors.otp
                        ? "solid 1px red"
                        : ""
                    }`,
                  }}
                  onChange={(e) => {
                    formik.setFieldValue(`otp[${index}]`, e.target.value);
                    handleChange(e, index);
                  }}
                  onPaste={handlePaste}
                  maxLength={1}
                />
              ))}
            </div>
            {formik.touched.otp && formik.errors.otp && (
              <div className="error">{formik.errors.otp}</div>
            )}
            <button
              className="btn forgotpassword-btn mt-4 mx-auto"
              disabled={!formik.isValid || isLoading}
              type="submit"
            >
              {isLoading ? (
                <RotatingLines width="20" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          {showSnackbar ? (
            <button className="d-flex align-items-center btn mx-4 profile-saved">
              <p>Verification Successful</p>
              <Icon icon="clarity:success-standard-line" className="btn-icon" />
            </button>
          ) : (
            <p>
              Yet to receive OTP?{" "}
              {countdown > 0 ? (
                <span style={{ color: "#FB9129", fontWeight: "600" }}>
                  Resend OTP (
                  {Math.floor(countdown / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor(countdown % 60)
                    .toString()
                    .padStart(2, "0")}
                  )
                </span>
              ) : (
                <span
                  style={{ color: "#FB9129", fontWeight: "600" }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
