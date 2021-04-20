import React from 'react';
import Chart from 'react-apexcharts';

const options = {
  options: {
    colors: ['#FFD382', '#e8296b', '#3f8dff', '#ffdb1f'],
  },
  series: [44, 55, 41, 17],
  labels: ['A', 'B', 'C', 'D'],
};

const PieChart = () => {
  return <div />;
  /* <Chart options={options.options} series={options.series} type="pie" width="380" /> */
};

export default PieChart;
