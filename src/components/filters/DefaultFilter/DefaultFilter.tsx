import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import TextField from 'components/inputs/AdminTextField/AdminTextField';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Button from '@material-ui/core/Button/Button';
import Filter from '@material-ui/icons/FilterList';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Grid from '@material-ui/core/Grid/Grid';

import { decodeUri } from 'utils/url';

import { useInput } from 'hooks/useInputs';
import useStyles from './styles';

export interface DefaultFilterProps {
  onChange: (d: { [key: string]: string }) => void;
  children?: (
    onChange: (d: { [key: string]: string }) => void,
    uri: { [key: string]: string },
  ) => React.ReactChild | React.ReactChild[];
}

function DefaultFilter({ onChange, children }: DefaultFilterProps) {
  const location = useLocation();
  const uri = decodeUri(location.search);
  const classes = useStyles();
  const [search, onSearchChange] = useInput(uri.search || '');
  const [open, setOpen] = useState(false);
  const dataRef = useRef<Record<string, string>>({});

  return (
    <div className={classes.container}>
      <div onClick={() => setOpen(!open)} className={classes.filter}>
        <Filter color="primary" />
        <span className={classes.title}>Filtre</span>
        <Arrow color="primary" />
      </div>
      <Collapse in={open}>
        <div className={classes.dropDown}>
          <Grid container spacing={6} className={classes.inputsContainer}>
            <Grid item sm={4} md={3} lg={3}>
              <TextField
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.label }}
                value={search}
                onChange={onSearchChange}
                label="Search"
              />
            </Grid>
            {children
              && children((data) => {
                dataRef.current = data;
              }, uri)}
          </Grid>
          <Button
            onClick={() => onChange({ search, ...dataRef.current })}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Filtrer
          </Button>
        </div>
      </Collapse>
    </div>
  );
}

export default DefaultFilter;
