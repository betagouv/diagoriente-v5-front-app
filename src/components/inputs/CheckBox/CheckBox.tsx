import React from 'react';
import Icon from 'assets/form/checkbox1.svg';
import useStyles from './styles';

interface Props {
  label?: string;
  checked?: boolean;
  onChange: (e: any) => void;
  className?: string;
  name: string;
}
const CheckBox = ({ checked, onChange, name }: Props) => {
  const classes = useStyles();
  return (
    <label className={classes.container}>
      <input type="checkbox" checked={checked} onChange={onChange} name={name} />
      <span className={classes.checkmark} />
      {checked && <img src={Icon} alt="checked" className={classes.icon} />}
    </label>
  );
};
export default CheckBox;
