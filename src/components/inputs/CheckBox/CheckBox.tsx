import React, { forwardRef, Ref } from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props extends Omit<CheckboxProps, 'variant'> {
  label?: string;
}

const CheckBox = forwardRef(({ label, className, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
  const classes = useStyles();

  return (
    <Checkbox
      {...rest}
      inputRef={ref}
      color="primary"
      className={classNames(classes.root, className, classes['MuiCheckbox-colorSecondary'])}
    />
  );
});
export default CheckBox;
