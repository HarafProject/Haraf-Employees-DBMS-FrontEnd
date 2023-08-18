import React, { useState, useEffect } from "react";
import ReusableHeader from "../../component/reusable/reusableheader/ReusableHeader";
import './history.css'
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import supervisor from "../../class/supervisor.class";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import dataOBJs from "../../class/data.class";
import { useNavigate } from "react-router-dom";

const fetchAttendanceReports = async (key, lgaId) => {
    if (!lgaId) return
    try {
        const [wardData, attendanceData] = await Promise.all([
            dataOBJs.getWardsByLga(lgaId),
            supervisor.getAttendanceReport()
        ]);

        return {
            wardData,
            attendanceData
        }
    } catch (error) {
        toast.error(error?.error);
    }
};

export default function ReportHistory() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state?.user)
    // React query fecth data
    const { data, status } = useQuery(['fetchAttendanceReports', user?.lga], fetchAttendanceReports)
    const [wardData, setWards] = useState([])
    const [reports, setReports] = useState([])
    const { wards, attendance } = useSelector((state) => state?.attendance)
    const [lga, setLga] = useState("") //This is for offline view
    const [offlineWard, setOfflineWard] = useState([])

    useEffect(() => {
        if (!data) return
        const uniqueWards = data.wardData.filter((obj) => wards.includes(obj._id));
        setWards(uniqueWards)
        setReports(data.attendanceData.data)
    }, [data])

    useEffect(() => {

        if (!attendance.date) return
        // Create a Set to store unique lga names
        const uniqueLgaNamesSet = new Set();

        // Map through the array and add lga names to the Set
        attendance?.data?.forEach((obj) => {
            uniqueLgaNamesSet.add(obj.ward.name);
        });

        // Convert the Set back to an array to get the unique lga names
        const uniqueLgaNamesArray = Array.from(uniqueLgaNamesSet);
        setLga(attendance.data[0].lga.name)
        console.log(uniqueLgaNamesArray)
        console.log(wardData.length)
        console.log(wards.length)
        setOfflineWard(uniqueLgaNamesArray)

    }, [attendance])


    return (
        <div className="report-history-page">
            <ReusableHeader />
            <div className="report-history-section my-5 p-5">
                <h1>Report History</h1>

                {status === "loading" && <div className='d-flex align-items-center px-5 py-3'><RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc" }}>Loading please wait...</p></div>}
                <div className="history-list mt-3">

                    {
                        (wardData?.length === 0 && wards.length === 0) &&
                        <div className='d-flex align-items-center justify-content-between'>
                            <p>{offlineWard?.map((ward, i) => <><span key={i}>{ward},</span> {lga}</>)}_{new Date().toDateString()} (
                                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                )
                                <span> {user?.firstname} {user?.surname} {console.log(offlineWard)}</span>
                            </p>
                            <button className={`btn history-btn pending`} onClick={() => navigate("/supervisor/attendance")}>Pending</button>
                        </div>
                    }
                    {(wardData?.length > 0 && wards.length !== 0) &&
                        <div className='d-flex align-items-center justify-content-between'>
                            <p>{wardData?.map(ward => <><span key={ward._id}>{ward.name},</span> {ward.lga.name}</>)}_{new Date().toDateString()} (
                                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                )
                                <span> {user?.firstname} {user?.surname}</span>
                            </p>
                            <button className={`btn history-btn pending`} onClick={() => navigate("/supervisor/attendance")}>Pending</button>
                        </div>
                    }

                    <hr />
                    {reports?.map((item, index) => {
                        const uniqueWards = Array.from(
                            new Map(item?.attendanceRecord?.map(obj => [obj.ward._id, obj.ward]))
                                .values()
                        );
                        let wards = uniqueWards

                        return (
                            < >
                                <div key={index} className='d-flex align-items-center justify-content-between'>
                                    <p>
                                        {wards?.map(ward => <span key={ward._id}>{ward.name}</span>)}, {item.lga.name}_{new Date(item.date).toDateString()} (
                                        {new Date(item?.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                        )
                                        <span> {item?.submittedBy?.firstname} {item?.submittedBy?.surname}</span>
                                    </p>
                                    <button className={`btn history-btn sent`}>Submitted</button>
                                </div>
                                <hr />
                            </>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}