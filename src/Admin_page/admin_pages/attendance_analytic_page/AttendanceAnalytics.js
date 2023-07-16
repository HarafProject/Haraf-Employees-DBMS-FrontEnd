import { useState, useEffect } from "react"
import Chart from "react-apexcharts";
import "./analytics.css";
import AdminEmployeeDataSummary from "../admin_employee_list_page/AdminEmployeeDataSummary";
import { useQuery } from "react-query";
import admin from "../../../class/admin.class";
import { toast } from "react-toastify"
import supervisor from "../../../class/supervisor.class";

export default function AttendanceAnalytics() {
  const [type, setType] = useState("daily")
  const [values, setValues] = useState([])
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
    console.log(data)
    // Group data by unique LGA names and count status occurrences
    groupData(data.analytics.data)
    setTypologyData(data.typologyData.workTypology)
  }, [data])

  function groupData(data) {
    const groupedData = data.reduce((acc, item) => {
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
    setValues(data.dates)

  }
  async function fetchWeeks(params) {
    const data = await admin.getAttendanceWeeks()
    setValues(data.weeks)

  }
  async function fetchMonths(params) {
    setValues(months)
  }

  function handleTypology(e) {
 
    if (!e.target.value) {
      setTypologyValue("")
    }else{
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
    colors: ["#444444", "#F99C39"],
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
    <div className="attendance-analytic-page">
      <div>

        <AdminEmployeeDataSummary />
        <div className="d-flex align-items-center justify-content-between mt-5 ">
          <h5>Attendance Overview</h5>
          <div className="d-flex filter-option-section align-items-center">
            {/* <div className="form-field mx-1">
              <select name="lga" id="">
                <option>LGAs</option>
                <option value="guyuk">Guyuk</option>
                <option value="numan">Numan</option>
                <option value="Ganye">Ganye</option>
                <option value="girei">Girei</option>
                <option value="michika">Michika</option>
              </select>
            </div>
            <div className="form-field mx-1">
              <select name="ward" id="">
                <option value="">Ward</option>
                <option value="banjiram">Banjiram</option>
                <option value="bobini">Bobini</option>
                <option value="bodeno">Bodeno</option>
                <option value="chikila">Chikila</option>
                <option value="dukul">Dukul</option>
                <option value="dumna">Dumna</option>
                <option value="guyuk">Guyuk</option>
                <option value="kola">Kola</option>
                <option value="lokoro">Lokoro</option>
                <option value="purokayo">Purokayo</option>
              </select>
            </div> */}
 
            <div className="form-field mx-1">
              <select name="type" id="" onChange={(e) => {
                setTypologyValue("")
                setType(e.target.value)
              }}>
                <option value={null}>Interval</option>
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
                {values.map((item, i) => {
                  if (type === "daily") {
                    return (
                      <option key={i} value={item}>
                        {new Date(item).toDateString()}
                      </option>
                    );
                  } else if (type === "weekly") {
                    return (
                      <option key={i} value={item}>
                        week {item}
                      </option>
                    );
                  } else {
                    return (
                      <option key={i} value={i + 1}>
                        {item}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className="form-field mx-1">
              <select name="worktypology" onChange={handleTypology} value={typologyValue}>
                <option value={""}>Work Typology</option>
                {
                  typologyData?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                }
              </select>
            </div>
          </div>
        </div>
      </div>
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
  );
}
