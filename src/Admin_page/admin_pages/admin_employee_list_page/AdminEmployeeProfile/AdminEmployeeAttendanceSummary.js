import "./adminEmployeeAttendanceSummary.css";
import { useQuery } from 'react-query'
import { useEffect } from "react";
import admin from "../../../../class/admin.class";
import { toast } from "react-toastify"

const fetchBeneficiaryAttenedanceSummary = async (key, beneficiary) => {

  try {

    const res = await admin.getEmployeeSummary(beneficiary)
    return res
  } catch (error) {

    toast.error(error?.error);

  };
}

export default function AdminEmployeeAttendanceSummary({ beneficiary }) {
  // React query fecth data
  const { data, status } = useQuery(['fetchBeneficiaryAttenedanceSummary', beneficiary], fetchBeneficiaryAttenedanceSummary)


  return (
    <div className="admin-attendance-summary">
      <h2>Attendance Summary</h2>
      <div className="attendance-grid">
        <div className="attendance-flex ">
          <div>
            <h5>{data?.data?.total}</h5>
            <p>Total Work days</p>
          </div>
          <div>
            <h5 className="green">{data?.data?.present}</h5>
            <p>Total days present</p>
          </div>
        </div>

        <div className="border-center"></div>
        <div className="border-cross"></div>
        <div className="attendance-flex">
          <div>
            <h5 className="red">{data?.data?.absent}</h5>
            <p>Total days absent</p>
          </div>
          <div className="">
            <h5>{Math.floor((data?.data?.present/data?.data?.total)*100)}%</h5>
            <p>Attendance <br /> Performance (%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
