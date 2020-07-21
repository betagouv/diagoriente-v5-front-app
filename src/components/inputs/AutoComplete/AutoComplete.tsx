import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LogoRose from 'assets/form/Vector.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import LogoCheked from 'assets/form/check.png';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface IProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: string | null) => void;
  value: string;
  name: string;
  placeholder: string;
  error?: boolean;
  errorText?: string;
  options: any[];
  icon?: string;
  className?: string;
  errorForm?: string;
  containerClassName?: string;
  freeSolo: boolean;
}

const AutoComplete = ({
  label,
  onChange,
  value,
  name,
  placeholder,
  error,
  errorText,
  options,
  icon,
  className,
  errorForm,
  containerClassName,
  onSelectText,
  freeSolo,
}: IProps) => {
  const classes = useStyles({ error: !!(errorText || errorForm) });

  return (
    <div className={classNames(classes.container, containerClassName)}>
      <Grid container spacing={0}>
        {label && (
          <Grid item xs={12} sm={4} md={5} lg={5}>
            <div className={classes.labelContainer}>
              <div className={classes.label}>
                {label}
                <span className={classes.requiredInput}>*</span>
              </div>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={8} md={7} lg={7}>
          <div style={{ width: 229 }}>
            <Autocomplete
              freeSolo={freeSolo}
              openOnFocus={false}
              disableClearable
              options={options.map((option) => option.label)}
              onChange={(event: any, v: string | null) => onSelectText(v)}
              fullWidth={false}
              className={className}
              autoComplete={false}
              value={value}
              classes={{ inputRoot: classes.inputRoot }}
              closeIcon={<div />}
              renderInput={(params) => (
                <div className={classes.wrapperInput}>
                  <TextField
                    {...params}
                    onChange={onChange}
                    className={classes.input}
                    name={name}
                    fullWidth={false}
                    placeholder={placeholder}
                    variant="outlined"
                    error={error}
                    InputProps={{
                      ...params.InputProps,
                      classes: { input: classes.inputPadding },
                      startAdornment: (
                        <InputAdornment position="start">
                          {name === 'location' && <img src={icon} alt="location" />}
                        </InputAdornment>
                      ),
                      type: 'search',
                      autoComplete: 'off',
                    }}
                  />
                  {(errorText || errorForm) && <img src={LogoRose} className={classes.logo} alt="check" />}
                  {value && !errorText && !errorForm && <img src={LogoCheked} className={classes.logo} alt="check" />}
                </div>
              )}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

AutoComplete.defaultProps = {
  freeSolo: false,
};

export default AutoComplete;
