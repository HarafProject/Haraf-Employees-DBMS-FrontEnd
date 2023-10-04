

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
import NoNetworkModal from '../../../component/reusable/modalscontent/NoNetworkModal';
import Modal from 'react-modal';
import AttendanceTable from '../takeAttendancePage/AttendanceTable';

export default function AttendanceReportUpload() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state?.user)
  const { attendance, } = useSelector((state) => state?.attendance)
  const [attendanceCount, setAttendanceCount] = useState({})
  const [attendanceComment, setAttendanceComment] = useState(null)
  // const [lateSubmissionComment, setLateSubmissionComment] = useState(null)
  const [lateSubmissionReason, setLateSubmissionReason] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => { // Modify openModal function
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {

    const countByStatus = attendance.data.reduce((counts, item) => {
      // console.log(item)
      // const { status } = item;
      if (item.absentReason) {
        console.log("Absent")
        counts["absentReason"] = (counts["absentReason"] || 0) + 1;
        return counts;
      } else {
        counts[item.status] = (counts[item.status] || 0) + 1;
        return counts;
      }

    }, {});

    setAttendanceCount(countByStatus);

  }, [attendance])

  async function handleSubmit(params) {
    if (!attendanceComment && !lateSubmissionReason) return toast.error("Please enter comment.")
    if (!window.confirm("Are you sure you want to submit this report? Once submitted data cannot be reviewed.")) return
    let record = attendance.data.map(item => ({
      supervisor: user._id,
      employee: item._id,
      attempt: item.attempt,
      date: attendance.date,
      status: item.status ? item.status : "Absent",
      absentReason: item.absentReason && item.absentReason,
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

    // Save the report
    dispatch(updateAttendance({ ...attendance, saved: true }));
    // Submit the report
    try {
      const { message } = await supervisor.submitAttendance(data)
      toast.success(message)
      dispatch(updateAttendance({}))
      dispatch(attendanceWards([]))
      navigate("/supervisor/report-history", { replace: true })
    } catch (error) {
      if (error === "You are currently offline.") {
        openModal()
      } else {

        toast.error(error)
        toast.error(error?.error)
      }

    } finally {
      setIsLoading(false)
    }
  }


  const submissionTime = moment().format('h:mm A');
  const currentTime = moment();
  const startTime = moment().set('hour', 9).set('minute', 0);
  const endTime = moment().set('hour', 16).set('minute', 0);
  const isBetweenSubmissionTime = currentTime.isBetween(startTime, endTime);



  return (
    <div>
      <ReusableHeader />
      <div className="container my-5 pt-5 ">
        <div className=" select-typ-report mt-4">
          <div className="header-report ">
            <h3>Attendance Report Upload</h3>
            <p>
              Please ensure you are submitting the factual and accurate attendance, {<br />} once submitted the action can not be undone
            </p>
          </div>
          <h4>Attendance Summary</h4>
          <div className='summary-grid'>
            <div>
              <div className='d-flex flex-column align-items-center summary'>
                <h1>{attendanceCount?.Present || 0}</h1>
                <p>Present</p>
              </div>
              <div className="report mt-5">
                <p>Report For:</p>
                <h4>{attendance.date}</h4>
              </div>
            </div>


            <div>
              <div className='d-flex flex-column align-items-center summary'>
                <h1>{attendanceCount?.Absent || 0}</h1>
                <p>Absent</p>
              </div>
              <div className="report mt-5">
                <p>Report From:</p>
                <h4>{attendance.data[0]?.lga?.name} LGA</h4>
              </div>
            </div>

            <div>
              <div className='d-flex flex-column align-items-center summary'>
                <h1>{attendanceCount?.absentReason || 0}</h1>
                <p>Absent With Reason</p>
              </div>
              <div className="report mt-5">
                <p>Report From:</p>
                <h4>{attendance.data[0]?.lga?.name} LGA</h4>
              </div>
            </div>

            <div>
              <div className='d-flex flex-column align-items-center summary' >
                <h1 className={!isBetweenSubmissionTime ? 'red-text' : ''}>{submissionTime}</h1>

                <p>Submission Time</p>
              </div>
              <div className="report mt-5">
                <p>Report By:</p>
                <h4>{user.firstname} {user.surname}</h4>
              </div>
            </div>

          </div>

          <center className="msg-area">
            <textarea
              placeholder="Supervisors comment *"
              name=""
              id=""
              cols="50"
              className="message "
              rows="4"
              textarea
              onChange={(e) => setAttendanceComment(e.target.value)}
            />
            <p className='my-2'>
              Kindly state any challenge experienced during the process of
              taking attendance today
            </p>
          </center>

          {!isBetweenSubmissionTime && (
            <center className="msg-area">
              <textarea
                placeholder="Kindly include reason *"
                cols="50"
                className="message  red-text"
                rows="4"
                onChange={(e) => setLateSubmissionReason(e.target.value)}
              />
              <p className={!isBetweenSubmissionTime ? 'red-text late-submission my-2' : ''}>Please provide a reason for submitting the report after the designated submission time range</p>
            </center>
          )}
          <div className="d-flex justify-content-around reportupload-btn mt-5">
            <button
              className="btn btn-back"
              onClick={() => {
                navigate('/supervisor/attendance')
              }}
              disabled={isLoading}
            >
              Back to attendance
            </button>
            <button className='btn btn-submit' onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /> : "Submit Attendnace"}
            </button>
          </div>
        </div>
      </div>
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

        <NoNetworkModal
          closeModal={closeModal}
        />

      </Modal>
    </div>
  );
}


