// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

// TakeAttendancePage

import SelectTypography from '../supervisors_page/takeAttendancePage/SelectTypography'
import TakeAttendance from '../supervisors_page/takeAttendancePage/TakeAttendance'
import AttendanceReport from '../supervisors_page/takeAttendancePage/AttendanceReport'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      {/* <Route path='/' element={<SelectTypography />}></Route>
      <Route path='/take-attendance' element={<TakeAttendance />}></Route> */}
      <Route path='/' element={<AttendanceReport />}></Route>

      {/* <Route path="/take-attendance" element={<TakeAttendance/>} ></Route> */}

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
)

function RoutingPage({ user }) {
  return (
    <div>
      <RouterProvider router={router} context={{ user }} />
    </div>
  )
}
export default RoutingPage
