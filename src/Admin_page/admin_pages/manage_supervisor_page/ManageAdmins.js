import React, { useState, useEffect, useRef } from "react";
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
import "./managesupervisor.css";
import manageSupervisior from "../../../class/ManageSupervisior.class";
import dataOBJs from "../../../class/data.class";
// import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import AdminAttendanceFilter from "../admin_employee_list_page/AdminAttendanceFilter";
import superAdmin from "../../../class/super.class";
import ManageSupervisorModal from "../../../component/reusable/modalscontent/ManageSupervisorModal";

export default function ManageAdmins() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState("");
  const [adminName, setAdminName] = useState("");
  const [getRole, setGetRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [admin, setAdmin] = useState([])
  const [userId, setUserId] = useState([])
  const [zone, setZone] = useState([])
  const [selectedZone, setSelectedZone] = useState('')
  const [lgaValue, setLgaValue] = useState([])
  const [search, setSearch] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const pdfRef = useRef()
  const { user } = useSelector((state) => state?.user)
  const [allData, setAllData] = useState([])

  function openModal(buttonClick, adminName, getRole, id) {
    setAdminName(adminName);
    setIsOpen(true);
    setButtonClick(buttonClick);

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

  // const handleDownload = () => {
  //   setIsLoading(true)
  //   if (!pdfRef.current || !admin) {
  //     console.error('PDF reference is not available.');
  //     return;
  //   }

  //   const input = pdfRef.current;

  //   // Set background color to white
  //   input.style.backgroundColor = 'white';
  //   const divToHide = input.querySelector('.manage-admin-header');
  //   const divToHide2 = input.querySelector('.manage-admin-table');

  //   if (divToHide) {

  //     divToHide.style.position = 'relative'

  //   }
  //   if(divToHide2){
  //     divToHide2.style.marginTop = '0'
  //   }
  //   domtoimage
  //     .toPng(input)
  //     .then((dataUrl) => {
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();
  //       const img = new Image();

  //       img.onload = () => {
  //         const contentWidth = img.width;
  //         const contentHeight = img.height;

  //         let imgWidth, imgHeight;
  //         let offsetX = 0;
  //         let offsetY = 0;
  //         const aspectRatio = contentWidth / contentHeight;

  //         if (aspectRatio > 1) {
  //           imgWidth = pdfWidth;
  //           imgHeight = imgWidth / aspectRatio;
  //           offsetY = 0;
  //         } else {
  //           imgHeight = pdfHeight;
  //           imgWidth = imgHeight * aspectRatio;
  //           offsetX = (pdfWidth - imgWidth) / 2;
  //         }

  //         // Add image content
  //         pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, imgWidth, imgHeight);
  //         pdf.save('admins_and_Admins.pdf');
  //       };

  //       img.src = dataUrl;
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error('Error generating PDF:', error);
  //       setIsLoading(false)
  //     })
  //   .finally(() => {
  //     setIsLoading(false)
  //     // Reset background color after capturing
  //     input.style.backgroundColor = '';
  //     if (divToHide) {

  //       divToHide.style.position = 'fixed'
  //     }
  //     if(divToHide2){
  //       divToHide2.style.marginTop = '150px'
  //     }
  //   });
  // };

  const handleZoneSelected = (e) => {
    console.log(e, 'inpiu')
    setSelectedZone(e)
    if (e) {
      dataOBJs.getLgaByZone(e).then((res) => {
        let arr = []
        res.map((a) => {
          console.log(a, 'reseee')
          arr.push({
            name: a.name,
            value: a._id
          })
        })
        console.log(arr, 'new arr')
        setLgaValue(arr)
      })
    }

  }
  //get supervisior details 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const res = await superAdmin.getAll();
        const adminData = res?.data;
        setTotalCount(adminData.length);
        setAdmin(adminData);
        setAllData(adminData);
        setIsLoading(false); // Finish loading
      } catch (error) {
        setIsLoading(false); // In case of an error, finish loading
        console.log(error);
      }
    };

    fetchData();
  }, [search, selectedZone]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
      <div className="manage-admin-page">
        <div className="container manage-admin-header">
          <div className="d-flex align-items-center justify-content-between ">
            <h1>admins ({totalCount})</h1>

            {isLoading ? <div className='d-flex align-items-center px-5 py-3'>
              <RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" />
              <p style={{ color: "#0173bc" }}>Loading please wait...</p>
            </div> : <AdminAttendanceFilter
              reports={admin}
              setReports={setAdmin}
              allData={allData}
            />
            }



          </div>
        </div>

        <div className="manage-admin-table" >
          <TableContainer component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Zone</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admin && admin
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((adminData, index) => (
                    <TableRow key={adminData.id}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <p className="d-flex flex-column admin-name">
                          {adminData.firstname} {adminData.surname}
                          <span>{adminData.email}</span>
                        </p>
                      </TableCell>
                      <TableCell>{adminData.role}</TableCell>
                      <TableCell>{adminData?.zone?.name}</TableCell>
                      <TableCell>{adminData.lga.name}</TableCell>
                      <TableCell>{adminData.phone}</TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <button
                            className="btn manage-admin-btn"
                            onClick={() =>
                              openModal(
                                "delete-admin",
                                adminData.firstname,
                                adminData.role,
                                adminData._id
                              )
                            }
                          >
                            <Icon icon="carbon:delete" className="delete-icon" />{" "}
                            Delete
                          </button>

                          {
                            adminData?.isVerified === true ? <p
                              className="btn manage-admin-btn"

                            >

                              <Icon
                                icon="carbon:checkmark"
                                className="verify-icon"
                              />{" "}
                              Verified
                            </p> : <button
                              className="btn manage-admin-btn"
                              onClick={() =>
                                openModal(
                                  "verify-admin",
                                  adminData.firstname,
                                  adminData.role,
                                  adminData._id
                                )
                              }
                            >

                              <Icon
                                icon="carbon:x"
                                className="verify-icon"
                                style={{ color: "red" }}
                              />
                              Verify now
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
              count={admin.length}
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
          supervisorName={adminName}
          getRole={getRole}
          id={userId}
          supervisor={admin}
          setSupervisor={setAdmin}
        />
      </Modal>


    </>
  );
}
