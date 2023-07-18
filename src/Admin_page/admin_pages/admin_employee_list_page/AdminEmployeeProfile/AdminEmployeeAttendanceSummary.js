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
    <div>
      <h2>Attendance Summary</h2>
      <div className="attendance-grid">
        <div className="attendance-flex ">
          <div>
            <h1>{data?.data?.total}</h1>
            <p>Total Work days</p>
          </div>
          <div>
            <h1 className="green">{data?.data?.present}</h1>
            <p>Total days present</p>
          </div>
        </div>

        <div className="border-center"></div>
        <div className="border-cross"></div>
        <div className="attendance-flex">
          <div>
            <h1 className="red">{data?.data?.absent}</h1>
            <p>Total days absent</p>
          </div>
          <div>
            <h1>{Math.floor((data?.data?.present/data?.data?.total)*100)}%</h1>
            <p>Attendance <br />Performance (%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
