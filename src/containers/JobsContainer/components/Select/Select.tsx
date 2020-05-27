import React from 'react';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Loupe from 'assets/svg/loupe.svg';
import Arrow from 'assets/svg/arrow';
import {
 createStyles, makeStyles, withStyles, Theme,
} from '@material-ui/core/styles';

import useStyles from './styles';

const SelectJobs = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
      },
    }))(InputBase);
  return (
    <div style={{ border: `1px solid red`, width: 228 }}>
      <Select
        value={age}
        onChange={handleChange}
        input={(
          <BootstrapInput
            startAdornment={(
              <InputAdornment position="start">
                <img src={Loupe} alt="location" />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="start">
                <Arrow width="20" height="20" color="red" />
              </InputAdornment>
            )}
          />
        )}
        inputProps={{ className: classes.selectRoot }}
        MenuProps={{ classes: { paper: classes.select } }}
        // IconComponent={() => <Arrow width="20" height="20" color="red" />}
      >
        <div>Ten</div>
        <div>Twenty</div>
        <div>Thirty</div>
      </Select>
    </div>
  );
};

export default SelectJobs;
