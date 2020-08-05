import React, { useState, useEffect } from 'react';

import { THEME_TYPES_OPTIONS } from 'utils/generic';

import Grid from '@material-ui/core/Grid/Grid';

import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';

import useStyles from './styles';

interface ThemeFilterProps {
  onChange: (data: { type: string }) => void;
  uri: { [key: string]: string };
}

const ThemeFilter = ({ onChange, uri }: ThemeFilterProps) => {
  const classes = useStyles();
  const [type, setType] = useState('');

  useEffect(() => {
    onChange({ type });
    // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    if (uri.type) setType(uri.type);
  }, [uri]);

  return (
    <Grid item sm={4} md={3} lg={3}>
      <AdminSelect
        selectClassName={classes.select}
        label="Type"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
        options={THEME_TYPES_OPTIONS}
      />
    </Grid>
  );
};

export default ThemeFilter;
