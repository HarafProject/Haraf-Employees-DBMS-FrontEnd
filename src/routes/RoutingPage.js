// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

// TakeAttendancePage

import SelectTypography from '../supervisors_page/AttendancePages/selectTypologyPage/SelectTypography'
import TakeAttendance from '../supervisors_page/AttendancePages/takeAttendancePage/TakeAttendance'

import SupervisorProfile from '../supervisors_page/AttendancePages/supervisorProfile/SupervisorProfile'
import AttendanceReportUpload from '../supervisors_page/AttendancePages/attendanceReportUpload/AttendanceReportUpload'
import AddBeneficiary from '../supervisors_page/AttendancePages/add_beneficiary/AddBeneficiary'





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='/' element={<SelectTypography />}></Route>
      <Route path='/' element={<SupervisorProfile />}></Route>
      <Route path='/add-beneficiary' element={<AddBeneficiary />}></Route>

      <Route path='/profile' element={<SupervisorProfile />}></Route>
      <Route path='/take-attendance' element={<TakeAttendance />}></Route>
      <Route
        path='/attendance-report'
        element={<AttendanceReportUpload />}
      ></Route>
      {/* This page is only available after the user has finished selecting all typology to see it copy the path to the browser*/}
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
