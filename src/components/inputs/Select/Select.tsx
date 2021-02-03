import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import arrow from 'assets/images/Arrow.png';
import useStyles from './styles';

const tabs = [
  {
    value: 'public',
    label: 'Votre public',
  },
];

const Select = () => {
  const classes = useStyles();
  return (
    <TextField
      select
      label=""
      value="public"
      variant="outlined"
      SelectProps={{
        classes: {
          root: classes.select,
        },
        IconComponent: () => <img src={arrow} alt="arrow" />,
        className: classes.selectContainer,
      }}
    >
      {tabs.map((option) => (
        <MenuItem key={option.value} value={option.value} className={classes.select}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default Select;
