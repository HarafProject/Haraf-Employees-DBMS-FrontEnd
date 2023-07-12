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
import './takeAttendance.css'
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance, attendanceRecord } from '../../../redux/reducers/attendanceReducer'

export default function AttendanceTable({ attendance, setAttendanceData }) {

  const [record, setRecord] = useState([])
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
    <TableContainer
      component={Paper}
      style={{ width: '90%', margin: '0 auto' }}
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
                <div className='d-flex align-items-center' onClick={() => handleTick("Present", index)}>
                  <p className={row.status === "Present" ? 'checked-box' : 'empty-checkbox'}>
                    Present
                  </p>
                  <Icon
                    icon={row.status === "Present" ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}
                    className={row.status === "Present" ? 'checked-box table-icon' : 'empty-checkbox table-icon'}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className='d-flex align-items-center' onClick={() => handleTick("Absent", index)}>
                  <p className={row.status === "Absent" ? 'checked-box' : 'empty-checkbox'}>
                    Absent
                  </p>
                  <Icon
                    icon={row.status === "Absent" ? 'mdi:cancel-box-outline' : 'mdi:checkbox-blank-outline'}
                    className={row.status === "Absent" ? 'checked-red table-icon' : 'empty-checkbox table-icon'}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
