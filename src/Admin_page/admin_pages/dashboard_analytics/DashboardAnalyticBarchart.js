import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StackedBarChart = ({ data, width, onBarClick }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 600,
            stacked: true,
            toolbar: {
                show: false,
            },
            
        },
        xaxis: {
            categories: data.map((item) => item.name), // Local Government names
            title: {
                text: 'LGA\'s',
            },
        },
        yaxis: {
            title: {
                text: 'Number of Employees',
            },
            min: 0,
            max: 1000,
            tickAmount: 10
        },
        grid: {
            show: false, // Remove horizontal lines
        },
        colors: ['#007BFF', '#FF3366'], // Blue for males, Redish-pink for females
        plotOptions: {
            bar: {
                horizontal: false,
                barWidth: '10px',
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '16px',
                            fontWeight: 900
                        }
                    }
                }

            },

        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontWeight: 500
            }
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
                type: 'none', // Disable hover effect (solid colors)
              },
            },
          },
    };



    
    const series = [
        {
            name: 'Males',
            data: data.map((item) => item.males),
        },
        {
            name: 'Females',
            data: data.map((item) => item.females),
        },
    ];

    return (
        <div className="stacked-bar-chart" style={{ width: width }}>
            <ReactApexChart options={options} series={series} type="bar"height={400} />
        </div>
    );
};

export default StackedBarChart;
