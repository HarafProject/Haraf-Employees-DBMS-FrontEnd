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
  Avatar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import attendanceReportData from "../../../component/data/AttendanceReportData";
import "./attendance.css";
import supervisor from "../../../class/supervisor.class";
import dataOBJs from "../../../class/data.class";

export default function AttendanceDetailedPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [zone, setZone] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("data");
  let receivedArray = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : [];

  useEffect(() => {
    if (dataParam) {
      const attendanceRecord = receivedArray?.attendanceRecord || [];
      setTableData(attendanceRecord);
      console.log(attendanceRecord, "testing");
    }
  }, [dataParam]);

  useEffect(() => {
    supervisor.getWorkTypology((res) => {
      console.log(res, "toplogy");
    });

    dataOBJs.getZone().then((res) => {
      const arr = res.map((a) => ({
        name: a.name,
        value: a._id,
      }));
      setZone(arr);
      console.log(arr, "res from zone");
    });
  }, []);

  useEffect(() => {
    if (searchData && searchData.length >= 1) {
      const filterSearch = receivedArray?.attendanceRecord.filter((item) =>
        item?.employee.toLowerCase().startsWith(searchData.toLowerCase())
      );
      setTableData(filterSearch);
    } else if (selectedZone) {
      const filterZone = receivedArray?.attendanceRecord?.filter(
        (i) => i.zone === selectedZone
      );
      setTableData(filterZone);
      console.log(filterZone);
    } else if (dataParam) {
      const attendanceRecord = receivedArray?.attendanceRecord || [];
      setTableData(attendanceRecord);
    }
  }, [dataParam, receivedArray?.attendanceRecord, searchData, selectedZone]);

  const goBack = () => {
    window.history.go(-1);
  };
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
            <span>{receivedArray?.submittedBy?.firstname }</span>
          </p>
          <p>
            Date Submitted: {<br />}
            <span>
            {new Date(receivedArray?.updatedAt).toLocaleDateString()}
            </span>
          </p>
          <p>
            Time Submitted: {<br />}
            <span>{new Date(receivedArray?.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </p>
          <p>
            Report from: {<br />}
            <span>{receivedArray?.lga?.name}</span>
          </p>
          <p>
            Supervisor's Comment: {<br />}
            <span>{receivedArray?.comment}</span>
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between py-3 mt-3">
          <div className="d-flex filter-option-section align-items-center">
            <div className="search-button px-2 mx-2">
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input type="search" value={searchData} onChange={(e)=> setSearchData(e.target.value)} name="" placeholder="Search Reports" />
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
              <select name="ward" id="" onChange={(e)=> setSelectedZone(e.target.value)}>
                <option value="">Zones</option>
                {
                  zone && zone.map((res,i)=>{
                    return(
                      <option value={res.value} key={i}>{res.name}</option>
                    )
                  })
                }
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
            {tableData.length >=1 && tableData.map((beneficiary, index) => (
              <TableRow key={beneficiary._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    alt={beneficiary?.employee}
                    // src={beneficiary?.image}
                  />
                </TableCell>
                <TableCell>{beneficiary?.employee}</TableCell>
                <TableCell>
                  <div></div>
                  {beneficiary?.status === "Present" ? (
                    <p className="present">
                      Present <Icon icon="charm:tick" className="present" />{" "}
                    </p>
                  ) : (
                    <p className="absent">
                      Absent <Icon icon="charm:cross" className="absent" />{" "}
                    </p>
                  )}
                </TableCell>
                <TableCell>{beneficiary?.workTypology}</TableCell>
                <TableCell>{beneficiary?.ward}</TableCell>
                <TableCell>{receivedArray?.submittedBy?.firstname}</TableCell>
                <TableCell className="d-flex sp-action-column">
                  {beneficiary?.attempt.map((action) => (
                    <p className="sp-action me-2" key={action?.id}>
                      {action?.status === "present" ? (
                        <Icon icon="charm:tick" className="present" />
                      ) : (
                        <Icon icon="charm:cross" className="absent" />
                      )}
                      <span>{action?.time_tick}</span>
                    </p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={receivedArray.length}
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
