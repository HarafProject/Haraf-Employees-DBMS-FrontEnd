import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import admin from "../../../../class/admin.class";
import { toast } from "react-toastify";
import supervisor from "../../../../class/supervisor.class";
import { RotatingLines } from "react-loader-spinner";

export default function AttendanceGraphChart() {
    const [type, setType] = useState("daily")
    const [dateValues, setDateValues] = useState([])
    const [weekValues, setWeekValues] = useState([])
    const [mthValues, setMthValues] = useState([])
    const [value, setValue] = useState(null)
    const [typologyData, setTypologyData] = useState([])
    const [typologyValue, setTypologyValue] = useState(null)
    const [lgas, setLgas] = useState([])
    const [attendanceValues, setAttendanceValues] = useState([])


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
    const fetchAnalyticsData = async (key, type, value) => {
        if (!type || !value) return
     
        try {

            const [analytics, typologyData] = await Promise.all([
                admin.getAnalyticsData(type, value),
                supervisor.getWorkTypology()
            ]);

            return {
                analytics,
                typologyData
            }

        } catch (error) {
            toast.error(error?.error);
        }
    };
    // React query fecth data
    const { data, status } = useQuery(['fetchAnalyticsData', type, value], fetchAnalyticsData)

    useEffect(() => {
        if (!data) return
        // Group data by unique LGA names and count status occurrences
        groupData(data.analytics.data)
        setTypologyData(data.typologyData.workTypology)
    }, [data])

    function groupData(data) {
        const groupedData = data?.reduce((acc, item) => {
            const lgaName = item.lga.name;
            const status = item.status;

            if (!acc[lgaName]) {
                acc[lgaName] = { Present: 0, Absent: 0 };
            }

            acc[lgaName][status]++;

            return acc;
        }, {});

        setLgas(Object.keys(groupedData))
        setAttendanceValues(Object.values(groupedData))
    }

    async function fetchDates(params) {
        const data = await admin.getAttendanceDates()
        setDateValues(data.dates)

    }
    async function fetchWeeks(params) {
        const data = await admin.getAttendanceWeeks()
        setWeekValues(data.weeks)

    }
    async function fetchMonths(params) {
        setMthValues(months)
    }

    function handleTypology(e) {

        if (!e.target.value) {
            setTypologyValue("")
        } else {
            setTypologyValue(e.target.value)
            groupData(data.analytics.data.filter(item => item.workTypology === e.target.value))
        }


    }
    useEffect(() => {
        if (type === "daily") {
            fetchDates()
        } else if (type === "weekly") {
            fetchWeeks()
        } else if (type === "monthly") {
            fetchMonths()
        }
    }, [type])


    const options = {
        dataLabels: {
            enabled: false,
        },
        colors: ["#ca0202", "#0280ca"],
        stroke: {
            width: 0,
        },
        plotOptions: {
            bar: {
                columnWidth: "25%",
            },
        },
        xaxis: {
            categories: lgas,
            crosshairs: {
                show: false,
            },
            title: {
                text: "LGAs",
            },
        },
        yaxis: [
            {
                seriesName: "Absent",
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    formatter: function (value) {
                        return value.toFixed(0);
                    },
                },
                title: {
                    text: "Number of Beneficiaries",
                },
            },
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false,
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -15,
            markers: {
                radius: 12,
                width: 12,
                height: 12,
            },
            itemMargin: {
                vertical: 5,
                horizontal: 0,
            },
        },
        chart: {
            background: "#D9D9D94D",
            stacked: false,
            toolbar: {
                show: false,
            },
            animations: {
                enabled: false,
            },
        },
        grid: {
            show: false,
        },
    };

    const series = [
        {
            name: "Absent",
            data: attendanceValues.map(item => item.Absent),
        },
        {
            name: "Present",
            data: attendanceValues.map(item => item.Present),
        },
    ];

    return (
        <>
            <div className="mt-4">
                <div className="graph-filter-section ">

                    {/* {status === "loading" && <div className='d-flex align-items-center px-5 py-3'><RotatingLines width="30" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc" }}>Loading please wait...</p></div>} */}


                    {status === "loading" ? (<div className='d-flex align-items-center'><RotatingLines width="25" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc", marginBottom:"0" }}>Loading please wait...</p></div>)
                        : (
                            <div className="d-flex  filter-option-section align-items-center ">

                                <div className="form-field mx-1">
                                    <select name="type" id="" onChange={(e) => {
                                        setTypologyValue("")
                                        setType(e.target.value)
                                    }}>
                                        <option value="">Interval</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div className="form-field mx-1">
                                    <select name="ward" id="" onChange={(e) => {
                                        setTypologyValue("")
                                        setValue(e.target.value)
                                    }}>
                                        <option value="">Value</option>

                                        {
                                            type === "daily" && <>
                                                {
                                                    dateValues.map((item, i) => <option key={i} value={item}>{new Date(item).toDateString()}</option>)
                                                }
                                            </>
                                        }

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

                                <div className="form-field mx-1">
                                    <select name="worktypology" onChange={handleTypology} value={typologyValue}>
                                        <option value={""}>Work Sector</option>
                                        {
                                            typologyData?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        )
                    }


                </div>

                <div className="attendance-chart-section">
                    <div className="chart-section mt-5">
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="300%"
                        />
                    </div>
                </div>
            </div>
        </>

    )
}