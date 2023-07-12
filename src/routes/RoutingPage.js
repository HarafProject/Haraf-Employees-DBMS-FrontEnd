// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

//Onboarding Routes
import WelcomeScreen from "../supervisors_page/onboarding_screens/WelcomeScreen";
import LoginScreen from "../supervisors_page/onboarding_screens/LoginScreen";
import ForgottenPassword from "../supervisors_page/onboarding_screens/forgotpasswordscreens/ForgottenPassword";
import LoginOtpVerify from "../supervisors_page/onboarding_screens/forgotpasswordscreens/OtpVerification";
import CreateNewPassword from "../supervisors_page/onboarding_screens/forgotpasswordscreens/CreateNewPassword";
import CreateAccountScreen from "../supervisors_page/onboarding_screens/CreateAccountScreen";
import AdminWelcomeScreen from "../Admin_page/admin_signup_pages/AdminWelcomeScreen";
import AdminLoginScreen from "../Admin_page/admin_signup_pages/AdminLoginScreen";
import AdminForgottenPassword from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminForgottenPassword";
import AdminCreateNewPassword from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminCreateNewPassword";
import AdminLoginOtpVerify from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminOtpVerification";
import AdminHomePage from "../Admin_page/admin_pages/admin_home_page/AdminHomePage";
<<<<<<< HEAD
import AttendanceDetailedPage from "../Admin_page/admin_pages/attendance_page/AttendanceDetailedPage";
import CreateAdminAccountScreen from '../Admin_page/admin_signup_pages/AdminCreateAccount';
=======

>>>>>>> main

// TakeAttendancePage
import AdminEmployeeProfile from "../Admin_page/admin_pages/admin_employee_list_page/AdminEmployeeProfile/AdminEmployeeProfile";
import SupervisorHome from '../supervisors_page/SupervisorHome';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">

      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgottenPassword />} />
      <Route path="/send-otp" element={<LoginOtpVerify />} />
      <Route path="/create-new-password" element={<CreateNewPassword />} />
      <Route path="/create-account" element={<CreateAccountScreen />} />

      <Route path="supervisor/*" element={<SupervisorHome />} />

      <Route path="/admin" element={<AdminWelcomeScreen />} />
      <Route path="/admin-login" element={<AdminLoginScreen />} />
      <Route
        path="/admin-forgot-password"
        element={<AdminForgottenPassword />}
      />
      <Route path="/admin-send-otp" element={<AdminLoginOtpVerify />} />
      <Route
        path="/admin-create-password"
        element={<AdminCreateNewPassword />}
      />
      <Route path="/admin-home" element={<AdminHomePage />} />
<<<<<<< HEAD
      <Route path="/detailed-attendance/:id" element={<AttendanceDetailedPage />} />
=======
>>>>>>> main

      <Route
        path="/admin-employee-profile/:id"
        element={<AdminEmployeeProfile />}
      />

      {/* <Route path="dashboard/*" element={<Dashboard />} /> */}

      {/* This page is only available after the user has finished selecting all typology to see it copy the path to the browser*/}
    </Route>
  )
);

function RoutingPage({ user }) {
  return (
    <div>
      <RouterProvider router={router} context={{ user }} />
    </div>
  );
}
export default RoutingPage
