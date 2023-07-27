import React, { useState, useEffect } from "react";
import "./adminEmployeeAttendanceSummary.css";
import { useQuery } from 'react-query'
import admin from "../../../../class/admin.class";
import { toast } from "react-toastify"
import { RotatingLines } from "react-loader-spinner";

const fetchBeneficiaryAttenedanceSummary = async (key, beneficiary, type, value) => {


  try {

    const res = await admin.getEmployeeSummary(beneficiary, type, value)
    return res
  } catch (error) {

    toast.error(error?.error);

  };
}

export default function AdminEmployeeAttendanceSummary({ beneficiary }) {
  const [type, setType] = useState("")
  const [weekValues, setWeekValues] = useState([])
  const [mthValues, setMthValues] = useState([])
  const [value, setValue] = useState("")
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  // React query fecth data
  const { data, status } = useQuery(['fetchBeneficiaryAttenedanceSummary', beneficiary, type, value], fetchBeneficiaryAttenedanceSummary)

  async function fetchWeeks(params) {
    const dataAnalytic = await admin.getAttendanceWeeks()
    setWeekValues(dataAnalytic.weeks.sort((a, b) => a - b))

  }
  async function fetchMonths(params) {
    setMthValues(months)
  }

  useEffect(() => {
    if (type === "weekly") {
      fetchWeeks()
    } else if (type === "monthly") {
      fetchMonths()
    }
  }, [type])

  return (
    <div className="admin-attendance-summary">
      <h2>Attendance Summary</h2>
      <div className="graph-filter-section d-flex justify-content-between">
        {status === "loading" ? (
          <div className='d-flex align-items-center py-2'>
            <RotatingLines width="25" strokeColor="#0173bc" strokeWidth="3" />
            <p style={{ color: "#0173bc", marginBottom: "0" }}>Loading please wait...</p></div>
        )
          : (
            <div className="d-flex filter-option-section align-items-center ">

              <div className="form-field mx-1">
                <select name="type" value={type} onChange={(e) => {
                  setValue("")
                  setType(e.target.value)
                }}>
                  <option value="">Interval</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="form-field mx-1">
                <select name="ward" id="" value={value} onChange={(e) => {
                  setValue(e.target.value)
                }}>
                  <option value="">Value</option>

                  {
                    type === "weekly" && <>
                      {
                        weekValues.map((item, i) => <option key={i} value={item}>
                          week {item}
                        </option>)
                      }
                    </>
                  }

                  {
                    type === "monthly" && <>
                      {mthValues.map((item, i) =>
                        <option key={i} value={i + 1}>
                          {item}
                        </option>
                      )}
                    </>
                  }

                </select>
              </div>


            </div>
          )
        }

      </div>
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
            <h5>{Math.floor((data?.data?.present / data?.data?.total) * 100) || 0}%</h5>
            <p>Attendance <br /> Performance (%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
