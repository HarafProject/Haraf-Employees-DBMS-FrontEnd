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
  const [zone,setZone] = useState([])
  const [lgaValue,setLgaValue] = useState([])
  const [selectedlgaValue,setSelectedLgaValue] = useState([])
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedLgaValue('')
    setPage(0);
  };
const [searchData,setSearchData] = useState('')
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

    return adjustedHour >= 16; // 16 represents 4:00 PM
  };
// Sample array of objects

//get list of zone and filter
useEffect(() => {
  const fetchData = async () => {
    try {
      const [zoneResponse, tableDataResponse] = await Promise.all([
        dataOBJs.getZone(),
        AdminAttendance.getAllZone()
      ]);

      const allZonesCount = tableDataResponse.length;

      const zoneData = zoneResponse.map((zone) => {
        const count = tableDataResponse.reduce((acc, item) => {
          return acc + (item.zone.name === zone.name ? 1 : 0);
        }, 0);

        return { tab: zone.name.split(' ').join('_'), label: zone.name,id:zone._id, count };
      });

      const filterTable = activeTab === 'allZones'
        ? tableDataResponse
        : tableDataResponse.filter((item) => item.zone.name === activeTab.split('_').join(' '));

      setTableData(filterTable);
      setZone([{ tab: 'allZones', label: 'All Zones', count: allZonesCount,id:'' }, ...zoneData]);
      if (searchData && searchData.length > 1) {
        const filterSearch = filterTable.filter((item) => {
          const firstName = item?.submittedBy?.firstname || '';
          return firstName.toLowerCase().startsWith(searchData.toLowerCase());
        });
        setTableData(filterSearch);
      } else {
        setTableData(filterTable);
      }
      if (selectedlgaValue) {
        const lgaFilter = filterTable.filter((item) => item.lga._id === selectedlgaValue);
        setTableData(lgaFilter);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
 
  fetchData();
}, [activeTab, searchData, selectedlgaValue, tableData]);





//get all lga
useEffect(()=>{
  let zoneID = zone.filter((e)=> e.tab === activeTab)
  if(zone && zoneID[0]?.id){
    let lga = []
    dataOBJs.getLgaByZone(zoneID[0]?.id).then((res)=>{
      res.map((a)=>{
        lga.push({
          name:a.name,
          value:a._id
        })
      })
      setLgaValue(lga)
    })
  }else{
    setLgaValue([])
  }
},[activeTab])


  
  return (
    <>
      <div className="dashboard-attendance-table-section my-3">
        <div className="attendance-header  pt-5 pe-5">
          <h4 className="header-title">LIPWDMS Super Admin Portal</h4>
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
          <div className="d-flex filter-option-section align-items-center py-4 my-2">
            <div className="search-button px-2 mx-2">
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input type="search" value={searchData} onChange={e=> setSearchData(e.target.value)} name="" placeholder="Search Reports" />
            </div>
            <div className="form-field mx-2">
              <select name="lga" id="" onChange={(e)=> setSelectedLgaValue(e.target.value)}>
                <option>LGAs</option>
               {
                lgaValue.map((a,i)=>{
                  return( <option value={a?.value} key={i}>{a?.name}</option>

                  )
                })
               }
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
                    const queryParam = encodeURIComponent(JSON.stringify(report))
                      return(
                        <TableRow
                        key={index}
                        as="a"
                        href={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                        
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                           {report?.submittedBy?.firstname}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
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
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                          {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                     
                          {report?.attendanceRecord
                            .flatMap(obj => obj.attempt)
                            .filter(attempt => attempt.status === 'Present')
                            .length}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                          {report?.attendanceRecord
                            .flatMap(obj => obj.attempt)
                            .filter(attempt => attempt.status === 'Absent')
                            .length}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                          {report?.lga?.name}
                          </Link>
                        </TableCell>
                        <TableCell className="commentColumn">
                          <Link
                            to={`/detailed-attendance/${report?._id}?data=${queryParam}`}
                            key={index}
                          >
                          {report?.comment}
                          </Link>
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
      </div>
    </>
  );
}
