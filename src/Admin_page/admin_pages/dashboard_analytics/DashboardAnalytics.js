
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../class/admin.class";
import { useQuery } from 'react-query';
import { toast } from "react-toastify";
import './dasboardanalytics.css';
import DonutPieChart from "./DashboardPieChart";
import dataOBJs from "../../../class/data.class";
import AdminEmployeeFilterComponent from "../admin_employee_list_page/AdminEmployeeFilterComponent";
import ChartComponent from "./DashboardAnalyticBarchart";
import DashboardFilter from "./DashboardFilter";

// const fetchEmployeesList = async (key) => {
//     try {
//       const res = await admin.getAllGetbeneficiaries();
//       return res;
//     } catch (error) {
//       toast.error(error?.error);
//     }
//   };

const fetchData = async (key) => {
    try {
        const [beneficiaryData, lgaData, wardData, beneficiaries] = await Promise.all([
            admin.getDataCount(),
            dataOBJs.getUniqueLgas(),
            dataOBJs.getUniqueWards(),
            admin.getAllGetbeneficiaries()
        ]);
        return {
            beneficiaryData,
            lgaData,
            wardData,
            beneficiaries
        };
    } catch (error) {
        toast.error(error?.error);
    }
};




export default function DashboardAnalytics() {
    const { data, status } = useQuery(['fetchDataSummary'], fetchData);
    const [beneficiaries, setBeneficiaries] = useState([])
    const [tempData, setTempData] = useState([])
    const [socu, setSocu] = useState(0)
    const [nonSocu, setNonSocu] = useState(0)
    const [male, setMale] = useState(0)
    const [female, setFemale] = useState(0)
    const [displayType, setDisplayType] = useState("all")
    const [sector, setSector] = useState("")
    const [typology, setTypo] = useState("")
    const [closeTypo, setCloseTypo] = useState(true)

    useEffect(() => {
        if (!data) return
        setBeneficiaries(data?.beneficiaries?.data)
        setTempData(data?.beneficiaries?.data)

    }, [data])

    useEffect(() => {
        if (status === "loading") {
            toast.info("Loading data... Please wait.")
        } else {
            toast.dismiss()
        }
    }, [status])


    useEffect(() => {

        setSocu(tempData.filter(item => item.socu)?.length)
        setNonSocu(tempData.filter(item => !item.socu)?.length)
        setMale(tempData.filter(item => item.sex === "MALE")?.length)
        setFemale(tempData.filter(item => item.sex === "FEMALE")?.length)
    }, [tempData])


    return (
        <div className="dashboard-analytic-section">

            <div>
                <div className="d-flex align-items-center justify-content-between summary-card">
                    <div className="card">
                        <h1 className="number">{data?.beneficiaryData?.data?.beneficiaryCount}</h1>
                        <p>Total Beneficiaries</p>
                    </div>
                    <div className="card">
                        <h1 className="number">{data?.lgaData}</h1>
                        <p>Total LGA's</p>
                    </div>
                    <div className="card">
                        <h1 className="number">{data?.wardData}</h1>
                        <p>Total Wards</p>
                    </div>
                </div>
            </div>

            <div className=" d-flex justify-content-around dashboard-analytic-graps mt-5 ">
                <div className="container-fluid p-3 mt-3">
                    <div className="d-flex align-items-center justify-content-between filter-dashboard-analytic">
                        <h1 className="">{data?.data?.beneficiaryCount}</h1>
                        <DashboardFilter
                            setSector={setSector}
                            setTypo={setTypo}
                            closeTypo={closeTypo}
                            setCloseTypo={setCloseTypo}
                            beneficiaries={beneficiaries}
                            setTempData={setTempData}
                            setDisplayType={setDisplayType}
                        />
                    </div>
                    <div className="dashboard-analytic-barchart mt-5" onClick={() => setCloseTypo(true)}>
                        <ChartComponent
                            setCloseTypo={setCloseTypo}
                            data={tempData}
                            type={displayType}
                            sector={sector}
                            typology={typology}
                        />
                    </div>
                </div>


                <div className=" dashboard-analytic-pie px-3" >

                    <div className="d-flex flex-column align-items-center donut-pie-chart-div">
                        <p>Gender Representation</p>
                        <DonutPieChart data={[
                            { label: 'Male', value: male },
                            { label: 'Female', value: female },
                        ]}
                            colors={['#007BFF', '#FF3366']} />
                    </div>

                    <div className="d-flex flex-column align-items-center donut-pie-chart-div">
                        <p>SOCU and Non-SOCU Representation</p>
                        <DonutPieChart
                            data={[
                                { label: 'SOCU', value: socu },
                                { label: 'Non-SOCU', value: nonSocu },
                            ]}
                            colors={['#F99C39', '#231d18']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}