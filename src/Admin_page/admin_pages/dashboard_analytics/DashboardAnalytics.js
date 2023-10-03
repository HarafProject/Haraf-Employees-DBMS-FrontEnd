
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../class/admin.class";
import { useQuery } from 'react-query';
import { toast } from "react-toastify";
import StackedBarChart from "./DashboardAnalyticBarchart";
import './dasboardanalytics.css';
import DonutPieChart from "./DashboardPieChart";
import dataOBJs from "../../../class/data.class";
import AdminEmployeeFilterComponent from "../admin_employee_list_page/AdminEmployeeFilterComponent";



const fetchDataSummary = async (key) => {

    try {

        const res = await admin.getDataCount();


        return res

    } catch (error) {

        toast.error(error?.error);
    }
};


const fetchWardsData = async (key) => {
    try {
        const [wardData] = await Promise.all([

            dataOBJs.getWards(),
        ]);
        return {
            wardData,
        };
    } catch (error) {
        toast.error(error?.error);
    }
};




export default function DashboardAnalytics({ selectedTypology }) {

    const { data, status } = useQuery(['fetchDataSummary'], fetchDataSummary);
    const { data: wardsData, status: wardStatus } = useQuery(['fetchWardsData'], fetchWardsData);




    const localGovernmentData = [

        {
            name: 'Fufore',
            males: 500,
            females: 250,
        },
        {
            name: 'Guyuk',
            males: 400,
            females: 600,
        },

    ];

    const maleCount = 250;
    const femaleCount = 350;
    const socuCount = 150;
    const nonsocuCount = 50;



    return (
        <div className="dashboard-analytic-section">

            <div>
                <div className="d-flex align-items-center justify-content-between summary-card">

                    <div className="card">
                        <h1 className="number">{data?.data?.beneficiaryCount}</h1>
                        <p>Total Beneficiaries</p>
                    </div>
                    <div className="card">
                        <h1 className="number">{data?.data?.lgaCount}</h1>
                        <p>Total LGA's</p>
                    </div>

                    <div className="card">
                        <h1 className="number">2</h1>
                        <p>Total Wards</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-analytic-graps mt-5">
                <div className="container-fluid p-3">
                    <div className="d-flex align-items-center justify-content-between filter-dashboard-analytic">
                        <h1 className="">{data?.data?.beneficiaryCount}</h1>
                        <AdminEmployeeFilterComponent showLastSelect={false}  />
                    </div>
                    <div className="dashboard-analytic-barchart mt-5">


                        <StackedBarChart data={localGovernmentData} />


                    </div>
                </div>


                <div className="d-flex align-items-center justify-content-around dashboard-analytic-pie mt-4 p-3" >

                    <div className="d-flex flex-column align-items-center donut-pie-chart-div">
                        <p>Gender Representation</p>
                        {/* <DonutPieChart maleCount={maleCount} femaleCount={femaleCount} /> */}

                        <DonutPieChart data={[
                            { label: 'Male', value: maleCount },
                            { label: 'Female', value: femaleCount },
                        ]}
                            colors={['#007BFF', '#FF3366']} />
                    </div>

                    <div className="d-flex flex-column align-items-center donut-pie-chart-div">
                        <p>SOCU and Non-SOCU Representation</p>
                        <DonutPieChart
                            data={[
                                { label: 'SOCU', value: socuCount },
                                { label: 'Non-SOCU', value: nonsocuCount },
                            ]}
                            colors={['#F99C39', '#231d18']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}