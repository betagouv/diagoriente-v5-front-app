import React from 'react';
import useStyles from './styles';

interface IProps {
  label: string;
  checked?: boolean;
  onClick: () => void;
  value?: string;
}

const CheckBox = ({ label, onClick, value }: IProps) => {
  const checked = value === label;
  const classes = useStyles({ checked });
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.circleContainer}>{checked && <div className={classes.circleSmall} />}</div>
      <div className={classes.label}>{label}</div>
    </div>
  );
};

export default CheckBox;
