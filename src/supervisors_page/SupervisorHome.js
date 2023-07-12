import React, { useState, useEffect } from "react";
import {
    Route, Routes,
    useNavigate,
    useSearchParams,
    useLocation
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import EmployeeListTable from "./employeepage/employeelistpage/EmployeeList";
import EmptyEmployeeList from "./employeepage/employeelistpage/EmptyEmployeeListScreen";
import SelectWardsForAttendance from "./AttendancePages/selectTypologyPage/SelectWardsForAttendance";
import TakeAttendance from "./AttendancePages/takeAttendancePage/TakeAttendance";
import AttendanceReportUpload from "./AttendancePages/attendanceReportUpload/AttendanceReportUpload";
import NotificationScreen from "./employeepage/notificationpage/NotificationPage"
import AddEmployeeScreen from "./employeepage/addemployeepage/AddEmployee";
import EmployeeProfilePage from "./employeepage/employeeprofilepage/EmployeeProfilePage";
import SupervisorProfile from "./AttendancePages/supervisorProfile/SupervisorProfile";
import EditEmployeeScreen from "./employeepage/addemployeepage/EditEmployee";
import { replace } from "formik";

const SupervisorHome = () => {
    const { user } = useSelector((state) => state?.user)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (!user) {
            navigate("/", { replace: true })
        }else{
            navigate("employee-list",{replace:true})
        }
    }, [user])

    return (
        <div className='dashboard'>

            <div className="d-flex">

                <Routes>
                    <Route path="/add-employee" element={<AddEmployeeScreen />} />
                    <Route path="/edit-employee" element={<EditEmployeeScreen />} />
                    <Route path="/employee-list" element={<EmployeeListTable />} />
                    <Route path="/employee-list-empty" element={<EmptyEmployeeList />} />
                    <Route path="/employee-profile" element={<EmployeeProfilePage />} />
                    <Route path="/notification" element={<NotificationScreen />} />
                    {/* <Route path="/biometric-capture" element={<BiometricScreen />} /> */}

                    <Route path='/wards' element={<SelectWardsForAttendance />} />
                    <Route path='/profile' element={<SupervisorProfile />} />
                    <Route path='/attendance' element={<TakeAttendance />} />
                    <Route
                        path='/attendance-report'
                        element={<AttendanceReportUpload />}
                    />

                </Routes>


            </div>

        </div>
    )
}

export default SupervisorHome