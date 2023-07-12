import { useState, useEffect } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import { useNavigate, useLocation } from 'react-router-dom'
import AttendanceTable from './AttendanceTable'
import './takeAttendance.css'
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance, attendanceWards } from '../../../redux/reducers/attendanceReducer';

export default function TakeAttendance() {
  const navigate = useNavigate()
  const location = useLocation()
  const [attendanceData, setAttendanceData] = useState({})
  const { user } = useSelector((state) => state?.user)
  const { attendance } = useSelector((state) => state?.attendance)
  const isSaved = location?.state
  const dispatch = useDispatch();
  const { offline } = useSelector((state) => state?.user)

  useEffect(() => {

    if (!attendance.date) navigate('/supervisor/wards')
    setAttendanceData(attendance)

  }, [attendance])


  function handleSubmit() {
   
    if (offline) {

      if (attendance.saved) return alert("Attendance Saved")
      if (!window.confirm("Are you sure you want to save report. Once saved attendance cannot be editied.")) return
      dispatch(updateAttendance({ ...attendance, saved: true }));
      alert("Attendance Saved Successfully.")

    } else {
      navigate('/supervisor/attendance-report')
    }

  }
  function handleDiscard() {
    if (!window.confirm("Are you sure you want to discard this report?")) return
    dispatch(updateAttendance({}))
    dispatch(attendanceWards([]))
    navigate("/supervisor/wards", { replace: true })
  }

  return (
    <section>
      <ReusableHeader />
      <div className='margin'>
        <div className='attendance'>
          <div className='attendance-header'>
            <h3>Tick Attendance</h3>
            <h4>{attendanceData.date}</h4>
          </div>
          <div className='attendance-sub-head'>
            <h4></h4>
            <p>
              Note: Attendance report must be <br /> sent between
              <span>09:00am - 4:00pm</span>
            </p>
          </div>
        </div>
        <AttendanceTable
          attendance={attendanceData}
          setAttendanceData={setAttendanceData}
        />
        <div className='d-flex center-container'>
          {
            (isSaved || attendance.saved) && <button className='center-button mr-3' onClick={handleDiscard}>
              Discard Report
            </button>
          }

          {
            !offline ? <button
              className='center-button'
              onClick={handleSubmit}
            >
              Send Report
            </button> : <button
              className='center-button'
              onClick={handleSubmit}
            >
              Save Report
            </button>
          }

        </div>
      </div>
    </section>
  )
}
