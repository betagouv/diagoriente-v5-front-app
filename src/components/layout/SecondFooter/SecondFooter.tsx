import React from 'react';

import classNames from 'utils/classNames';

import dgefp from 'assets/svg/dgefp.svg';
import idtm from 'assets/svg/idtm.svg';
import beta from 'assets/svg/logobeta.svg';
import plan from 'assets/svg/gdplan.svg';

import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

interface IProps {
  className?: string;
}

const SecondFooter = ({ className }: IProps) => {
  const classes = useStyles();
  return (
    <footer className={classNames(classes.footerContainer, className)}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <p className={classes.textTop}>
            Diagoriente est une startup d’Etat de la DGEFP en partenariat avec Id6 - la DINUM Services du 1er Ministre
          </p>
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={2} className={classes.iconContainer}>
          <img src={dgefp} alt="dgefp" width={144} />
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={2} className={classes.iconContainer}>
          <img src={idtm} alt="idtm" width={84} />
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={2} className={classes.iconContainer}>
          <img src={beta} alt="beta" width={91} />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} className={classes.iconContainer}>
          <img src={plan} alt="plan" width={209} />
        </Grid>
      </Grid>
    </footer>
  );
};

export default SecondFooter;
