import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";
import "./analytics.css";
import attendanceReportData from "../../../component/data/AttendanceReportData";

export default function AttendanceAnalytics() {
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
      categories: [
        "2009-01-01",
        "2010-01-01",
        "2011-01-01",
        "2012-01-01",
        "2013-01-01",
        "2014-01-01",
        "2015-01-01",
        "2016-01-01",
      ],
      crosshairs: {
        show: false,
      },
      title: {
        text: "Attendance Date",
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
          text: "Number of Employees",
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
      data: [521, 723, 833, 104, 4, 10, 60, 75],
    },
    {
      name: "Present",
      data: [1000, 1900, 2000, 1306, 1084, 1305, 1100, 1208],
    },
  ];

  const totalCount = attendanceReportData.length;
  const countAdamawaSouth = attendanceReportData.filter(
    (report) => report.zone === "Adamawa South"
  ).length;
  const countAdamawaNorth = attendanceReportData.filter(
    (report) => report.zone === "Adamawa North"
  ).length;
  const countAdamawaCentral = attendanceReportData.filter(
    (report) => report.zone === "Adamawa Central"
  ).length;

  return (
    <div className="attendance-analytic-page">
      <div>
        <h1 className="header-title">LIPWDMS Super Admin Portal</h1>
        <div className="d-flex justify-content-between beneficiary-statistics mt-4">
          <div className="box">
            <h2>{totalCount}</h2>
            Total Beneficiaries
          </div>
          <div className="box">
            <h2>{countAdamawaSouth}</h2>
            AD South Zone
          </div>
          <div className="box">
            <h2>{countAdamawaNorth}</h2>
            AD North Zone
          </div>
          <div className="box">
            <h2>{countAdamawaCentral}</h2>
            AD Central Zone
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-5 ">
          <h5>Attendance Overview</h5>
          <div className="d-flex filter-option-section align-items-center">
            <div className="form-field mx-1">
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
            </div>
            <div className="form-field mx-1">
              <select name="worktypology" id="">
                <option>Work Typology</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="wash">wash</option>
                <option value="agricuture">
                  Agriculture, livelihood {<br />} & Value chain
                </option>
                <option value="transport">Transport</option>
              </select>
            </div>
            <div className="form-field mx-1">
              <select name="daily" id="">
                <option>Interval</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
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
