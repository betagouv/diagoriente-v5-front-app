import React, { useState, useEffect } from 'react';

import { THEME_TYPES_OPTIONS } from 'utils/generic';

import Grid from '@material-ui/core/Grid/Grid';

import AdminCheckbox from 'components/inputs/AdminCheckbox/AdminCheckbox';

interface ThemeFilterProps {
  onChange: (data: { wc2023: string }) => void;
  uri: { [key: string]: string };
}

const ThemeFilter = ({ onChange, uri }: ThemeFilterProps) => {
  const [wc2023, setWc2023] = useState(false);

  useEffect(() => {
    onChange({ wc2023: wc2023 ? 'true' : 'false' });
    // eslint-disable-next-line
  }, [wc2023]);

  useEffect(() => {
    if (uri.wc2023) setWc2023(uri.wc2023 !== 'false');
  }, [uri]);

  return (
    <Grid style={{paddingTop: 0, paddingBottom: 0}} item sm={12} md={12} lg={12}>
      <AdminCheckbox checked={wc2023} onChange={(e) => setWc2023(e.target.checked)} label="Campus 2023" />
    </Grid>
  );
};

ThemeFilter.defaultProps = {
  options: THEME_TYPES_OPTIONS,
};

export default ThemeFilter;
