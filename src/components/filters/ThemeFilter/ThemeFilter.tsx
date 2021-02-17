import React, { useState, useEffect } from 'react';

import { THEME_TYPES_OPTIONS } from 'utils/generic';

import Grid from '@material-ui/core/Grid/Grid';

import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';
import { useThemes } from 'requests/themes';

import useStyles from './styles';

interface ThemeFilterProps {
  onChange: (data: { type: string; secteur: string }) => void;
  uri: { [key: string]: string };
  options: {
    value: string;
    label: string;
  }[];
}

const ThemeFilter = ({ onChange, uri, options }: ThemeFilterProps) => {
  const classes = useStyles();
  const [type, setType] = useState('');
  const [secteur, setSecteur] = useState('');
  const { data } = useThemes({ variables: { type: 'secteur' } });

  useEffect(() => {
    onChange({ type, secteur });
    // eslint-disable-next-line
  }, [type, secteur]);

  useEffect(() => {
    if (uri.type) setType(uri.type);
    if (uri.secteur) setSecteur(uri.secteur);
  }, [uri]);

  return (
    <>
      <Grid item sm={4} md={3} lg={3}>
        <AdminSelect
          selectClassName={classes.select}
          label="Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          options={options}
        />
      </Grid>
      <Grid item sm={4} md={3} lg={3}>
        <AdminSelect
          selectClassName={classes.select}
          label="Secteur"
          value={secteur}
          onChange={(e) => {
            setSecteur(e.target.value);
          }}
          options={
            data
              ? [
                  { label: 'Aucun secteur', value: 'not-found' },
                  ...data.themes.data.map((theme) => ({ label: theme.title, value: theme.id })),
                ]
              : []
          }
        />
      </Grid>
    </>
  );
};

ThemeFilter.defaultProps = {
  options: THEME_TYPES_OPTIONS,
};

export default ThemeFilter;
