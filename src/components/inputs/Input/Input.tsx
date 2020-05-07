import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField/TextField';
import classNames from 'utils/classNames';
import LogoRose from 'assets/form/Vector.png';
import LogoCheked from 'assets/form/check.png';
import LogoLocation from 'assets/form/location.png';

import useStyles from './styles';

interface IProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string;
  errorText?: string;
  subTitle?: string;
  errorForm?: string;
}

const Input = ({
 label, errorText, subTitle, inputProps, name, value, errorForm, ...rest
}: IProps) => {
  const classes = useStyles({ error: !!(errorText || errorForm) });
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={5} md={4}>
          <div className={classes.labelContainer}>
            <div className={classes.label}>{label}</div>
            <div className={classes.subTitle}>{subTitle}</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <div>
            <div className={classes.wrapperInput}>
              <TextField
                className={classes.inputRoot}
                name={name}
                error={!!(errorText || errorForm)}
                InputProps={{
                  classes: { input: classNames(classes.inputRoot) },
                  startAdornment: (
                    <InputAdornment position="start">
                      {name === 'location' && <img src={LogoLocation} alt="location" />}
                    </InputAdornment>
                  ),
                }}
                {...rest}
                variant="outlined"
              />
              {(errorText || errorForm) && <img src={LogoRose} className={classes.logo} alt="check" />}
              {value && !errorText && !errorForm && <img src={LogoCheked} className={classes.logo} alt="check" />}
            </div>
            <div className={classes.errorCondition}>{errorForm}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Input;
