import React, { forwardRef, Ref } from 'react';
import Icon from 'assets/form/checkbox1.svg';
import classNames from 'utils/classNames';
import useStyles from './styles';

interface Props {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  color?: string;
  border?: string;
  img?: string;
}
const CheckBox = forwardRef(
  ({
 checked, onChange, name, color, border, img, className,
}: Props, ref: Ref<HTMLInputElement>) => {
    const classes = useStyles({ color, checked, border });

    return (
      <label className={classNames(classes.container, className)}>
        <input type="checkbox" checked={checked} onChange={onChange} name={name} ref={ref} />
        <div className={classes.checkmark} />
        {checked && <img src={img || Icon} alt="checked" className={classes.icon} />}
      </label>
    );
  },
);
export default CheckBox;
