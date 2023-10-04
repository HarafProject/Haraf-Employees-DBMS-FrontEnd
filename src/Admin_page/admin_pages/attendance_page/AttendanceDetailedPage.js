import React, { useState, useEffect } from "react";
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
import { useQuery } from 'react-query'
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import attendanceReportData from "../../../component/data/AttendanceReportData";
import "./attendance.css";
import supervisor from "../../../class/supervisor.class";
import dataOBJs from "../../../class/data.class";
import { toast } from "react-toastify";

const fetchTypologyData = async (key) => {

  try {

    let res = await supervisor.getWorkTypology()

    return res

  } catch (error) {
    toast.error(error?.error);
  }
};


export default function AttendanceDetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [receivedArray, setReceivedArray] = useState([])
  const [typologyList, setTypologyList] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState([])
  const attendanceData = location.state
  const [tempData, setTempData] = useState()
  // React query fecth data
  const { data, status } = useQuery(['fetchTypologyData'], fetchTypologyData)

  useEffect(() => {
    if (!data) return
    setTypologyList(data.workTypology)
  }, [data])

  useEffect(() => {
    if (!attendanceData) navigate(-1, { replace: true })
    const uniqueWards = Array.from(
      new Map(attendanceData.attendanceRecord.map(obj => [obj.ward._id, obj.ward]))
        .values()
    );
    setWards(uniqueWards)
    setTempData(attendanceData.attendanceRecord)
    setAttendanceRecord(attendanceData.attendanceRecord)
    setReceivedArray(attendanceData)
  }, [attendanceData])

  const goBack = () => {
    navigate(-1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  function handleFilter(e) {

    if (e.target.name === "ward") {

      const datas =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => item.ward._id === e.target.value);
      setAttendanceRecord(datas);
    } else if (e.target.name === "workTypology") {

      const datas =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => item.workTypology._id === e.target.value);
      setAttendanceRecord(datas);
    } else {
      let lowercaseQuery = e.target.value.toLowerCase();

      // Filter the array based on the name key
      let filteredData = tempData.filter(function (item) {

        let lowercaseName = item.employee.fullName?.toLowerCase();
        return lowercaseName.includes(lowercaseQuery);
      });
      setAttendanceRecord(filteredData);
    }
  }



  return (
    <div className="my-4 px-auto attendance-detailed-page">
      <div className=" container-fluid attendance-detailed-header px-4">
        <h1 className="mt-4">
          <Icon
            icon="mdi:arrow-back-circle"
            onClick={goBack}
            className="arrowback-icon me-3"
          />
          Attendance Detail Page
        </h1>
        {/* <h2> Attendance detailed page</h2> */}
        <div className="d-flex justify-content-between attendance-info mt-4">
          <p>
            LGA Supervisor : {<br />}
            <span>{receivedArray?.submittedBy?.firstname} {receivedArray?.submittedBy?.surname}</span>
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
          <p className="comment">
            LGA Supervisor's Comment: {<br />}
            <span>{receivedArray?.comment}</span>
          </p>
          {receivedArray?.reason && <p className="comment">
            Late Submission reason: {<br />}
            <span>{receivedArray?.reason}</span>
          </p>}

        </div>
        <div className="d-flex align-items-center justify-content-end py-3 mt-3 filter-attendance">
          <div className="d-flex filter-option-section align-items-center">
            <div className="search-button px-2 mx-2">
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input type="search" onChange={handleFilter} name="search" placeholder="Search Reports" />
            </div>
            <div className="form-field mx-2">
              <select name="workTypology" id="" onChange={handleFilter}>
                <option value={""}>Work Sector</option>
                {typologyList.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
            <div className="form-field mx-2">
              <select name="ward" id="" onChange={handleFilter}>
                <option value="">Wards</option>
                {
                  wards && wards.map((res, i) => {
                    return (
                      <option value={res._id} key={i}>{res.name}</option>
                    )
                  })
                }
              </select>
            </div>
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
                <TableCell>Absent Reason</TableCell>
                <TableCell>Work Typology</TableCell>
                <TableCell>Ward</TableCell>
                {/* <TableCell>Ticked By</TableCell> */}
                <TableCell>SP. Action</TableCell>
              </TableRow>
            </TableHead>
            {attendanceRecord?.map((beneficiary, index) => {
              console.log(beneficiary)
              return (
                <TableRow key={beneficiary._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={beneficiary?.employee?.fullName}
                      src={beneficiary?.employee?.photo}
                    />
                  </TableCell>
                  <TableCell className="beneficiary-name">{beneficiary?.employee?.fullName}</TableCell>
                  <TableCell>
                    <div></div>
                    {beneficiary?.absentReason ? (
                      <p className="absent-reason">
                        Absent <Icon icon="charm:tick" className="absent-reason" />{" "}
                      </p>
                    ) : beneficiary?.status === "Present" ? (
                      <p className="present">
                        Present <Icon icon="charm:tick" className="present" />{" "}
                      </p>
                    ) : (
                      <p className="absent">
                        Absent <Icon icon="charm:cross" className="absent" />{" "}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{beneficiary?.absentReason ?? "No Reason"}</TableCell>
                  <TableCell>{beneficiary?.workTypology.name}</TableCell>
                  <TableCell>{beneficiary?.ward.name}</TableCell>
                  {/* <TableCell>{receivedArray?.submittedBy?.firstname}</TableCell> */}
                  <TableCell className="d-flex sp-action-column">
                    {beneficiary?.attempt?.map((action) => (
                      <p className="sp-action me-2" key={action?.id}>
                        {action?.status === "Present" ? (
                          <Icon icon="charm:tick" className="present" />
                        ) : (
                          <Icon icon="charm:cross" className="absent" />
                        )}
                        <span>{(new Date(action?.date)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                      </p>
                    ))}
                  </TableCell>
                </TableRow>
              )
            })}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={receivedArray?.attendanceRecord?.length}
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
