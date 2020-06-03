import React from 'react';
import Button from 'components/button/Button';

import { Link } from 'react-router-dom';
import useStyles from './style';

const Confirmation = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>BRAVO !</div>
        <div className={classes.subTitle}>Ton inscription a bien été prise en compte.</div>
        <div className={classes.subTitle}>Tu as reçu un mail de confirmation.</div>
        <div className={classes.subTitle}>Si tu n&lsquo;as rien reçu, vérifie ton courrier indésirable.</div>
        <div className={classes.container}>
          <div className={classes.btnContainer}>
            <Link to="/">
              <Button className={classes.btn}>
                <div className={classes.btnLabel}>Commencer à designer mon avenir !</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
