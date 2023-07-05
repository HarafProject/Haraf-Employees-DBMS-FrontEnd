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
      <Route path='/' element={<SelectTypography />}></Route>
      <Route path='/take-attendance' element={<TakeAttendance />}></Route>
      <Route
        path='/attendance-report'
        element={<AttendanceReport />}
      ></Route>{' '}
      {/* This page is only available after the user has finished selecting all typology */}
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
