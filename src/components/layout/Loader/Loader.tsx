import React from 'react';

import useStyles from './styles';

const Loader = () => {
  const classes = useStyles();
  return <div className={classes.loading}>Loading...</div>;
};

export default Loader;
