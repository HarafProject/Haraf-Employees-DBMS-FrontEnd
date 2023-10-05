import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Button
} from "@mui/material";

// import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import admin from "../../../../class/admin.class";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import dataOBJs from "../../../../class/data.class";
import haraf from '../../../../assets/logo.png';
import mcrp from '../../../../assets/mcrp.jpg';

export default function AnalyticAttendanceReport() {
  const { user } = useSelector((state) => state?.user)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [attendanceData, setAttendanceData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [type, setType] = useState("weekly");
  const [weekValues, setWeekValues] = useState([]);
  const [mthValues, setMthValues] = useState([]);
  const [value, setValue] = useState(null);
  const [lga, setLga] = useState(null);
  const [lgaData, setLgaData] = useState([]);
  const [exportButtonClick, setExportButtonClick] = useState(false);
  const navigate = useNavigate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  async function fetchLgas() {
    try {

      if (user.role === "admin") {
        const data = await dataOBJs.getLgaByZone(user.zone)

        setLgaData(data)
      } else if (user.role === "super-admin") {
        const data = await dataOBJs.getLga()
        setLgaData(data)

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLgas()

  }, [user])

  const fetchAnalyticsReportData = async (key, type, value, lga) => {
    if (!type || !value || !lga) return
    try {

      const analytics = await admin.getAnalyticsReportData(type, value, lga)
      return analytics

    } catch (error) {
      toast.error(error?.error);
    }
  };
  // React query fecth data
  const { data, status } = useQuery(['fetchAnalyticsReportData', type, value, lga], fetchAnalyticsReportData)

  // Function to group data by employee _id
  function groupDataByEmployeeId(data) {
    const groupedData = {};

    data.forEach((item) => {
      const employeeId = item?.employee?._id;
      if (!groupedData[employeeId]) {
        groupedData[employeeId] = [];
      }
      groupedData[employeeId].push(item);
    });

    return groupedData;
  }


  useEffect(() => {
    if (!data) return
    const groupedData = groupDataByEmployeeId(data.data);
    // Convert the object values to an array of grouped data
    const groupedArray = Object.values(groupedData);
    setTempData(groupedArray)//This data is used for search
    setAttendanceData(groupedArray)

  }, [data])


  async function fetchWeeks(params) {
    const dataAnalytic = await admin.getAttendanceWeeks()
    setWeekValues(dataAnalytic.weeks.sort((a, b) => a - b))

  }
  async function fetchMonths(params) {
    setMthValues(months)
  }


  const handleLga = (e) => {
    setLga(e.target.value)

  };

  useEffect(() => {
    if (type === "weekly") {
      fetchWeeks()
    } else if (type === "monthly") {
      fetchMonths()
    }
  }, [type])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const usersPerPage = attendanceData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleExportExcel = async () => {
    setExportButtonClick(true)
    try {
      const wb = XLSX.utils.book_new();

      const excelData = [
        [],
        [
          'MCRP/HARAF (Beneficiary Attendance And Payment Schedule)',
        ],
        [
          `Zone: ${lgaData.filter(item => item._id === lga)[0]?.zone?.name}`,
        ],
        [
          `LGA: ${lgaData.filter(item => item._id === lga)[0]?.name}`,
        ],
        [
          `${type}: ${type === 'weekly' ? `week ${value}` : months[value - 1]}`,
        ],
        // Empty row for spacing
        [],
        [],

        [
          'S/N',
          'Beneficiary Name',
          'Sex',
          'Ward',
          type === 'weekly' ? 'Days Worked per Week' : 'Days Worked per Month (10 days)',
          type === 'monthly' && 'Total No. Days',
          ...(type === 'monthly' ? ['Amount to be Paid(N)', 'Account Number', 'Bank Name'] : []),
        ],
        ...attendanceData.map((user, index) => [
          index + 1,
          user[0]?.employee?.fullName,
          user[0]?.employee?.sex,
          user[0]?.employee?.ward?.name,
          type === 'weekly'
            ? user.map(item => (item.status === 'Present' ? 'Present' : 'Absent')).join(', ')
            : user?.filter(item => item.status === 'Present')?.length,
          type === 'weekly' ? user.length : '',
          ...(type === 'monthly'
            ? [user?.filter(item => item.status === 'Present')?.length * 1000, user[0]?.employee?.accountNumber, user[0]?.employee?.bankName]
            : []),
        ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(excelData);




      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');


      XLSX.writeFile(wb, 'attendance_report.xlsx');
    } catch (error) {
      console.error('Error exporting as Excel:', error);
    }
  };









  function handleSearch(e) {
    let lowercaseQuery = e.target.value.toLowerCase();
    if (tempData.length > 0) {
      let filteredData = tempData.filter(item => {

        let lowercaseName = item[0].employee?.fullName?.toLowerCase();
        return lowercaseName?.includes(lowercaseQuery);
      })
      setAttendanceData(filteredData)
    }
  }

  return (
    <div className="analytic-report-page mt-4">


      <div className="graph-filter-section d-flex justify-content-between">
        {status === "loading" ? (
          <div className='d-flex align-items-center py-2'>
            <RotatingLines width="25" strokeColor="#0173bc" strokeWidth="3" />
            <p style={{ color: "#0173bc", marginBottom: "0" }}>Loading please wait...</p></div>
        )
          : (
            <div className="d-flex filter-option-section align-items-center ">
              <div className="search-button px-2 mx-2">
                <Icon icon="eva:search-outline" className="me-2 search-icon" />
                <input type="search" name="search" onChange={handleSearch} placeholder="Search Member" />
              </div>
              <div className="form-field mx-1">
                <select name="lga" id="" onChange={handleLga} value={lga}>

                  <option value="">LGA</option>
                  {lgaData.map((lga) => (
                    <option key={lga._id} value={lga._id}>
                      {lga.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field mx-1">
                <select name="type" value={type} onChange={(e) => {
                  setAttendanceData([])
                  setType(e.target.value)
                }}>
                  {/* <option value="">Interval</option> */}
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="form-field mx-1">
                <select name="ward" id="" value={value} onChange={(e) => {
                  setValue(e.target.value)
                }}>
                  <option value="">Value</option>

                  {
                    type === "weekly" && <>
                      {
                        weekValues.map((item, i) => <option key={i} value={item}>
                          week {item}
                        </option>)
                      }
                    </>
                  }

                  {
                    type === "monthly" && <>
                      {mthValues.map((item, i) =>
                        <option key={i} value={i + 1}>
                          {item}
                        </option>
                      )}
                    </>
                  }

                </select>
              </div>
            </div>
          )
        }

        {
          type === "monthly" &&
          <div> <Button className="btn export-btn" onClick={handleExportExcel}>
            <Icon icon="clarity:export-solid" className="me-1" />
            Export report
          </Button></div>
        }

      </div>


      <div className="employee-list-table mt-3" >
        {/* {exportButtonClick && (
          <div className="export-pdf-header p-4 my-2">
            <div className="d-flex justify-content-between align-items-start">
              <div className="logo-export-image">
                <img src={mcrp} alt="" />
              </div>


              <div >
                <h5 className="text-center">Hope And Rural Aid Foundation {<br />} MCRP/LIPW Beneficiary Attendance</h5>
                <div colSpan={6} className="text-left mt-4">
                  Zone: <span>{lgaData.filter(item => item._id === lga)[0]?.zone?.name}
                  </span>,
                  LGA: <span>{lgaData.filter(item => item._id === lga)[0]?.name}
                  </span>,  {type}: <span>{type === 'weekly' ? `week ${value}` : months[value - 1]}
                  </span>
                </div>
              </div>


              <div className="logo-export-image">
                <img src={haraf} alt="" />
              </div>
            </div>

          </div>
        )} */}



        <TableContainer component={Paper} id="table-to-export" >
          <Table >
            <TableHead>
              <TableRow className="text-align-center">
                <TableCell>S/N</TableCell>
                <TableCell>Beneficiary Name</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell className="ward">Ward</TableCell>
                {type === "weekly" ? <TableCell style={{ textAlign: "center" }}>Days Worked per Week</TableCell> : <TableCell className="ward">Days Worked per Month</TableCell>}
                {type === "weekly" ? <TableCell className="ward">Total No. Days</TableCell> : ""}
                {type === "monthly" && <>
                  <TableCell>Amount to be Paid(N)</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Bank Name</TableCell>
                </>}

              </TableRow>
            </TableHead>
            <TableBody>
              {<>

                {usersPerPage.map((user, index) => (
                  <TableRow style={{ cursor: "pointer" }} onClick={() => navigate("/admins/home/employee-profile", { state: user[0]?.employee })}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> {user[0]?.employee?.fullName} </TableCell>
                    <TableCell> {user[0]?.employee?.sex}</TableCell>
                    <TableCell className="ward"> {user[0].employee?.ward?.name}</TableCell>

                    {
                      type === "weekly" &&
                      <TableCell >

                        <div className="d-flex align-items-center justify-content-around">
                          {user?.map((item, i) => (
                            <div className="days-worked mx-1" key={item?._id}>
                              <p className="mb-1">
                                Day {i + 1}
                                <span className={(item.status === "Present" || item.absentReason) ? "tickgreen" : "tickred"}>
                                  {(item.status === "Present" || item.absentReason) ?
                                    <Icon icon="mingcute:check-fill" /> :
                                    <Icon icon="octicon:x-12" />}
                                </span>
                              </p>
                              {new Date(item.date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
                            </div>
                          ))}
                        </div>

                      </TableCell>
                    }


                    <TableCell className="ward">
                      <p>
                        {user?.filter(item => item.status === "Present" || item.absentReason)?.length}/{type === "monthly" ? 10 : 3}
                      </p>

                    </TableCell>
                    {type === "monthly" && <>
                      <TableCell>
                        {user?.filter(item => item.status === "Present" || item.absentReason)?.length * 1000}
                      </TableCell>
                      <TableCell> {user[0]?.employee?.accountNumber} </TableCell>
                      <TableCell> {user[0]?.employee?.bankName}</TableCell>
                    </>}

                  </TableRow>
                ))}
              </>
              }

            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[100, 200, 300, 400]}
            component="div"
            count={attendanceData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div >
  )
}