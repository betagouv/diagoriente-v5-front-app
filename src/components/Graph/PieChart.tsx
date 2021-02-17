import React from 'react';
import Chart from 'react-apexcharts';

/* interface Props {
  color: string[];
  data: number;
} */
const options = {
  options: {
    colors: ['#FFD382', '#e8296b', '#3f8dff', '#ffdb1f'],
  },
  series: [44, 55, 41, 17],
  labels: ['A', 'B', 'C', 'D'],
};

const PieChart = () => {
  return (
    /*    <svg height="80" width="80" viewBox="0 0 20 20">
      <circle r="10" cx="10" cy="10" fill={color[1]} />
      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke={color[0]}
        strokeWidth="10"
        strokeDasharray={`calc(${data} * 31.4 / 100) 31.4`}
        transform="rotate(-90) translate(-20)"
      />
    </svg> */
    <Chart options={options.options} series={options.series} type="pie" width="380" />
  );
};

export default PieChart;
