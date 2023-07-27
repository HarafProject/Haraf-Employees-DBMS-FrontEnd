import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query'
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

import html2pdf from 'html2pdf.js';
import admin from "../../../../class/admin.class";
import supervisor from "../../../../class/supervisor.class";
import { RotatingLines } from "react-loader-spinner";
import analyticPageData from './AnalyticPageData';
import { useSelector } from "react-redux";
import dataOBJs from "../../../../class/data.class";

export default function AnalyticAttendanceReport() {
  const { user } = useSelector((state) => state?.user)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [attendanceData, setAttendanceData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const navigate = useNavigate()
  const [type, setType] = useState("weekly")
  const [dateValues, setDateValues] = useState([])
  const [weekValues, setWeekValues] = useState([])
  const [mthValues, setMthValues] = useState([])
  const [value, setValue] = useState(null)
  const [lga, setLga] = useState(null)
  const [lgaData, setLgaData] = useState([])
  const [lgaValue, setLgaValue] = useState([]);

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


  const handleExportPDF = async () => {
    try {
      const input = document.getElementById('table-to-export');
      if (!input) {
        return;
      }

      // Save the original table width
      const originalTableWidth = input.style.width;

      // Set the table width to a fixed value for proper rendering
      input.style.width = '1000px';

      const opt = {
        margin: 5,
        filename: 'table_export.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };

      const worker = html2pdf().from(input).set(opt);
      await worker.save();

      // Restore the original table width
      input.style.width = originalTableWidth;
    } catch (error) {
      console.error('Error exporting as PDF:', error);
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
        <div> <Button className="btn export-btn" onClick={handleExportPDF}>
          <Icon icon="clarity:export-solid" className="me-1" />
          Export report
        </Button></div>

      </div>


      <div className="employee-list-table mt-3">
        <TableContainer component={Paper} id="table-to-export">
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
                  <TableCell>Account Number</TableCell>
                  <TableCell>Bank Name</TableCell>
                </>}

              </TableRow>
            </TableHead>
            <TableBody>
              {<>

                {attendanceData.map((user, index) => (
                  <TableRow style={{cursor:"pointer"}} onClick={() => navigate("/admins/home/employee-profile", { state: user[0]?.employee })}>
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
                                <span className={item.status === "Present" ? "tickgreen" : "tickred"}>
                                  {item.status === "Present" ?
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
                        {user?.filter(item => item.status === "Present")?.length}/{user.length}
                      </p>

                    </TableCell>
                    {type === "monthly" && <>
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
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