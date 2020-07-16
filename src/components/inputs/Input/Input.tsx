import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField/TextField';
import classNames from 'utils/classNames';
import LogoRose from 'assets/form/Vector.png';
import LogoCheked from 'assets/form/check.png';
import LogoLocation from 'assets/form/location.png';
import PasswordEye from 'assets/form/password.svg';

import useStyles from './styles';

interface IProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label?: string;
  errorText?: string;
  subTitle?: string;
  errorForm?: string;
  showPassword?: () => void;
  className?: string;
  inputClassName?: string;
  inputBaseClassName?: string;
  withOutIcons?: boolean;
  icon?: any;
}

const Input = ({
  label,
  errorText,
  subTitle,
  inputProps,
  name,
  showPassword,
  value,
  errorForm,
  required,
  className,
  withOutIcons,
  icon,
  inputClassName,
  inputBaseClassName,
  ...rest
}: IProps) => {
  const classes = useStyles({ error: !!(errorText || errorForm) });

  return (
    <div className={classNames(classes.root, className)}>
      <Grid container spacing={0}>
        {label && (
          <Grid item xs={12} sm={4} md={5} lg={5}>
            <div className={classes.labelContainer}>
              <div className={classes.label}>
                {label}
                {required ? <span className={classes.requiredInput}>*</span> : null}
              </div>
              <div className={classes.subTitle}>{subTitle}</div>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={8} md={7} lg={7}>
          <div className={classes.wrapperInput}>
            <TextField
              value={value}
              className={classes.inputRoot}
              name={name}
              error={!!(errorText || errorForm)}
              InputProps={{
                classes: {
                  inputAdornedStart: classes.adornedPositionStart,
                  adornedStart: classes.adornedStart,
                  input: classNames(classes.input, inputClassName),
                  root: classNames(classes.inputBase, inputBaseClassName),
                },
                startAdornment: (
                  <InputAdornment position="start">
                    {(name === 'location' || icon) && <img src={icon || LogoLocation} alt="location" />}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    {name === 'password' && (
                      <img src={PasswordEye} alt="view" onClick={showPassword} className={classes.showPasswordImage} />
                    )}
                  </InputAdornment>
                ),
              }}
              {...rest}
              variant="outlined"
            />
            {(errorText || errorForm) && <img src={LogoRose} className={classes.logo} alt="check" />}
            {value && !errorText && !errorForm && !withOutIcons && (
              <img src={LogoCheked} className={classes.logo} alt="check" />
            )}
          </div>
          {/* <div className={classes.errorCondition}>{errorForm}</div> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Input;
