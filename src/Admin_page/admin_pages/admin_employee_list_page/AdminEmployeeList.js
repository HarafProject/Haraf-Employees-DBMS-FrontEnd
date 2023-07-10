import React, { useState } from "react";
import { Link } from "react-router-dom";

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

import "./adminEmployeeList.css";

export default function AdminEmployeeList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // function openModal(modalType) {
  //     setIsOpen(true);
  //     setModalType(modalType);
  // }

  // const usersPerPage = usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="employees-table-section">
        <AdminEmployeeDataSummary />
        <AdminEmployeeFilterComponent />
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
                  {usersData.map((user, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          <Avatar alt={user.name} src={user.image} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          {user.workTopology}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          {user.ward}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          {user.phoneNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
                        >
                          {user.age}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/admin-employee-profile/${user.id}`}
                          key={user.id}
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