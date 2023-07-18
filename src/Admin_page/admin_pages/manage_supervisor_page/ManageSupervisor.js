import React, { useState,useEffect,useRef} from "react";
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
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { RotatingLines } from "react-loader-spinner";

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
  const [selectedZone,setSelectedZone] = useState('')
  const [lgaValue,setLgaValue] = useState([])
 const [search,setSearch] = useState('')
 const [totalCount,setTotalCount] = useState(0)
 const [isLoading,setIsLoading] = useState(false)
const pdfRef = useRef()

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

  const handleDownload = () => {
    setIsLoading(true)
    if (!pdfRef.current || !supervisor) {
      console.error('PDF reference is not available.');
      return;
    }

    const input = pdfRef.current;

    // Set background color to white
    input.style.backgroundColor = 'white';
    const divToHide = input.querySelector('.manage-supervisor-header');
    const divToHide2 = input.querySelector('.manage-supervisor-table');
    
    if (divToHide) {
      
      divToHide.style.position = 'relative'
      
    }
    if(divToHide2){
      divToHide2.style.marginTop = '0'
    }
    domtoimage
      .toPng(input)
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const img = new Image();

        img.onload = () => {
          const contentWidth = img.width;
          const contentHeight = img.height;

          let imgWidth, imgHeight;
          let offsetX = 0;
          let offsetY = 0;
          const aspectRatio = contentWidth / contentHeight;

          if (aspectRatio > 1) {
            imgWidth = pdfWidth;
            imgHeight = imgWidth / aspectRatio;
            offsetY = 0;
          } else {
            imgHeight = pdfHeight;
            imgWidth = imgHeight * aspectRatio;
            offsetX = (pdfWidth - imgWidth) / 2;
          }

          // Add image content
          pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, imgWidth, imgHeight);
          pdf.save('Supervisors_and_Admins.pdf');
        };

        img.src = dataUrl;
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        setIsLoading(false)
      })
    .finally(() => {
      setIsLoading(false)
      // Reset background color after capturing
      input.style.backgroundColor = '';
      if (divToHide) {
       
        divToHide.style.position = 'fixed'
      }
      if(divToHide2){
        divToHide2.style.marginTop = '150px'
      }
    });
  };

  const handleZoneSelected = (e)=>{
    console.log(e,'inpiu')
    setSelectedZone(e)
    if(e){
      dataOBJs.getLgaByZone(e).then((res)=>{
        let arr =[]
      res.map((a)=>{
        console.log(a,'reseee')
        arr.push({
          name:a.name,
          value:a._id
        })
      })
      console.log(arr,'new arr')
        setLgaValue(arr)
      })
    }
 
  }
//get supervisior details 



useEffect(() => {
  manageSupervisior.getAll().then((res) => {
    const supervisorData = res?.data;
    setTotalCount(supervisorData.length)
    let filteredSupervisorData = supervisorData;

    if (search && search.trim().length >= 1) {
      filteredSupervisorData = supervisorData.filter((a) => {
        const firstName = a?.firstname || '';
        return firstName.toLowerCase().startsWith(search.toLowerCase());
      });
    }

    if (selectedZone) {
      filteredSupervisorData = filteredSupervisorData.filter((a) => a.zone === selectedZone);
    }

    setSupervisor(filteredSupervisorData);
  });
}, [search, selectedZone]);




console.log(supervisor,'supervisior data')


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

useEffect(()=>{
 const getZone = async()=>{
  try{
    const [zoneResponse] = await Promise.all([
      dataOBJs.getZone(),
    ]);
    console.log(zoneResponse,'zones')
    let arr =[]
    zoneResponse.map((a)=>{
      arr.push({
        name:a.name,
        value:a._id
      })
    })
    setZone(arr)
  }catch(err){

  }
 }
 getZone()
},[])

const getLocationFromZone = (id)=>{
  console.log(id,zone.filter((a)=> a.value === id),'zone')
  return zone && zone.filter((a)=> a.value === id)[0]?.name
}
  return (
    <>
      <div className="manage-supervisor-page py-3" ref={pdfRef}>
        <div className="container manage-supervisor-header py-4">
          <h4 className="header-title mt-4">LIPWDMS Super Admin Portal</h4>
          <div className="d-flex align-items-center   mt-5 ">
            <h1>Supervisors & Admins ({totalCount})</h1>
            <div className="d-flex filter-option-section align-items-center  mx-4">
              <div className="search-button px-2 mx-1">
                <Icon icon="eva:search-outline" className="me-2 search-icon" />
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="search" name="" placeholder="Search Reports" />
              </div>
              <div className="form-field mx-1">
                <select name="lga" id="">
                  <option>LGAs</option>
                 {
                  lgaValue && lgaValue.map((a,i)=>{
                    return(
                      <option value={a.value}>{a.name}</option>
                    )
                  })
                 }
                </select>
              </div>
              <div className="form-field mx-1">
                <select placeholder="select zone" onChange={(e) => handleZoneSelected(e.target.value)} name="zones" id="">
                 
                 {
                  zone && zone.map((a,i)=>{
                    return(
                      <option value={a?.value}>{a?.name}</option>
                    )
                  })
                 }
                </select>
              </div>
            </div>
            <div className="export">
              <button className="btn export-file-btn" disabled={isLoading} onClick={handleDownload}>
              {isLoading ? (
                <RotatingLines width="20" strokeColor="#FFF" strokeWidth="3" />
              ) : (
                <>
                <img width="20" className="export-icon" height="20" src="https://img.icons8.com/ios-filled/20/ffffff/export-pdf.png" alt="export-pdf"/>
                Export
                </>
                
              )}
                
              </button>
            </div>
          </div>
        </div>

        <div className="manage-supervisor-table" >
          <TableContainer component={Paper} >
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
                    <TableCell>{getLocationFromZone(supervisor.zone)}</TableCell>
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
