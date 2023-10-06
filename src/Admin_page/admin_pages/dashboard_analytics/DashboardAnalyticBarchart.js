import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = ({ data, type, setCloseTypo, sector, typology }) => {
  const [selectedLGA, setSelectedLGA] = useState(null);
  const employees = data

  // Create an object to group employees by LGA name
  const employeeData = {};

  // Iterate through the employees and group them by LGA name
  if (type === "all") {
    employees?.forEach((employee) => {
      const lgaName = employee.lga.name;

      if (!employeeData[lgaName]) {
        employeeData[lgaName] = { male: [], female: [] };
      }

      const sex = employee.sex;
      if (sex === "MALE") {
        employeeData[lgaName].male.push(employee);
      } else if (sex === "FEMALE") {
        employeeData[lgaName].female.push(employee);
      }
    });
  } else {
    employees?.forEach((employee) => {
      const wardName = employee.ward.name;

      if (!employeeData[wardName]) {
        employeeData[wardName] = { male: [], female: [] };
      }

      const sex = employee.sex;
      if (sex === "MALE") {
        employeeData[wardName].male.push(employee);
      } else if (sex === "FEMALE") {
        employeeData[wardName].female.push(employee);
      }
    });
  }

  const graphKey = Object.keys(employeeData);

  const graphWithEmployees = Object.keys(employeeData).map((item) => ({
    graphKey: graphKey,
    males: employeeData[item].male.length, // Count of male employees
    females: employeeData[item].female.length, // Count of female employees
  }));

  const isStacked = true;
  const colors = ['#007BFF', '#FF3366'];


  const LGAChart = (
    <ReactApexChart
      options={{
        xaxis: {
          categories: graphKey,
          title: {
            text: type === "all" ? 'Local Governments' :
            //  sector ?(sector && typology) ? `${typology} Typology \n Beneficiaries in ${employees[0]?.lga?.name} ` :
            //     `${sector} Sector Beneficiaries in ${employees[0]?.lga?.name} ` :
              `Wards in ${employees[0]?.lga?.name} `,
          },
        },
        yaxis: {
          title: {
            text: 'Number of Employees',
          },
          min: 0,
          max: type === "all" ? 500 : 300,
          tickAmount: 10,
        },
        grid: {
          show: false,
        },
        chart: {
          type: 'bar',
          height: 600,
          stacked: isStacked,
          toolbar: {
            show: false,
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            horizontal: false,
            barWidth: '10px',
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '16px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontWeight: 500,
          },
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              xaxis: {
                labels: {
                  rotate: -45,
                },
              },
            },
          },
        ],
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
      }}
      series={[
        {
          name: 'Males',
          data: graphWithEmployees.map((item) => item.males),
        },
        {
          name: 'Females',
          data: graphWithEmployees.map((item) => item.females),
        },
      ]}
      type="bar"
      height={400}
    />
  );

  // const WardChart = (
  //   <ReactApexChart
  //     options={{
  //       xaxis: {
  //         categories: getWardData(selectedLGA).map((ward) => ward.name),
  //         title: {
  //           text: `Wards in ${selectedLGA}`,
  //         },
  //       },
  //       yaxis: {
  //         title: {
  //           text: 'Number of Employees',
  //         },
  //         min: 0,
  //         max: 1000,
  //         tickAmount: 10,
  //       },
  //       grid: {
  //         show: false,
  //       },
  //       chart: {
  //         type: 'bar',
  //         height: 600,
  //         toolbar: {
  //           show: false,
  //         },
  //       },
  //       colors: [wardColor],
  //       plotOptions: {
  //         bar: {
  //           horizontal: false,
  //           barWidth: '10px',
  //           dataLabels: {
  //             total: {
  //               enabled: true,
  //               style: {
  //                 fontSize: '16px',
  //                 fontWeight: 900,
  //               },
  //             },
  //           },
  //         },
  //       },
  //       dataLabels: {
  //         enabled: true,
  //         style: {
  //           fontSize: '14px',
  //           fontWeight: 500,
  //         },
  //       },
  //       legend: {
  //         show: false,
  //       },
  //       responsive: [
  //         {
  //           breakpoint: 768,
  //           options: {
  //             xaxis: {
  //               labels: {
  //                 rotate: -45,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //       states: {
  //         hover: {
  //           filter: {
  //             type: 'none',
  //           },
  //         },
  //       },
  //     }}
  //     series={[
  //       {
  //         name: 'Wards Data',
  //         data: getWardData(selectedLGA).map((ward) => ward.data),
  //       },
  //     ]}
  //     type="bar"
  //     height={400}
  //   />
  // );

  return (
    <div className="stacked-bar-chart" onClick={() => setCloseTypo(true)}>
      {/* <div onClick={(e) => handleLGAClick(e, 'Fufore')}>Fufore</div>
      <div onClick={(e) => handleLGAClick(e, 'Guyuk')}>Guyuk</div> */}
      {LGAChart}
      {/* {selectedLGA && WardChart} */}
    </div>
  );
};

export default ChartComponent;
