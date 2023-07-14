import React, { useState,useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import attendanceReportData from "../../../component/data/AttendanceReportData";
import "./attendance.css";
import AdminAttendance from "../../../class/adminAttendanceReport.class";
import dataOBJs from "../../../class/data.class";

export default function AttendanceReportTable({ onRowClick }) {
  const [activeTab, setActiveTab] = useState("allZones");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData,setTableData] = useState([])

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData =
    activeTab === "allZones"
      ? attendanceReportData
      : attendanceReportData.filter(
          (report) => report.zone.replace(/\s/g, "") === activeTab
        );
  const totalCount = attendanceReportData.length;
  const countAdamawaSouth = attendanceReportData.filter(
    (report) => report.zone === "Adamawa South"
  ).length;
  const countAdamawaNorth = attendanceReportData.filter(
    (report) => report.zone === "Adamawa North"
  ).length;
  const countAdamawaCentral = attendanceReportData.filter(
    (report) => report.zone === "Adamawa Central"
  ).length;

  const isTimePastFour = (time) => {
    const [hour, minutes] = time.split(":");
    const isPM = time.includes("PM");
    let adjustedHour = parseInt(hour, 10);

    if (isPM && adjustedHour !== 12) {
      adjustedHour += 12;
    } else if (!isPM && adjustedHour === 12) {
      adjustedHour = 0;
    }

    return adjustedHour >= 16; // 16 represents 4:00 PM
  };
// Sample array of objects




const tabData = [
  { tab: 'allZones', label: 'All Zones', count: totalCount },
  { tab: 'AdamawaSouth', label: 'Adamawa South', count: countAdamawaSouth },
  { tab: 'AdamawaNorth', label: 'Adamawa North', count: countAdamawaNorth },
  { tab: 'AdamawaCentral', label: 'Adamawa Central', count: countAdamawaCentral },
];
//get all zone
useEffect(()=>{
  AdminAttendance.getAllZone().then((res)=>{
    console.log(res,'from the table data')
     setTableData(res)
  })
},[setTableData])
console.log(activeTab,'active tab')
  return (
    <>
      <div className="dashboard-attendance-table-section my-3">
        <div className="attendance-header  pt-5 pe-5">
          <h4 className="header-title">LIPWDMS Super Admin Portal</h4>
          <div className="d-flex tab-header my-4">
          {tabData.map((item) => (
            <div
              key={item.tab}
              className={`tab-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => handleTabChange(item.tab)}
            >
              {item.label} ({item.count})
            </div>
          ))}
        </div>
          <div className="d-flex filter-option-section align-items-center py-4 my-2">
            <div className="search-button px-2 mx-2">
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input type="search" name="" placeholder="Search Reports" />
            </div>
            <div className="form-field mx-2">
              <select name="lga" id="">
                <option>LGAs</option>
                <option value="guyuk">Guyuk</option>
                <option value="numan">Numan</option>
                <option value="Ganye">Ganye</option>
                <option value="girei">Girei</option>
                <option value="michika">Michika</option>
              </select>
            </div>
            <div className="form-field mx-2 date-select">
              <Icon icon="simple-line-icons:calender" className="me-3" />
              <select name="date" id="">
                <option>Date</option>
                <option value="29Oct">29 Oct, 2023</option>
                <option value="1jul">1 July, 2023</option>
                <option value="9jul">9 July, 2023</option>
              </select>
            </div>
          </div>
        </div>

        <div className="attendance-table pt-5">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Supervisor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time Sent</TableCell>
                  <TableCell>Present</TableCell>
                  <TableCell>Absent</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData && tableData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report, index) => {
                      return(
                        report?.attendanceRecord
                        .map((a,i)=>{
                          console.log({
                            a,
                            ...report
                          },'attendance')
                          return(
                            <TableRow
                            key={index}
                            as="a"
                            href={`/detailed-attendance/${report?._id}`}
                            
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                               {report?.submittedBy?.firstname}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                              
                            {new Date(report?.date).toISOString().split('T')[0]}
                             
                              </Link>
                            </TableCell>
                            <TableCell
                              className={
                                isTimePastFour(new Date(report.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })) ? "red-color" : ""
                              }
                            >
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                              {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                           {a?.attempt.filter(obj => obj.status === 'Present').length}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                              {a?.attempt.filter(obj => obj.status !== 'Present').length}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                              {report?.lga?.name}
                              </Link>
                            </TableCell>
                            <TableCell className="commentColumn">
                              <Link
                                to={`/detailed-attendance/${report?._id}`}
                                key={index}
                              >
                              {report?.comment}
                              </Link>
                            </TableCell>
                          </TableRow>
                          )
                      })
                      )
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}
