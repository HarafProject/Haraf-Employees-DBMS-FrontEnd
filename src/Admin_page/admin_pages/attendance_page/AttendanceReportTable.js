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
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./attendance.css";
import AdminAttendance from "../../../class/adminAttendanceReport.class";
import dataOBJs from "../../../class/data.class";
import { useDispatch, useSelector } from "react-redux";
import AdminAttendanceFilter from "../admin_employee_list_page/AdminAttendanceFilter";
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fetchAttendanceList = async (key) => {

  try {
    const res = await AdminAttendance.getAllZone()
    return res
  } catch (error) {
    toast.error(error?.error);
  }
};


export default function AttendanceReportTable({ onRowClick }) {

  const [activeTab, setActiveTab] = useState("allZones");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([])
  const [zone, setZone] = useState([])
  const [lgaValue, setLgaValue] = useState([])
  const [selectedlgaValue, setSelectedLgaValue] = useState([])
  const { user } = useSelector((state) => state?.user)
  const navigate = useNavigate()

  // React query fecth data
  const { data, status } = useQuery(['fetchAttendanceList',], fetchAttendanceList)

  useEffect(() => {
    if (!data) return
    setTableData(data)
    console.log(data)

  }, [data])
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedLgaValue('')
    setPage(0);
  };
  const [searchData, setSearchData] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isTimePastFour = (time) => {

    const [hour, minutes] = time.split(":");
    const isPM = time.includes("PM");
    let adjustedHour = parseInt(hour, 10);

    if (isPM && adjustedHour !== 12) {
      adjustedHour += 12;
    } else if (!isPM && adjustedHour === 12) {
      adjustedHour = 0;
    }
    console.log(adjustedHour >= 16)
    return adjustedHour >= 16; // 16 represents 4:00 PM
  };
  // Sample array of objects

  // get list of zone and filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zoneResponse, tableDataResponse] = await Promise.all([
          dataOBJs.getZone(),
          AdminAttendance.getAllZone()
        ]);

        const allZonesCount = tableDataResponse.length;
        console.log(allZonesCount)
        const zoneData = zoneResponse.map((zone) => {
          const count = tableDataResponse.reduce((acc, item) => {
            return acc + (item.zone.name === zone.name ? 1 : 0);
          }, 0);

          return { tab: zone.name.split(' ').join('_'), label: zone.name, id: zone._id, count };
        });

        const filterTable = activeTab === 'allZones'
          ? tableDataResponse
          : tableDataResponse.filter((item) => item.zone.name === activeTab.split('_').join(' '));

        setZone([{ tab: 'allZones', label: 'All Zones', count: allZonesCount, id: '' }, ...zoneData]);



      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activeTab]);




  // //get all lga
  // useEffect(() => {
  //   let zoneID = zone.filter((e) => e.tab === activeTab)
  //   if (zone && zoneID[0]?.id) {
  //     let lga = []
  //     dataOBJs.getLgaByZone(zoneID[0]?.id).then((res) => {
  //       res.map((a) => {
  //         lga.push({
  //           name: a.name,
  //           value: a._id
  //         })
  //       })
  //       setLgaValue(lga)
  //     })
  //   } else {
  //     setLgaValue([])
  //   }
  // }, [activeTab])



  return (
    <>
      <div className="dashboard-attendance-table-section my-3">
        {
          user?.role === "super-admin" &&
          <div className="d-flex tab-header my-4">
            {zone && zone.map((item) => (
              <div
                key={item.tab}
                className={`tab-item ${activeTab === item.tab ? 'active' : ''}`}
                onClick={() => handleTabChange(item.tab)}
              >
                {item.label} ({item.count})
              </div>
            ))}
          </div>
        }

        <AdminAttendanceFilter
          allData={data}
          reports={tableData}
          setReports={setTableData}
        />


        <div className="attendance-table">
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
                {tableData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report, index) => {
                    console.log(report)
                    return (
                      <TableRow
                        key={index}
                        onClick={() => navigate("/detailed-attendance", { state: report })}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>

                          {report?.submittedBy?.firstname} {report?.submittedBy?.surname}

                        </TableCell>
                        <TableCell>

                          {new Date(report?.date).toISOString().split('T')[0]}
                        </TableCell>
                        <TableCell
                          className={
                            isTimePastFour(new Date(report?.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })) ? "red-color" : ""
                          }
                        >

                          {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}

                        </TableCell>
                        <TableCell>

                          {report?.attendanceRecord
                            // .flatMap(obj => obj.attempt)
                            .filter(item => item.status === 'Present')
                            .length}

                        </TableCell>
                        <TableCell>

                          {report?.attendanceRecord
                            // .flatMap(obj => obj.attempt)
                            .filter(item => item.status === 'Absent')
                            .length}

                        </TableCell>
                        <TableCell>

                          {report?.lga?.name}

                        </TableCell>
                        <TableCell className="commentColumn">

                          {report?.comment}

                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div >
    </>
  );
}
