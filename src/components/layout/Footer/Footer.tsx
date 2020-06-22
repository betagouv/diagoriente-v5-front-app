import React from 'react';

import classNames from 'utils/classNames';

import twitter from 'assets/svg/twitter.svg';
import linkedin from 'assets/svg/linkedin.svg';
import youtube from 'assets/svg/youtube.svg';
import Grid from '@material-ui/core/Grid';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';

import useStyles from './styles';

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
  name?: string;
  className?: string;
}

const Footer = ({ onChange, name, className }: IProps) => {
  const classes = useStyles();
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.iconContainer}>
        <div className={classNames(classes.circle, classes.circleTwitter)}>
          <img src={twitter} alt="twitter" />
        </div>
        <div className={classNames(classes.circle, classes.circleLinkedin, classes.marginIcons)}>
          <img src={linkedin} alt="linkedin" />
        </div>

        <div className={classes.circle}>
          <img src={youtube} alt="youtube" />
        </div>
      </div>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <p className={classes.textTop}>
            Documentation
            <br />
            Statistiques
            <br />
            Code source
            <br />
            CGU
            <br />
            Mentions légales
          </p>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} className={classes.newsteller}>
          <div className={classes.secondContainer}>
            <span className={classes.text}>S’abonner à la newsletter :</span>
            <Input
              inputBaseClassName={classes.width}
              className={classes.input}
              onChange={onChange}
              name={name}
              placeholder="example@mail.com"
            />
            <Button className={classNames(classes.btn, classes.width)} variant="outlined">
              S’abonner
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} className={classes.contactContainer}>
          <div className={classes.secondContainer}>
            <span className={classNames(classes.text, classes.textStyle)}>
              Une question, une suggestion d’amélioration ou un message sympa à nous transmettre ?
            </span>
            <Button className={classes.contact} variant="outlined">
              Nous contacter
            </Button>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
