import React, { useState,useEffect } from "react";
import Modal from "react-modal";
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
import adminSupervisorList from "../../../component/data/ListOfAdminSupervisors";
import "./managesupervisor.css";
import ManageSupervisorModal from "../../../component/reusable/modalscontent/ManageSupervisorModal";
import manageSupervisior from "../../../class/ManageSupervisior.class";
import dataOBJs from "../../../class/data.class";

export default function ManageSupervisor() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [getRole, setGetRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [supervisor,setSupervisor] = useState([])
  const [userId,setUserId] = useState([])
  const [zone,setZone] = useState([])
  const [lgaValue,setLgaValue] = useState([])
  const [selectedlgaValue,setSelectedLgaValue] = useState([])
  

  function openModal(buttonClick, supervisorName, getRole,id) {
    setIsOpen(true);
    setButtonClick(buttonClick);
    setSupervisorName(supervisorName);
    setGetRole(getRole);
    setUserId(id)
  }

  function closeModal() {
    setIsOpen(false);
    setModalClosed(true);
  }

  function closeSnackbar() {
    setSnackbarOpen(false);
    setModalClosed(false);
  }
//get supervisior details 


const getDetails = ()=>{
  manageSupervisior.getAll().then((res)=>{
    setSupervisor(res?.data)
    console.log(res.data, 'response from sup')
  })
}

useEffect(()=>{
  getDetails()
},[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const totalCount = adminSupervisorList.length;
useEffect(()=>{
 const getZone = async()=>{
  try{
    const [zoneResponse] = await Promise.all([
      dataOBJs.getZone(),
    ]);
    console.log(zoneResponse,'zones')

  }catch(err){

  }
 }
 getZone()
})
  return (
    <>
      <div className="manage-supervisor-page py-3">
        <div className="container manage-supervisor-header py-4">
          <h4 className="header-title mt-4">LIPWDMS Super Admin Portal</h4>
          <div className="d-flex align-items-center  mt-5 ">
            <h1>Supervisors & Admins ({totalCount})</h1>
            <div className="d-flex filter-option-section align-items-center mx-4">
              <div className="search-button px-2 mx-1">
                <Icon icon="eva:search-outline" className="me-2 search-icon" />
                <input type="search" name="" placeholder="Search Reports" />
              </div>
              <div className="form-field mx-1">
                <select name="lga" id="">
                  <option>LGAs</option>
                  <option value="guyuk">Guyuk</option>
                  <option value="numan">Numan</option>
                  <option value="Ganye">Ganye</option>
                  <option value="girei"></option>
                  <option value="michika">Michika</option>
                </select>
              </div>
              <div className="form-field mx-1">
                <select name="zones" id="">
                  <option>Zones</option>
                  <option value="all">All</option>
                  <option value="adsouth">Adamawa South</option>
                  <option value="adnorth">Adamawa North</option>
                  <option value="adcentral">Adamawa Central</option>
                </select>
              </div>
            </div>
            <div className="export">
              <button className="btn export-file-btn">
                <Icon
                  icon="mingcute:file-export-fill"
                  className="export-icon"
                />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="manage-supervisor-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supervisor && supervisor
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((supervisor, index) => (
                  <TableRow key={supervisor.id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <p className="d-flex flex-column admin-name">
                        {supervisor.firstname }
                        <span>{supervisor.email}</span>
                      </p>
                    </TableCell>
                    <TableCell>{supervisor.role}</TableCell>
                    <TableCell>{supervisor.zone}</TableCell>
                    <TableCell>{supervisor.phone}</TableCell>
                    <TableCell>
                      <div className="d-flex">
                        <button
                          className="btn manage-supervisor-btn"
                          onClick={() =>
                            openModal(
                              "delete",
                              supervisor.firstname,
                              supervisor.role,
                              supervisor._id
                            )
                          }
                        >
                          <Icon icon="carbon:delete" className="delete-icon" />{" "}
                          Delete
                        </button>
                        
                        {
                          supervisor?.isVerified === true ? <button
                          className="btn manage-supervisor-btn"
                          onClick={() =>
                            openModal(
                              "verify",
                              supervisor.firstname,
                              supervisor.role,
                              supervisor._id
                            )
                          }
                        >
                       
                          <Icon
                            icon="carbon:checkmark"
                            className="verify-icon"
                          />{" "}
                          Verify
                        </button> : <button
                        className="btn manage-supervisor-btn"
                        onClick={() =>
                          openModal(
                            "unverify",
                            supervisor.firstname,
                            supervisor.role,
                            supervisor._id
                          )
                        }
                      >
                     
                      <Icon
                      icon="carbon:x"
                      className="verify-icon"
                      style={{ color: "red" }}
                    />
                        Unverify
                      </button>

                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={supervisor.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
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
        <ManageSupervisorModal
          closeModal={closeModal}
          buttonClick={buttonClick}
          supervisorName={supervisorName}
          getRole={getRole}
          id={userId}
        />
      </Modal>

      
    </>
  );
}
