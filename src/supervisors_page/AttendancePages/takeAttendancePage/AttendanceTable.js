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
import { useState } from 'react'
import { Icon } from '@iconify/react'
import './takeAttendance.css'

export default function AttendanceTable() {
  const [isPresent, setIsPresent] = useState(tableData)
  const [isAbsent, setIsAbsent] = useState(tableData)
  const [icon, setIcon] = useState('mdi:checkbox-outline')
  const [iconIsAbsent, setIconIsAbsent] = useState('mdi:checkbox-outline')

  const handlePresent = (event, checkboxId) => {
    const updatedCheckboxes = isPresent.map((checkbox) =>
      checkbox.id === checkboxId
        ? { ...checkbox, isPresent: true }
        : { ...checkbox, isPresent: false }
    )
    setIsPresent(updatedCheckboxes)
    setIcon(!icon)
  }
  const handleAbsent = (event, checkboxId) => {
    const updatedCheckboxes = isAbsent.map((checkbox) =>
      checkbox.id === checkboxId
        ? { ...checkbox, checked: event.target.checked }
        : checkbox
    )
    setIsAbsent(updatedCheckboxes)
    setIconIsAbsent(!iconIsAbsent)
  }

  return (
    <TableContainer
      component={Paper}
      style={{ width: '90%', margin: '0 auto' }}
    >
      <Table>
        <TableBody>
          {isPresent.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar alt='Avatar' src={row.image} />
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2'>{row.name}</Typography>
                <Typography variant='body2'>{row.role}</Typography>
              </TableCell>
              <TableCell>
                <div
                  className='d-flex align-items-center'
                  onClick={(event) => handlePresent(event, row.id)}
                >
                  <p className={icon ? 'empty-checkbox' : 'checked-box'}>
                    Present
                  </p>
                  <Icon
                    icon={
                      icon
                        ? 'mdi:checkbox-blank-outline'
                        : 'mdi:checkbox-marked'
                    }
                    className={
                      icon
                        ? 'empty-checkbox table-icon'
                        : 'checked-box table-icon'
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <div
                  className='d-flex align-items-center'
                  onClick={(event) => handleAbsent(event, row.id)}
                >
                  <p
                    className={iconIsAbsent ? 'empty-checkbox' : 'checked-box'}
                  >
                    Absent
                  </p>
                  <Icon
                    icon={
                      iconIsAbsent
                        ? 'mdi:checkbox-blank-outline'
                        : 'mdi:cancel-box-outline'
                    }
                    className={
                      iconIsAbsent
                        ? 'empty-checkbox table-icon'
                        : 'checked-red table-icon'
                    }
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
