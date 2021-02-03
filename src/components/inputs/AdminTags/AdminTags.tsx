import React, { useState, useEffect } from 'react';
import classNames from 'utils/classNames';

import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField/TextField';
import Label from '../Label/Label';

import useStyles from './styles';

interface AdminAutocompleteProps
  extends Omit<
    AutocompleteProps<string, true, true, false>,
    | 'freeSolo'
    | 'options'
    | 'onInputChange'
    | 'renderInput'
    | 'getOptionLabel'
    | 'getOptionSelected'
    | 'value'
    | 'onChange'
  > {
  label?: string;
  error?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

function AdminAutocomplete({
 label, error, className, value, onChange, ...rest
}: AdminAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setInputValue('');
  }, [value]);

  return (
    <div className={classNames(classes.fullWidth, className)}>
      <div className={classes.container}>
        {label && <Label>{label}</Label>}
        <Autocomplete
          className={classes.fullWidth}
          {...rest}
          getOptionLabel={(option) => option}
          value={value}
          onChange={(e, v) => onChange(v)}
          open={false}
          options={[]}
          ChipProps={{ className: classes.chip }}
          multiple
          disableClearable
          renderInput={(props) => (
            <TextField
              onKeyDown={(e) => {
                if (onChange) {
                  if (e.key === 'Enter' && inputValue) {
                    e.preventDefault();
                    onChange([...value, inputValue]);
                  }
                  if (e.key === 'Backspace' && value.length && !inputValue) {
                    e.preventDefault();
                    onChange(value.filter((r, index) => index !== value.length - 1));
                  }
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}
              variant="outlined"
              error={!!error}
              {...props}
            />
          )}
          classes={{ paper: classes.paper }}
        />
        {error && <span className={classes.error}>{error}</span>}
      </div>
    </div>
  );
}

AdminAutocomplete.defaultProps = {
  handleOptions: (d: any[]) => d,
  variables: {},
};

export default AdminAutocomplete;
