import React, { useState } from 'react';
import Modal from 'react-modal';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Avatar, TablePagination } from '@mui/material';
import { Icon } from '@iconify/react';
import adminSupervisorList from '../../../component/data/ListOfAdminSupervisors';
import './managesupervisor.css'
import ManageSupervisorModal from '../../../component/reusable/modalscontent/ManageSupervisorModal';

export default function ManageSupervisor() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [buttonClick, setButtonClick] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [getRole, setGetRole] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalClosed, setModalClosed] = useState(false);

    function openModal(buttonClick, supervisorName, getRole) {
        setIsOpen(true);
        setButtonClick(buttonClick);
        setSupervisorName(supervisorName);
        setGetRole(getRole);
    }

    function closeModal() {
        setIsOpen(false);
        setModalClosed(true);
    }

    function closeSnackbar(){
        setSnackbarOpen(false)
        setModalClosed(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const totalCount = adminSupervisorList.length;

    return (
        <>
            <div className="manage-supervisor-page py-3">
                <div className="container manage-supervisor-header py-4">
                    <h4 className='header-title mt-4'>LIPWDMS Super Admin Portal</h4>
                    <div className="d-flex align-items-center  mt-5 ">
                        <h1>
                            Supervisors & Admins ({totalCount})
                        </h1>
                        <div className='d-flex filter-option-section align-items-center mx-4'>
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
                                <Icon icon="mingcute:file-export-fill" className='export-icon' />
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
                                {adminSupervisorList.map((supervisor, index) => (

                                    <TableRow key={supervisor.id}>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>
                                            <p className='d-flex flex-column admin-name'>
                                                {supervisor.name}
                                                <span>{supervisor.email}</span>
                                            </p>
                                        </TableCell>
                                        <TableCell>{supervisor.role}</TableCell>
                                        <TableCell>{supervisor.zone}</TableCell>
                                        <TableCell>{supervisor.phoneNumber}</TableCell>
                                        <TableCell>
                                            <div className="d-flex">
                                                <button className="btn manage-supervisor-btn" onClick={() => openModal('delete', supervisor.name, supervisor.role)}>
                                                    <Icon icon="carbon:delete" className='delete-icon' /> Delete
                                                </button>
                                                <button className="btn manage-supervisor-btn" onClick={() => openModal('verify', supervisor.name, supervisor.role)}>
                                                    <Icon icon="carbon:checkmark" className='verify-icon' /> Verify
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={adminSupervisorList.length}
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

                <ManageSupervisorModal closeModal={closeModal} buttonClick={buttonClick} supervisorName={supervisorName} getRole={getRole} />
            </Modal>

            {modalClosed && (
                <div className="d-flex justify-content-center">
                    <div className=' d-flex align-items-center snackbar'>
                    You have successfully {buttonClick} {supervisorName} as a {getRole}
                    <button className=" btn snackbar-btn" onClick={closeSnackbar}>Undo</button>
                </div>
                </div>
                
            )}
        </>




    )
}