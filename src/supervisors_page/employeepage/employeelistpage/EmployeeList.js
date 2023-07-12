import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Avatar, TablePagination } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import { updateEmployees } from '../../../redux/reducers/employeeReducer';
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader';
import EmployeeTableFilterOption from '../../../component/reusable/tablefilteroptions/EmployeesFilterOptions';
import SendRequestModal from '../../../component/reusable/modalscontent/SendRequestModal';
import EmptyEmployeeList from './EmptyEmployeeListScreen';
import { useDispatch, useSelector } from "react-redux";
import supervisor from "../../../class/supervisor.class";

import { toast } from "react-toastify";


const fetchEmployees = async (key) => {
    try {

        const res = await supervisor.getAllEmployee()
        return res

    } catch (error) {
        toast.error(error?.error);
    }
};
export default function EmployeeListTable() {
    const location = useLocation()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state?.user)

    const display = location.state


    // React query fecth data
    const { data, status } = useQuery(['fetchEmployees'], fetchEmployees)

    useEffect(() => {
        if (!data) return
        
        if (data.employees.length === 0 && !display) return navigate("/supervisor/employee-list-empty", { replace: true })
        setUsersData(data.employees)
        localStorage.removeItem("HARAF-AUTH");
        dispatch(updateEmployees(data.employees))
    }, [data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const openModal = (getModalType) => { // Modify openModal function
        setIsOpen(true);
        setModalType(getModalType()); // Invoke the function to get modalType
    };

    function closeModal() {
        setIsOpen(false);
    }

    async function supervisorRequest(reason) {
        if (!reason) return toast.error("Please enter a reason for your request.")

        try {
            setIsLoading(true)
            const { message } = await supervisor.newEmployeeRequest({ reason })
            console.log(message)
            toast.success(message)


        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error.error)
        } finally {
            setIsLoading(false)
            closeModal()
        }
    }
    // const usersPerPage = usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <>
            <ReusableHeader />
            {/* {usersData.length > 0 ? ( */}
            <div className="employees-table-section py-5 my-4">
                <EmployeeTableFilterOption
                    allData={data?.employees}
                    usersData={usersData}
                    setUsersData={setUsersData}
                />
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
                                    {usersData?.map((user, index) => (

                                        <TableRow onClick={() => navigate(`/employee-profile`, { state: user })} style={{ cursor: "pointer" }}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Avatar alt={user.fullName} src={user?.photo} />
                                            </TableCell>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.workTypology?.name}</TableCell>
                                            <TableCell>{user.ward?.name}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.age}</TableCell>
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

                        <button className="floating-button" onClick={() => user.operation === "super" ? navigate("/supervisor/add-employee") : openModal(() => 'add')}>
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

                        <SendRequestModal
                            closeModal={closeModal}
                            actionType={modalType}
                            action={supervisorRequest}
                            isLoading={isLoading}
                        />

                    </Modal>
                </div>


            </div>
            {/* ):
            (<EmptyEmployeeList />)} */}
        </>




    )
}