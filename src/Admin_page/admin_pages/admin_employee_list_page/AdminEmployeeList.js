import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useQuery } from 'react-query'
import { toast } from "react-toastify"

import usersData from "./AdminEmployeeData";
import AdminEmployeeFilterComponent from "./AdminEmployeeFilterComponent";
import AdminEmployeeDataSummary from "./AdminEmployeeDataSummary";

import "./adminEmployeeList.css";

const fetchEmployeesList = async (key) => {

  try {
    const res = await admin.getAllGetbeneficiaries()
    return res
  } catch (error) {
    toast.error(error?.error);
  }
};

export default function AdminEmployeeList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const navigate = useNavigate()

  // React query fecth data
  const { data, status } = useQuery(['fetchEmployeesList',], fetchEmployeesList)

  useEffect(() => {
    if (!data) return
    console.log(data.data)
    setBeneficiaries(data.data)

  }, [data])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [search, setSearch] = useState('')




  // useEffect(() => {
  //   const performSearch = async () => {
  //     try {
  //       const response = await superAdmin.search({ searchParams: search });

  //       // Process the response data here
  //       console.log(response.data?.beneficiaries);
  //       setSupervisors(response.data?.beneficiaries);
  //     } catch (error) {
  //       // Handle error here
  //       console.error(error);
  //     }
  //   };

  //   const debounce = (func, delay) => {
  //     let timer;
  //     return (...args) => {
  //       clearTimeout(timer);
  //       timer = setTimeout(() => {
  //         func(...args);
  //       }, delay);
  //     };
  //   };

  //   const delayedSearch = debounce(performSearch, 10); // Set the desired debounce delay time in milliseconds (e.g., 500ms)

  //   if (search) {
  //     delayedSearch();
  //   }
  // }, [search]);



  return (
    <>
      <div className="employees-table-section">
        <AdminEmployeeDataSummary beneficiaries={beneficiaries} />
        <AdminEmployeeFilterComponent
          allData={data?.data}
          beneficiaries={beneficiaries}
          setBeneficiaries={setBeneficiaries}
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
                  {beneficiaries.map((user, index) => (
                    <TableRow onClick={() => navigate("/admin-employee-profile", { state: user })}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar alt={user.name} src={user.photo} />
                      </TableCell>
                      <TableCell>

                        {user.fullName}

                      </TableCell>
                      <TableCell>

                        {user.workTypology?.name}

                      </TableCell>
                      <TableCell>

                        {user.phone}

                      </TableCell>
                      <TableCell>
                        {user.ward?.name}
                      </TableCell>
                      <TableCell>
                        {user.age}
                      </TableCell>
                      <TableCell>
                        {user.address}
                      </TableCell>
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
        </div>
      </div>
    </>
  );
}
