import {useEffect } from "react"
import "./adminEmployeeDataSummary.css";
import { useQuery } from 'react-query'
import admin from "../../../class/admin.class";
import {toast} from "react-toastify"

const fetchDataSummary = async (key) => {

  try {

    const res = await admin.getDataCount()
    return res

  } catch (error) {

    toast.error(error?.error);
  }
};

export default function AdminEmployeeDataSummary() {
  // React query fecth data
  const { data, status } = useQuery(['fetchDataSummary'], fetchDataSummary)

  return (
    // <div className="d-flex align-items-center justify-content-between summary-card">
    //   <div className="card ">
    //     <h1 className="number">{supervisors.length}</h1>
    //     <p>Total Employees</p>
    <div className="d-flex align-items-center justify-content-between summary-card">
      
      <div className="card">
        <h1 className="number">{data?.data?.beneficiaryCount}</h1>
        <p>Total Beneficiaries</p>
      </div>
      <div className="card">
        <h1 className="number">{data?.data?.lgaCount}</h1>
        <p>LGA's Onboarded</p>
      </div>
      <div className="card">
        <h1 className="number">{data?.data?.userCount}</h1>
        <p>LGA Supervisors</p>
      </div>
      <div className="card">
        <h1 className="number">{data?.data?.attendanceCount}</h1>
        <p>Reports Recieved</p>
      </div>
    </div>
  );
}
