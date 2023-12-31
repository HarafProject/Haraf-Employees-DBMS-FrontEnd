import { useState, useEffect } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import { useNavigate, useLocation } from 'react-router-dom'
import AttendanceTable from './AttendanceTable'
import './takeAttendance.css'
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance, attendanceWards } from '../../../redux/reducers/attendanceReducer';
import ManageAttendanceModal from '../../../component/reusable/modalscontent/ManageAttendanceModal'


export default function TakeAttendance() {
  const navigate = useNavigate()
  const location = useLocation()
  const [attendanceData, setAttendanceData] = useState({})
  const { user } = useSelector((state) => state?.user)
  const { attendance } = useSelector((state) => state?.attendance)
  const isSaved = location?.state
  const dispatch = useDispatch();
  const { offline } = useSelector((state) => state?.user);
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);


  useEffect(() => {

    if (!attendance.date) navigate('/supervisor/wards')
    setAttendanceData(attendance)
  }, [attendance])


  function handleSubmit() {
    if (offline) {
      if (attendance.saved) {
        setShowSnackbar(true); // Show snackbar
        setShowModal(true)
    
      } else {
        setShowModal(true); // Show modal
      }
    } else {
      navigate('/supervisor/attendance-report');
    }
  }

  function handleDiscard() {
    if (!window.confirm("Are you sure you want to discard this report?")) return
    dispatch(updateAttendance({}))
    dispatch(attendanceWards([]))
    navigate("/supervisor/report-history", { replace: true })
  }

  function handleModalYes() {
    if (offline) {
      dispatch(updateAttendance({ ...attendance, saved: true }));
      setShowSnackbar(true); // Show snackbar
      navigate('/supervisor/report-history');
    } else {
      navigate('/supervisor/report-history');
    }
    setShowModal(false); // Hide modal
  }

  function closeModal() {
    setShowModal(false); // Hide modal
  }


  return (
    <div>
      <ReusableHeader />
      <div className="attendance-page">
        <div className="attendance-prefilled-info mt-5 px-5">
          <div className="d-flex justify-content-between">
            <h3>Tick Attendance</h3>
            <h4>{attendanceData.date}</h4>
          </div>

          <div className='d-flex justify-content-between'>
            {attendanceData.workTypology?.map((item, index) => (

              <p key={index}>{item?.name}</p>

            ))}
            <p>
              Note: Attendance report must be <br /> sent between
              <span> 09:00am - 4:00pm</span>
            </p>
          </div>
        </div>
        <AttendanceTable
          attendance={attendanceData}
          setAttendanceData={setAttendanceData}
          
        />
        <div className='d-flex center-container'>
          {
            (isSaved || attendance.saved) && <button className='btn center-button mr-3' onClick={handleDiscard}>
              Discard Report
            </button>
          }

          {
            !offline ?
              <button className='btn center-button' onClick={handleSubmit}>
                Send Report
              </button> : <button className='btn center-button' onClick={handleSubmit}>
                Save Report
              </button>
          }

        </div>
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
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

          <ManageAttendanceModal
            buttonClick={offline ? 'savereport' : 'discardreport'}
            onYes={handleModalYes}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {/* Add the snackbar component */}
      {showSnackbar && (
        <div className="snackbar-overlay">
          <div className="snackbar">
            <div className="snackbar-content">Attendance Saved Successfully</div>
          </div>
        </div>
      )}
    </div>
  );
}
