import React, { useState } from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
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
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import usersData from "../../../component/data/EmployeesData";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import EmployeeTableFilterOption from "../../../component/reusable/tablefilteroptions/EmployeesFilterOptions";
import SendRequestModal from "../../../component/reusable/modalscontent/SendRequestModal";

export default function EmployeeListTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
=======
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Avatar, TablePagination } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import usersData from '../../../component/data/EmployeesData';
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader';
import EmployeeTableFilterOption from '../../../component/reusable/tablefilteroptions/EmployeesFilterOptions';
import SendRequestModal from '../../../component/reusable/modalscontent/SendRequestModal';
import EmptyEmployeeList from './EmptyEmployeeListScreen';

export default function EmployeeListTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
>>>>>>> origin/admin_sidebar

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

<<<<<<< HEAD
  function openModal() {
    setIsOpen(true);
  }
=======
    // function openModal(modalType) {
    //     setIsOpen(true);
    //     setModalType(modalType);
    // }

    const openModal = (getModalType) => { // Modify openModal function
        setIsOpen(true);
        setModalType(getModalType()); // Invoke the function to get modalType
      };
>>>>>>> origin/admin_sidebar

  function closeModal() {
    setIsOpen(false);
  }

<<<<<<< HEAD
  const usersPerPage = usersData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
=======
    // const usersPerPage = usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
>>>>>>> origin/admin_sidebar

  return (
    <>
      <ReusableHeader />
      <div className="employees-table-section py-5 my-4">
        <EmployeeTableFilterOption />
        <div>
          <div className="employee-list-table p-3 my-3">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>Headshots</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Topology</TableCell>
                    <TableCell>Ward</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Age</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData.map((user, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          <Avatar alt={user.full_name} src={user.image} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          {user.full_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          {user.work_typology}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          {user.ward}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          {user.phone_number}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/employeeprofile/${user.id}`} key={user.id}>
                          {user.age}
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
          <div>
            <button className="floating-button" onClick={openModal}>
              <Icon icon="icon-park-outline:add-one" />
              <span>Add Employee</span>
            </button>

<<<<<<< HEAD
            {/* {isModalOpen && <SendRequestModal closeModal={closeModal} />} */}
          </div>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={{
              base: "modal-base",
              afterOpen: "modal-base_after-open",
              beforeClose: "modal-base_before-close",
            }}
            overlayClassName={{
              base: "overlay-base",
              afterOpen: "overlay-base_after-open",
              beforeClose: "overlay-base_before-close",
            }}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={2000}
          >
            <SendRequestModal closeModal={closeModal} />
          </Modal>
        </div>
      </div>
    </>
  );
=======
    return (
        <>
            <ReusableHeader />
            {/* {usersData.length > 0 ? ( */}
            <div className="employees-table-section py-5 my-4">
                <EmployeeTableFilterOption />
                <div>
                    <div className="employee-list-table p-3 my-3">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S/N</TableCell>
                                        <TableCell>Headshots</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Topology</TableCell>
                                        <TableCell>Ward</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Age</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersData.map((user, index) => (
                                        
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >
                                                <Avatar alt={user.full_name} src={user.image} />
                                            </Link></TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >{user.full_name}</Link></TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >{user.work_typology}</Link></TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >{user.ward}</Link></TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >{user.phone_number}</Link></TableCell>
                                            <TableCell><Link to={`/employee-profile/${user.id}`} key={user.id} >{user.age}</Link></TableCell>
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
                    <div>
                        
                        <button className="floating-button" onClick={() => openModal(() => 'add')}>
                            <Icon icon="icon-park-outline:add-one" />
                            <span>Add Employee</span>
                        </button>



                        {/* {isModalOpen && <SendRequestModal closeModal={closeModal} />} */}
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className={{
                            base: 'modal-base',
                            afterOpen: 'modal-base_after-open',
                            beforeClose: 'modal-base_before-close'
                        }}
                        overlayClassName={{
                            base: 'overlay-base',
                            afterOpen: 'overlay-base_after-open',
                            beforeClose: 'overlay-base_before-close'
                        }}
                        shouldCloseOnOverlayClick={true}
                        closeTimeoutMS={2000}
                    >
                        
                        <SendRequestModal closeModal={closeModal} actionType={modalType} />
                    </Modal>
                </div>


            </div>
             {/* ):
            (<EmptyEmployeeList />)} */}
        </>




    )
>>>>>>> origin/admin_sidebar
}
