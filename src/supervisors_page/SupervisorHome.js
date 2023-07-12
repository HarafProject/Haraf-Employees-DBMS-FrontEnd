import React, { useState, useEffect } from "react";
import {
  Route, Routes,
  useNavigate,
  useSearchParams,
  useLocation
} from "react-router-dom";

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
import { useDispatch, useSelector } from "react-redux";
import OnlineMode from "../component/reusable/modalscontent/OnlineMode";
import Modal from 'react-modal';
const SupervisorHome = () => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { offline } = useSelector((state) => state?.user)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);


  useEffect(() => {
    if (offline && isOnline) {
      openModal()
    }
  }, [isOnline])

  const { user } = useSelector((state) => state?.user)
  const navigate = useNavigate()

  useEffect(() => {
   
    if (!user) {
      navigate("/", { replace: true })
    } else {
      navigate("employee-list", { replace: true })
    }
  }, [])

  return (
    <>
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={{
          base: 'modal-base',
          afterOpen: 'modal-base_after-open',
          beforeClose: 'modal-base_before-close'
        }}
        overlayClassName={{
          base: 'overlay-base',
          afterOpen: 'overlay-base_after-open',
          beforeClose: 'overlay-base_before-close'
        }}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >

        <OnlineMode
          closeModal={closeModal}
        />
      </Modal>
    </>


  )
}

export default SupervisorHome