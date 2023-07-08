// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//Onboarding Routes
import WelcomeScreen from "../supervisors_page/onboarding_screens/WelcomeScreen";
import LoginScreen from "../supervisors_page/onboarding_screens/LoginScreen";
import ForgottenPassword from "../supervisors_page/onboarding_screens/forgotpasswordscreens/ForgottenPassword";
import LoginOtpVerify from "../supervisors_page/onboarding_screens/forgotpasswordscreens/OtpVerification";
import CreateNewPassword from "../supervisors_page/onboarding_screens/forgotpasswordscreens/CreateNewPassword";
import CreateAccountScreen from "../supervisors_page/onboarding_screens/CreateAccountScreen";
import EmptyEmployeeList from "../supervisors_page/employeepage/employeelistpage/EmptyEmployeeListScreen";
import AddEmployeeScreen from "../supervisors_page/employeepage/addemployeepage/AddEmployee";
import EmployeeListTable from "../supervisors_page/employeepage/employeelistpage/EmployeeList";
import EmployeeProfilePage from "../supervisors_page/employeepage/employeeprofilepage/EmployeeProfilePage";
import NotificationScreen from "../supervisors_page/employeepage/notificationpage/NotificationPage";
import BiometricScreen from "../supervisors_page/employeepage/biometricpage/BiometricPage";
import AdminWelcomeScreen from "../Admin_page/admin_signup_pages/AdminWelcomeScreen";
import AdminLoginScreen from "../Admin_page/admin_signup_pages/AdminLoginScreen";
import AdminForgottenPassword from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminForgottenPassword";
import AdminCreateNewPassword from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminCreateNewPassword";
import AdminLoginOtpVerify from "../Admin_page/admin_signup_pages/adminforgotpasswordscreens/AdminOtpVerification";
import AdminHomePage from "../Admin_page/admin_pages/admin_home_page/AdminHomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgottenPassword />} />
      <Route path="/send-otp" element={<LoginOtpVerify />} />
      <Route path="/create-new-password" element={<CreateNewPassword />} />
      <Route path="/create-account" element={<CreateAccountScreen />} />
      <Route path="/add-employee" element={<AddEmployeeScreen />} />
      <Route path="/employee-list" element={<EmployeeListTable />} />
      <Route path="/employee-list-empty" element={<EmptyEmployeeList />} />
      <Route path="/employee-profile/:id" element={<EmployeeProfilePage />} />
      <Route path="/notification" element={<NotificationScreen />} />
      <Route path="/biometric-capture" element={<BiometricScreen />} />

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

      {/* <Route path="dashboard/*" element={<Dashboard />} /> */}
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
export default RoutingPage;
