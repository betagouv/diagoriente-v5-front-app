import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  color: string;
  width: string;
  height: string;
  className?: string;
}
const arrow = ({
 color, height, width, className, ...other
}: Props) => (
  <div className={className}>
    <svg width={width} height={height} viewBox="0 0 12 19" fill="none" {...other}>
      <path
        // eslint-disable-next-line max-len
        d="M1.6509 19.0002C1.22854 19.0002 0.805812 18.8524 0.483596 18.5562C-0.161199 17.9643 -0.161199 17.0047 0.483596 16.4128L8.0143 9.49992L0.483596 2.58734C-0.161199 1.99545 -0.161199 1.03582 0.483596 0.443923C1.12839 -0.147974 2.17378 -0.147974 2.81857 0.443923L11.5166 8.42837C12.1614 9.02027 12.1614 9.9799 11.5166 10.5718L2.81821 18.5562C2.49599 18.8524 2.07327 19.0002 1.6509 19.0002Z"
        fill={color}
      />
    </svg>
  </div>
);

export default arrow;
