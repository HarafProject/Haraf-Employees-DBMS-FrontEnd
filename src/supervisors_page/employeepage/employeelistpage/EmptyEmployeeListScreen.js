
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import emptypage from '../../../assets/empty-page.png';
import './employeelist.css';
import { Navigate } from 'react-router-dom';

export default function EmptyEmployeeList() {
    const navigate = useNavigate();
    return (
        <div className="employee-list-screen ">
            <div>
                <ReusableHeader />
            </div>
            <div className="empty-list-screen ">

                <div className="d-flex flex-column align-items-center empty-list-content mt-2">

                    <img src={emptypage} alt=""  />
                    <p>No Employees Added</p>
                    <span>No employees have been to this system yet, use the new employee button below to add new employees to this system</span>
                    <button onClick={()=> {navigate("/supervisor/add-employee");}} className="btn add-employee mt-5">
                        <Icon icon="mdi:add-circle-outline" color="white" /> New Employee
                    </button>
                </div>
            </div>
        </div>
    )
}