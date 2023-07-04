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
import CreateAccountScreen from "../supervisors_page/onboarding_screens/CreateAccountScreen";
import EmptyEmployeeList from "../supervisors_page/employeepage/employeelistpage/EmptyEmployeeListScreen";
import AddEmployeeScreen from "../supervisors_page/employeepage/addemployeepage/AddEmployee";
import EmployeeListTable from "../supervisors_page/employeepage/employeelistpage/EmployeeList";
import EmployeeProfilePage from "../supervisors_page/employeepage/employeeprofilepage/EmployeeProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/createaccount" element={<CreateAccountScreen />} />
      <Route path="/employeeemptylist" element={<EmptyEmployeeList />} />
      <Route path="/addemployee" element={<AddEmployeeScreen />} />
      <Route path="/employeeslist" element={<EmployeeListTable />} />
      <Route path="/employeeprofile/:id" element={<EmployeeProfilePage />} />
      {/* <Route path="/login" element={<LoginForm />}>
        <Route path="" element={<Login />} />
        <Route path="/login/forgotpassword" element={<ForgottenPassword />} />
        <Route path="/login/otp" element={<LoginOtpVerify />} />
        <Route path="/login/createpassword" element={<CreateNewPassword />} />
      </Route> */}
      {/* <Route path="/register" element={<Registration />} >
        <Route path="/register" element={<Member />} />
        <Route path="/register/member" element={<Member />} />
        <Route path="/register/farm" element={<Farm />} />
        <Route path="/register/guarantor" element={<Guarantor />} />
      </Route> */}

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
