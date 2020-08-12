import React from 'react';

import classNames from 'utils/classNames';

import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField/TextField';
import Label from '../Label/Label';

import useStyles from './styles';

interface AdminTextFieldProps extends Omit<OutlinedTextFieldProps, 'error' | 'label' | 'variant'> {
  error?: string;
  label?: string;
}

const AdminTextField = ({
 error, className, label, ...rest
}: AdminTextFieldProps) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.fullWidth, className)}>
      <div className={classes.container}>
        {label && <Label>{label}</Label>}
        <TextField className={classes.fullWidth} variant="outlined" error={!!error} {...rest} />
        {error && <div className={classes.error}>{error}</div>}
      </div>
    </div>
  );
};

export default AdminTextField;
