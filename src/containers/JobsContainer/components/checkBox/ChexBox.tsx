import React from 'react';
import useStyles from './styles';

interface IProps {
  label: string;
  checked?: boolean;
  logo?: string;
  onClick: () => void;
  value?: string;
}

const CheckBox = ({ label, onClick, value, logo }: IProps) => {
  const checked = value === label;
  const classes = useStyles({ checked });
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.circleContainer}>{checked && <div className={classes.circleSmall} />}</div>
      {logo && <img src={logo} alt="logo" className={classes.logo} />}
      <div className={classes.label}>{label}</div>
    </div>
  );
};

export default CheckBox;
