import React from 'react';

interface props {
  color: string;
  width: string;
  height: string;
}
const Check = ({ color, height, width }: props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.82785 10C5.77652 10 5.7252 9.9977 5.67354 9.99276C5.21362 9.95 4.79243 9.7181 4.51197 9.35331L0.339821 3.92589C-0.215141 3.20421 -0.0757382 2.17201 0.651076 1.62071C1.37756 1.06942 2.41662 1.2079 2.97158 1.92958L6.05533 5.94095L12.2377 0.421418C12.9178 -0.185795 13.9645 -0.130205 14.5758 0.545427C15.187 1.22106 15.1311 2.26082 14.4509 2.86804L6.93446 9.57831C6.6295 9.85099 6.2348 10 5.82785 10Z"
        fill={color}
      />
    </svg>
  );
};

export default Check;
