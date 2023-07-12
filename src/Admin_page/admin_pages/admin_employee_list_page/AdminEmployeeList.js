import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import admin from "../../../class/admin.class";
import superAdmin from "../../../class/super.class";
import dataOBJs from "../../../class/data.class";
import supervisor from "../../../class/supervisor.class";
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
} from "@mui/material";

import usersData from "./AdminEmployeeData";
import AdminEmployeeFilterComponent from "./AdminEmployeeFilterComponent";
import AdminEmployeeDataSummary from "./AdminEmployeeDataSummary";

import "./adminemployeelist.css";

export default function AdminEmployeeList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    superAdmin.getAllbeneficiaries().then((res) => {
      setSupervisors(res?.data);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [zone,setZone] = useState({
    menue:[],
    value:""
  })
  const [lga,setLga] = useState({
    menue:[{
      _id:'',
      name:"select zone"
    }],
    value:""
  })
  const [ward,setWard] = useState({
    menue:[],
    value:""
  })
  const [topology,setTopology] = useState({
    menue:[],
    value:""
  })
const [search,setSearch] = useState('')
console.log(search,'search value ')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zoneData, lgaData, topologyData] = await Promise.all([
          dataOBJs.getZone(),
          dataOBJs.getLga(),
          supervisor.getWorkTypology()
        ]);
  
        setZone((prevZone) => ({
          ...prevZone,
          menue: zoneData
        }));
  
        setLga((prevLga) => ({
          ...prevLga,
          menue: lgaData
        }));
  
        setTopology((prevTopology) => ({
          ...prevTopology,
          menue: topologyData?.workTypology
        }));
  
        if (zone.value) {
          filter('zones', zone.value);
        }
        if (lga.value) {
          filter('lgas', lga.value);
        }
        if (topology.value) {
          filter('workTopology', topology.value);
        }
      } catch (error) {
        // Handle error, if needed
        console.error(error);
      }
    };
  
    fetchData();
  }, [lga.value, topology.value, zone.value]);
  
  const filter = async (filterParam, filterValue) => {
    try {
      switch (filterParam) {
        case "zones":
          const zoneResponse = await superAdmin.filterByZone({ zone: filterValue });
          setSupervisors(zoneResponse?.data?.data);
          break;
  
        case "ward":
          // Code for case 2
          const wardResponse = await superAdmin.filterByWards(filterValue);
          setSupervisors(wardResponse?.data);
          break;
  
        case "workTopology":
          // Code for case 3
          const topologyResponse = await superAdmin.filterByWorkTopology({ topology: filterValue });
          console.log(topologyResponse?.data?.data, "data from filter");
          setSupervisors(topologyResponse?.data?.data);
          break;
  
        case "lgas":
          // Code for case 4
          const lgaResponse = await superAdmin.filterByLga({ lga: filterValue });
          setSupervisors(lgaResponse?.data?.data);
          break;
  
        default:
          // Default code if none of the cases match
          const defaultResponse = await superAdmin.getAllbeneficiaries();
          setSupervisors(defaultResponse?.data);
          break;
      }
    } catch (error) {
      // Handle error, if needed
      console.error(error);
    }
  };
  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await superAdmin.search({ searchParams: search });

        // Process the response data here
        console.log(response.data?.beneficiaries);
        setSupervisors(response.data?.beneficiaries);
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };

    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const delayedSearch = debounce(performSearch, 10); // Set the desired debounce delay time in milliseconds (e.g., 500ms)

    if (search) {
      delayedSearch();
    }
  }, [search]);



  return (
    <>
      <div className="employees-table-section">
        <AdminEmployeeDataSummary supervisors={supervisors} />
        <AdminEmployeeFilterComponent
         zone={zone}
          setZone={setZone}
          lga={lga}
          setLga={setLga}
          ward={ward}
          setWard={setWard}
          topology={topology}
          setTopology={setTopology}
          search={search}
          setSearch={setSearch}
           />
        <div>
          <div className="employee-list-table p-3 my-3">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>Headshot</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Topology</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Ward</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supervisors.map((user, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          <Avatar alt={user.name} src={user.photo} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.fullName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.workTypology}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.phone}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.ward}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.age}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user._id}`}
                          key={user._id}
                        >
                          {user.address}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
