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



export default function AnalyticAttendanceReport() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const navigate = useNavigate()
  const [type, setType] = useState("weekly")
  const [dateValues, setDateValues] = useState([])
  const [weekValues, setWeekValues] = useState([])
  const [mthValues, setMthValues] = useState([])
  const [value, setValue] = useState(null)

  const [lgaData, setLgaData] = useState([])
  const [lgaValue, setLgaValue] = useState([]);



  const { data, status, isLoading, error } = useQuery(['fetchEmployeesList',])
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
  const fetchAnalyticsData = async (key, type, value) => {
    if (!type || !value) return
    console.log(type, value)
    try {

      const [analytics, typologyData] = await Promise.all([
        admin.getAnalyticsData(type, value),
        supervisor.getWorkTypology()
      ]);

      return {
        analytics,
        typologyData
      }

    } catch (error) {
      toast.error(error?.error);
    }
  };
  // React query fecth data
  const { dataAnalytic } = useQuery(['fetchAnalyticsData', type, value], fetchAnalyticsData)

  useEffect(() => {
    if (!dataAnalytic) return
    groupData(dataAnalytic.analytics.data)
    console.log("Available LGAs:", dataAnalytic.typologyData.workTypology);
  }, [dataAnalytic])


  function groupData(dataAnalytic) {
    const groupedData = dataAnalytic?.reduce((acc, item) => {
      const lgaName = item.lga.name;

      const status = item.statusAnalytic;

      if (!acc[lgaName]) {
        acc[lgaName] = { Present: 0, Absent: 0 };
      }

      acc[lgaName][status]++;

      return acc;
    }, {});

    setLgaData(Object.keys(groupedData))
  }


  async function fetchWeeks(params) {
    const dataAnalytic = await admin.getAttendanceWeeks()
    setWeekValues(dataAnalytic.weeks)

  }
  async function fetchMonths(params) {
    setMthValues(months)
  }


  const handleLga = (e) => {
    if (!e.target.value) {
      setLgaValue("");
    } else {
      setLgaValue(e.target.value);
      groupData(dataAnalytic.analytics.data.filter((item) => item.lga.name === e.target.value));
    }
  };



  useEffect(() => {
    if (type === "weekly") {
      fetchWeeks()
    } else if (type === "monthly") {
      fetchMonths()
    }
  }, [type])



  useEffect(() => {
    if (!data) return
    setBeneficiaries(data.data)
    console.log(data)
  }, [data])

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








  return (
    <div className="analytic-report-page mt-4">


      <div className="graph-filter-section d-flex justify-content-between">
        {isLoading === "loading" ? (
          <div className='d-flex align-items-center py-2'>
            <RotatingLines width="25" strokeColor="#0173bc" strokeWidth="3" />
            <p style={{ color: "#0173bc", marginBottom: "0" }}>Loading please wait...</p></div>
        )
          : (
            <div className="d-flex filter-option-section align-items-center ">

              <div className="form-field mx-1">
                <select name="lga" id="" onChange={handleLga} value={lgaValue}>
                  <option value="">LGA</option>
                  {lgaData.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field mx-1">
                <select name="type" id="" onChange={(e) => {
                  setLgaValue("")
                  setType(e.target.value)
                }}>
                  {/* <option value="">Interval</option> */}
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
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
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Beneficiary Name</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell className="ward">Ward</TableCell>
                {type === "weekly" ? <TableCell >Days Worked per Week</TableCell> : <TableCell className="ward">Days Worked per Month</TableCell>}
                {type === "weekly" ? <TableCell className="ward">Total No. Days</TableCell> : ""}
                {type === "monthly" && <>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Bank Name</TableCell>
                </>}

              </TableRow>
            </TableHead>
            <TableBody>
              {beneficiaries.map((user, index) => (
                <TableRow onClick={() => navigate("/admins/home/employee-profile", { state: user })}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell> {user.fullName} </TableCell>
                  <TableCell> {user.sex}</TableCell>
                  <TableCell className="ward"> {user.ward?.name}</TableCell>


                  {type === "weekly" ? (
                    <TableCell >
                      {analyticPageData.map((item) => (
                        <div key={item.id} className="d-flex">
                          {item.days.map((day) => (
                            <div key={day.dayNumber} className="days-worked mx-1">
                              <p className="mb-1">
                                Day {day.dayNumber}
                                <span className={day.dailyAttendanceStatus[0].tickStatus === "Present" ? "tickgreen" : "tickred"}>
                                  {day.dailyAttendanceStatus[0].tickStatus === "Present" ?
                                    <Icon icon="mingcute:check-fill" /> :
                                    <Icon icon="octicon:x-12" />}
                                </span>
                              </p>
                              {day.dailyAttendanceStatus[1].date}
                            </div>
                          ))}
                        </div>
                      ))}
                    </TableCell>
                  ) : (
                    <TableCell className="ward">
                      {analyticPageData.map((item) => {
                        const daysPresentCount = item.days.reduce((acc, day) => {
                          if (day.dailyAttendanceStatus[0].tickStatus === "Present") {
                            return acc + 1;
                          }
                          return acc;
                        }, 0);
                        return (
                          <p key={item.id}>
                            {daysPresentCount}/30
                          </p>
                        );
                      })}
                    </TableCell>
                  )}


                  {type === "weekly" && <>
                    <TableCell className="ward">
                      {analyticPageData.map((item) => {
                        const daysPresentCount = item.days.reduce((acc, day) => {
                          if (day.dailyAttendanceStatus[0].tickStatus === "Present") {
                            return acc + 1;
                          }
                          return acc;
                        }, 0);

                        const totalDaysCount = item.days.length;

                        return (
                          <p key={item.id}>
                            {daysPresentCount}/{totalDaysCount}
                          </p>
                        );
                      })}
                    </TableCell>
                  </>}





                  {type === "monthly" && <> <TableCell> {user.accountNumber} </TableCell>
                    <TableCell> {user.bankName}</TableCell></>}


                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={beneficiaries.length}
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