import React from 'react';
import { Link } from 'react-router-dom';

import redarrow from 'assets/svg/redarrow.svg';

import useStyles from './styles';

const Arrow = () => {
  const classes = useStyles();
  return (
    <Link className={classes.arrowContainer} to="/profile">
      <img src={redarrow} alt="" height={15} />
      <span className={classes.txt}>Retour à mon profil </span>
    </Link>
  );
};

export default Arrow;
