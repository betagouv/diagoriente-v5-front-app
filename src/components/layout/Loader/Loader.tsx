import React from 'react';

import useStyles from './styles';

const Loader = () => {
  const classes = useStyles();
  return <div className={classes.loading} />;
};

export default Loader;
