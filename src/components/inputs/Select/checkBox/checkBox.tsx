import React, { forwardRef, Ref } from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import classNames from 'utils/classNames';
import useStyles from './style';

interface Props extends Omit<CheckboxProps, 'variant'> {
  label?: string;
}

const CheckBox = forwardRef(({ label, className, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
  const classes = useStyles();

  return <Checkbox {...rest} inputRef={ref} className={classNames(className, classes['MuiCheckbox-colorSecondary'])} />;
});
export default CheckBox;
