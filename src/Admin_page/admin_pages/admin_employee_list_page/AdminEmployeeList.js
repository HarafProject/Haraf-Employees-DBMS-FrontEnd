import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../class/admin.class";

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
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AdminEmployeeFilterComponent from "./AdminEmployeeFilterComponent";
import AdminEmployeeDataSummary from "./AdminEmployeeDataSummary";
import { RotatingLines } from "react-loader-spinner";

import "./adminemployeelist.css";

const fetchEmployeesList = async (key) => {
  try {
    const res = await admin.getAllGetbeneficiaries();
    return res;
  } catch (error) {
    toast.error(error?.error);
  }
};

export default function AdminEmployeeList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const navigate = useNavigate();

  // React query fecth data
  const { data, status } = useQuery(["fetchEmployeesList"], fetchEmployeesList);

  useEffect(() => {
    if (!data) return;
    setBeneficiaries(data.data);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const usersPerPage = beneficiaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="employees-table-section">
        <AdminEmployeeDataSummary beneficiaries={beneficiaries} />

        {
          status === "loading" ? <div className='d-flex align-items-center px-5 py-3'><RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc" }}>Loading please wait...</p></div> :
            <AdminEmployeeFilterComponent
              allData={data?.data}
              beneficiaries={beneficiaries}
              setBeneficiaries={setBeneficiaries}
              showLastSelect={false}
              showOtherOption
            />
        }
        {/* {status === "loading" ? (
        {/* {status === "loading" ? (
          <div className="d-flex align-items-center px-5 py-3">
            <RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" />{" "}
            <p style={{ color: "#0173bc" }}>Loading please wait...</p>
          </div>
        ) : (
          <AdminEmployeeFilterComponent
            allData={data?.data}
            beneficiaries={beneficiaries}
            setBeneficiaries={setBeneficiaries}
          />
        )} */}

        <div>
          <div className="employee-list-table my-3">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>Headshot</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Sector</TableCell>
                    <TableCell>Work Typology</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>LGA</TableCell>
                    <TableCell>Ward</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Community</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersPerPage.map((user, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell onClick={() =>
                        navigate("/admins/home/employee-profile", {
                          state: user,
                        })
                      }>
                        <Avatar alt={user.name} src={user.photo} />
                      </TableCell>
                      <TableCell onClick={() =>
                        navigate("/admins/home/employee-profile", {
                          state: user,
                        })
                      }>{user.fullName}</TableCell>
                      <TableCell className="table-typology">{user.workTypology?.name}</TableCell>
                      <TableCell>{(user.subWorkTypology?.name.length > 40) ? `${user.subWorkTypology?.name.slice(0, 40)}...` : user.subWorkTypology?.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.lga?.name}</TableCell>
                      <TableCell>{user.ward?.name}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.community}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[50, 100, 150]}
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
