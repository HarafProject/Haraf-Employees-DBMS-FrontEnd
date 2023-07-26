import { useState, useEffect } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import { useNavigate } from 'react-router-dom'
import './typology.css'
import { attendanceWards } from '../../../redux/reducers/attendanceReducer'
import { updateAttendance } from '../../../redux/reducers/attendanceReducer'
import { useDispatch, useSelector } from "react-redux";


export default function SelectWardsForAttendance() {
  const [checkedItems, setCheckedItems] = useState([])
  const [wardList, setWards] = useState([])
  const { user } = useSelector((state) => state?.user)
  const { attendance } = useSelector((state) => state?.attendance)
  const { employees,wards } = useSelector((state) => state?.employee)
  const dispatch = useDispatch();

  const handleChange = (event, wardId) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, wardId])
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== wardId))
    }
  }

  const navigate = useNavigate()



  useEffect(() => {

    if (attendance.date) {
      navigate("/supervisor/attendance", { state: { isSaved: true } })
    }


  }, [])

  function handleSubmit() {

    if (checkedItems.length === 0 && !window.confirm("Are you sure you want to take attendance for the entire LGA? or else select the wards assigned to you.")) return
    if (checkedItems.length === 0) {
      dispatch(updateAttendance({
        date: new Date().toDateString(),
        data: employees
      }))

    } else {
      let attendanceRecord = employees.filter(item => checkedItems.includes(item.ward._id))

      dispatch(updateAttendance({
        date: new Date().toDateString(),
        data: attendanceRecord
      }))
    }
    dispatch(attendanceWards(checkedItems))
    navigate("/supervisor/attendance")
  }

  return (
    <div>
      <ReusableHeader />
      <div className='my-5 py-5 ward-page'>
        <div className='mt-5 pt-3 select-ward-section'>
          
            <h3>Select Wards</h3>
            <p className='text-center'>
              Please choose the employee wards for whom you will be taking attendance.
            </p>
            <div className='wards-list my-5'>
              {wards.map((item) => (
                <label className='toggle' key={item._id}>
                  <div className='ward'>
                    <input
                      type='checkbox'
                      name={item._id}
                      className='check'
                      checked={checkedItems.includes(item._id)}
                      onChange={(event) => handleChange(event, item._id)}
                    />
                    <span className='mx-2'>{item.name}</span>                    
                  </div>
                </label>
              ))}
            </div>
            
            <button onClick={handleSubmit} className='btn ward-btn mx-auto'>Proceed</button>
        
        </div>
      </div>
    </div>
  )
}
