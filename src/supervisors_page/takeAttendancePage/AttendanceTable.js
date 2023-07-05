import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
  TablePagination,
  Checkbox,
  Typography,
} from '@mui/material'
import tableData from './tableData'

export default function AttendanceTable() {
  return (
    <TableContainer
      component={Paper}
      style={{ width: '90%', margin: '0 auto' }}
    >
      <Table>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar alt='Avatar' src={row.image} />
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2'>{row.name}</Typography>
                <Typography variant='body2'>{row.role}</Typography>
              </TableCell>
              <TableCell>
                <Checkbox checked={row.present} /> Present
              </TableCell>
              <TableCell>
                <Checkbox checked={row.absent} /> Absent
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
