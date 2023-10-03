import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutPieChart = ({ data, colors, label }) => {
    const options = {
        chart: {
            type: 'donut',
            toolbar: {
                show: false,
            },
        },
        // colors: ['#007BFF', '#FF3366'],
        // labels: [`${maleCount} Male`, `${femaleCount} Female`],

        colors: colors,
        labels: data.map((item, index) => `${item.value} ${item.label}`),
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '45%',
                    labels: {
                        show: false,
                    },
                    margin: 0,
                },
            },

        },
        stroke: {
            width: 0
          },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val, opts) {
                return Math.floor(val) + '%' ;
            },
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,         
            background: {
              enabled: true,
              foreColor: '#fff',
              padding: 10,
              borderRadius: 10,
              borderWidth: 0,
              borderColor: '#fff',
              opacity: 0.3,
          
           
            },
          
          
          },
        states: {
            hover: {
                filter: {
                    type: 'none', 
                },
            },
        },

    };

    //   const series = [maleCount, femaleCount];
    const series = data.map(item => item.value);


    return (
        <div className="donut-pie-chart">
            <ReactApexChart options={options} series={series} type="donut" width={300} height={300} />

        </div>
    );
};

export default DonutPieChart;
