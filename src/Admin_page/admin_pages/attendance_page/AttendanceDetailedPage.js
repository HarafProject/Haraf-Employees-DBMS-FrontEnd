import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Avatar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import attendanceReportData from "../../../component/data/AttendanceReportData";
import "./attendance.css";

export default function AttendanceDetailedPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id,'id')
  const report = attendanceReportData.find((item) => item.id === parseInt(id));

  // if (!report) {
  //   navigate("/admin-home");
  //   return null;
  // }

  const goBack = () => {
    window.history.go(-1);
  };
  const filteredData = report.beneficiary;

  return (
    <div className="my-4 px-auto attendance-detailed-page">
      <div className=" container-fluid attendance-detailed-header px-4">
        <h1 className="mt-2">
          <Icon
            icon="mdi:arrow-back-circle"
            onClick={goBack}
            className="arrowback-icon me-3"
          />
          Attendance Detail Page
        </h1>
        <h2> Attendance detailed page</h2>
        <div className="d-flex justify-content-between attendance-info">
          <p>
            Supervisor : {<br />}
            <span>{report.supervisor_name}</span>
          </p>
          <p>
            Date Submitted: {<br />}
            <span>{report.date}</span>
          </p>
          <p>
            Time Submitted: {<br />}
            <span>{report.time_sent}</span>
          </p>
          <p>
            Report from: {<br />}
            <span>{report.location}</span>
          </p>
          <p>
            Supervisor's Comment: {<br />}
            <span>{report.comment}</span>
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between py-3 mt-3">
          <div className="d-flex filter-option-section align-items-center">
            <div className="search-button px-2 mx-2">
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input type="search" name="" placeholder="Search Reports" />
            </div>
            <div className="form-field mx-2">
              <select name="worktypology" id="">
                <option>Work Typology</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="wash">wash</option>
                <option value="agricuture">
                  Agriculture, livelihood {<br />} & Value chain
                </option>
                <option value="transport">Transport</option>
              </select>
            </div>
            <div className="form-field mx-2">
              <select name="ward" id="">
                <option value="">Zones</option>
                <option value="all">All</option>
                <option value="adsouth">Admawa South</option>
                <option value="adnorth">Adamawa North</option>
                <option value="adcentral">Adamawa Central</option>
              </select>
            </div>
          </div>
          <div>
            <button className="export"></button>
          </div>
        </div>
      </div>

      <div className="detailed-attendance-table mx-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Headshot</TableCell>
                <TableCell>Beneficiaries</TableCell>
                <TableCell>Attendance Status</TableCell>
                <TableCell>Work Typology</TableCell>
                <TableCell>Ward</TableCell>
                <TableCell>Ticked By</TableCell>
                <TableCell>SP. Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((beneficiary, index) => (
                <TableRow key={beneficiary.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={beneficiary.full_name}
                      src={beneficiary.image}
                    />
                  </TableCell>
                  <TableCell>{beneficiary.full_name}</TableCell>
                  <TableCell>
                    <div></div>
                    {beneficiary.attendance_status === "Present" ? (
                      <p className="present">
                        Present <Icon icon="charm:tick" className="present" />{" "}
                      </p>
                    ) : (
                      <p className="absent">
                        Absent <Icon icon="charm:cross" className="absent" />{" "}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{beneficiary.work_typology}</TableCell>
                  <TableCell>{beneficiary.ward}</TableCell>
                  <TableCell>{report.supervisor_name}</TableCell>
                  <TableCell className="d-flex sp-action-column">
                    {beneficiary.sp_action.map((action) => (
                      <p className="sp-action me-2" key={action.id}>
                        {action.status === "present" ? (
                          <Icon icon="charm:tick" className="present" />
                        ) : (
                          <Icon icon="charm:cross" className="absent" />
                        )}
                        <span>{action.time_tick}</span>
                      </p>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
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
  );
}
