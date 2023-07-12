import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import './attendanceReportUpload.css'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import { RotatingLines } from "react-loader-spinner";
import supervisor from '../../../class/supervisor.class';
import { updateAttendance, attendanceWards } from '../../../redux/reducers/attendanceReducer';

export default function AttendanceReportUpload() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state?.user)
  const { attendance, } = useSelector((state) => state?.attendance)
  const [attendanceCount, setAttendanceCount] = useState({})
  const [attendanceComment, setAttendanceComment] = useState(null)
  const [lateSubmissionReason, setlateSubmissionReason] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    const countByStatus = attendance.data.reduce((counts, item) => {
      const { status } = item;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    setAttendanceCount(countByStatus);

  }, [attendance])

  async function handleSubmit(params) {
    if (!attendanceComment) return toast.error("Please enter comment.")
    if (!window.confirm("Are you sure you want to submit this report? Once submitted data cannot be reviewed.")) return
    let record = attendance.data.map(item => ({
      supervisor: user._id,
      employee: item._id,
      attempt: item.attempt,
      date: attendance.date,
      status: item.status ? item.status : "Absent",
      zone: item.zone._id,
      lga: item.lga._id,
      ward: item.ward._id,
      workTypology: item.workTypology._id

    }))
    let data = {
      comment: attendanceComment,
      reason: lateSubmissionReason,
      zone: user.zone,
      lga: user.lga,
      date: attendance.date,
      attendanceRecord: record
    }

    setIsLoading(true)
    try {
      const { message } = await supervisor.submitAttendance(data)
      toast.success(message)
      dispatch(updateAttendance({}))
      dispatch(attendanceWards([]))
      navigate("/supervisor/attendance",{replace:true})
    } catch (error) {
      console.log(error)
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section>
      <ReusableHeader />
      <div className='margin '>
        <div className='select-typ-report'>
          <div className='header-report'>
            <h3>Attendance Report Upload</h3>
            <p>
              Please choose the employee typology for whom you will be taking
              attendance
            </p>
          </div>
          <h4>Attendance Summary</h4>
          <div className='summary-grid'>
            <div className='summary'>
              <h1>{attendanceCount?.Present}</h1>
              <p>Present</p>
            </div>
            <div className='summary'>
              <h1>{attendanceCount?.Absent || 0}</h1>
              <p>Absent</p>
            </div>
            <div className='summary'>
              <h1>{moment().format('h:mm A')}</h1>
              <p>Submission Time</p>
            </div>
          </div>
          <div className='report-grid'>
            <div className='report'>
              <p>Report For:</p>
              <h4>{attendance.date}</h4>
            </div>
            <div className='report'>
              <p>Report From:</p>
              <h4>{attendance.data[0]?.lga?.name} lga</h4>
            </div>
            {/* <div className='report'>
              <p>Report From wards:</p>
              <h4>{user.lga.name} lga</h4>
            </div> */}
            <div className='report'>
              <p>Report By:</p>
              <h4>{user.firstname} {user.surname}</h4>
            </div>
          </div>
          <div className='msg-area'>
            <textarea
              placeholder='Supervisors comment'
              name=''
              id=''
              cols='50'
              className='message'
              rows='4'
              textarea
              onChange={(e) => setAttendanceComment(e.target.value)}
            />
            <p>
              Kindly state any challenge experienced during the process of
              taking attendance today
            </p>
          </div>
          <div className='btns'>
            <button
              className='btn-back'
              onClick={() => {
                navigate('/supervisor/attendance')
              }}
              disabled={isLoading}
            >
              Back to attendance
            </button>
            <button className='btn-submit' onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /> : "Submit Attendnace"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
