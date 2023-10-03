import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
  Typography,
} from '@mui/material'
import tableData from './tableData'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

import checkbox from '../../../assets/checkbox.svg';
import checkboxCancel from '../../../assets/cancel-box-outline.svg';
import checkboxFilled from '../../../assets/checkbox-checked-filled.svg';



// import './takeAttendance.css'
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance, attendanceRecord } from '../../../redux/reducers/attendanceReducer'

export default function AttendanceTable({ attendance, onReasonSelect }) {

  const [record, setRecord] = useState([]);

  const [selectedReasons, setSelectedReasons] = useState({});

  // ... (other code)

  function handleReasonSelect(index, selectedReason) {
    setSelectedReasons(prevSelectedReasons => ({
      ...prevSelectedReasons,
      [index]: selectedReason
    }));
  }



  
  const [markAttendance, setMarkAttendance] = useState({})
  const [fireDispatch, setFireDispatch] = useState(false)
  const { user } = useSelector((state) => state?.user)
  const dispatch = useDispatch();

  useEffect(() => {
    setRecord(attendance.data)
  }, [attendance])

  function handleTick(value, index) {
    let updatedRecord = record.map((item, i) => {
      if (i === index) {
        const updatedAttempt = item.attempt ? [...item.attempt] : [];
        return {
          ...item,
          status: value,
          attempt: [
            ...updatedAttempt,
            {
              status: value,
              date: new Date()
            }
          ]
        };
      }
      return item;
    });
    setRecord(updatedRecord);
    setFireDispatch(true);
    setMarkAttendance((prevAttendance) => ({
      ...prevAttendance,
      [index]: value
    }));
  }






  useEffect(() => {
    if (fireDispatch) {

      // dispatch(attendanceRecord(markAttendance));
      dispatch(updateAttendance({ date: attendance.date, data: record }));
      setFireDispatch(false);
    }
  }, [fireDispatch, dispatch, markAttendance]);

  function handleSubmit(params) {
    // Handle form submission if needed
  }

  
  

  return (
    <div className="px-4 py-2 mt-2">
      <TableContainer
        component={Paper}
        className='supervisors-attendance-table'
      >
        <Table>
          <TableBody>
            {record?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar alt='Avatar' src={row.photo} />
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>{row.fullName}</Typography>
                  <Typography variant='body2'>{row.workTypology?.name} Typography - {row.ward?.name} Ward</Typography>
                </TableCell>
                <TableCell>
                  <div className='d-flex align-items-center attendance-tick' onClick={() => attendance.saved ? null : handleTick("Present", index)}>
                    <p className={row.status === "Present" ? 'checked-box' : 'empty-checkbox'}>
                      Present
                    </p>
                    {/* <Icon
                      icon={row.status === "Present" ? 'carbon:checkbox-checked-filled' : 'carbon:checkbox'}
                      className={row.status === "Present" ? 'checked-box table-icon' : 'empty-checkbox table-icon'}
                    /> */}
                    <img src={row.status === "Present" ? checkboxFilled : checkbox} alt="" className='table-icon' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='d-flex align-items-center attendance-tick' onClick={() => attendance.saved ? null : handleTick("Absent", index)}>
                    <p className={row.status === "Absent" ? 'checked-red' : 'empty-checkbox'}>
                      Absent
                    </p>
                    {/* <Icon
                      icon={row.status === "Absent" ? 'mdi:cancel-box-outline' : 'carbon:checkbox'}
                      className={row.status === "Absent" ? 'checked-red table-icon' : 'empty-checkbox table-icon'}
                    /> */}
                    <img src={row.status === "Absent" ? checkboxCancel : checkbox} alt="" className='table-icon' />
                  </div>
                </TableCell>
                {row.status === "Absent" && 
                <TableCell className='table-select-field'>
                  <div className="my-table-select">
                     <select  name={`reason-${index}`}
                  id={`reason-${index}`}
                  value={selectedReasons[index] || ""}
                  onChange={(e) => handleReasonSelect(index, e.target.value)}  >
                    <option value="">select reason</option>
                    <option value="sick">Sick</option>
                    <option value="bereaved">Bereaved</option>
                    <option value="maternity">Maternity</option>
                    <option value="paternity">Paternity</option>
                    <option value="others">Others</option>                    
                  </select>
                  </div>
                 
                </TableCell>
}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </div>

  )
}
