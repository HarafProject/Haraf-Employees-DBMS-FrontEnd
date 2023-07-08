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
import EmptyEmployeeList from "../supervisors_page/employeepage/employeelistpage/EmptyEmployeeListScreen";
import AddEmployeeScreen from "../supervisors_page/employeepage/addemployeepage/AddEmployee";
import EmployeeListTable from "../supervisors_page/employeepage/employeelistpage/EmployeeList";
import EmployeeProfilePage from "../supervisors_page/employeepage/employeeprofilepage/EmployeeProfilePage";
// TakeAttendancePage

import SelectTypography from '../supervisors_page/AttendancePages/selectTypologyPage/SelectTypography'
import TakeAttendance from '../supervisors_page/AttendancePages/takeAttendancePage/TakeAttendance'

import SupervisorProfile from '../supervisors_page/AttendancePages/supervisorProfile/SupervisorProfile'
import AttendanceReportUpload from '../supervisors_page/AttendancePages/attendanceReportUpload/AttendanceReportUpload'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgotpassword" element={<ForgottenPassword />} />
      <Route path="/sendotp" element={<LoginOtpVerify />} />
      <Route path="/createpassword" element={<CreateNewPassword />} />
      <Route path="/createaccount" element={<CreateAccountScreen />} />
      <Route path="/employeeemptylist" element={<EmptyEmployeeList />} />
      <Route path="/addemployee" element={<AddEmployeeScreen />} />
      <Route path="/employeeslist" element={<EmployeeListTable />} />
      <Route path="/employeeprofile/:id" element={<EmployeeProfilePage />} />
      <Route path='/' element={<SelectTypography />}></Route>
      <Route path='/' element={<SupervisorProfile />}></Route>
      <Route path='/profile' element={<SupervisorProfile />}></Route>
      <Route path='/take-attendance' element={<TakeAttendance />}></Route>
      <Route
        path='/attendance-report'
        element={<AttendanceReportUpload />}
      ></Route>
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
