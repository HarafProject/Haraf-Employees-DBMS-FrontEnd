import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
  const [selectedLGA, setSelectedLGA] = useState(null); 

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

  const localGovernmentWardsData = [
    {
      id: 1,
      title: 'Fufore',
      wards: [
        {
          name: 'Yadim',
          data: 400,
        },
        {
          name: 'Gushim',
          data: 200,
        },
        {
          name: 'yaji',
          data: 150,
        },
      ],
    },
    {
      id: 2,
      title: 'Guyuk',
      wards: [
        {
          name: 'banjiram',
          data: 400,
        },
        {
          name: 'chikila',
          data: 250,
        },
        {
          name: 'furo',
          data: 350,
        },
      ],
    },
  ];

  const isStacked = true; 
  const colors = ['#007BFF', '#FF3366']; 
  const wardColor = '#F99C39'; 

  const getLGAData = (name) => {
    return localGovernmentData.find((lga) => lga.name === name);
  };

  const getWardData = (name) => {
    const lga = localGovernmentWardsData.find((lga) => lga.title === name);
    if (lga) {
      return lga.wards;
    }
    return [];
  };

  const handleLGAClick = (event, name) => {
    event.preventDefault();
    setSelectedLGA(name);
  };

  const LGAChart = (
    <ReactApexChart
      options={{
        xaxis: {
          categories: localGovernmentData.map((lga) => lga.name),
          title: {
            text: 'Local Governments',
          },
        },
        yaxis: {
          title: {
            text: 'Number of Employees',
          },
          min: 0,
          max: 1000,
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
          data: localGovernmentData.map((lga) => lga.males),
        },
        {
          name: 'Females',
          data: localGovernmentData.map((lga) => lga.females),
        },
      ]}
      type="bar"
      height={400}
    />
  );

  const WardChart = (
    <ReactApexChart
      options={{
        xaxis: {
          categories: getWardData(selectedLGA).map((ward) => ward.name),
          title: {
            text: `Wards in ${selectedLGA}`,
          },
        },
        yaxis: {
          title: {
            text: 'Number of Employees',
          },
          min: 0,
          max: 1000,
          tickAmount: 10,
        },
        grid: {
          show: false,
        },
        chart: {
          type: 'bar',
          height: 600,
          toolbar: {
            show: false,
          },
        },
        colors: [wardColor],
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
          name: 'Wards Data',
          data: getWardData(selectedLGA).map((ward) => ward.data),
        },
      ]}
      type="bar"
      height={400}
    />
  );

  return (
    <div className="stacked-bar-chart" >
      <div onClick={(e) => handleLGAClick(e, 'Fufore')}>Fufore</div>
      <div onClick={(e) => handleLGAClick(e, 'Guyuk')}>Guyuk</div>
      {LGAChart}
      {selectedLGA && WardChart}
    </div>
  );
};

export default ChartComponent;
