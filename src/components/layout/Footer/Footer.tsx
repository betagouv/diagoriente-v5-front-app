/* eslint-disable react/jsx-no-target-blank */
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
}

const Footer = ({ onChange, name }: IProps) => {
  const p = process.env.REACT_APP_PUBLIC_URL;

  const classes = useStyles();
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.iconContainer}>
        <div className={classNames(classes.circle, classes.circleTwitter)}>
          <a href="https://twitter.com/diagoriente">
            <img src={twitter} alt="twitter" />
          </a>
        </div>
        <div className={classNames(classes.circle, classes.circleLinkedin, classes.marginIcons)}>
          <a href="http://www.linkedin.com/company/diagoriente/">
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>
        <div className={classes.circle}>
          <a href="https://www.youtube.com/channel/UCfh-72vbjMaa-ZFzKIAF1Dw">
            <img src={youtube} alt="youtube" />
          </a>
        </div>
      </div>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <p className={classes.textTop}>
            <a className={classes.link} href={`${p}/documentation/`} target="_blank">
              Documentation
            </a>
            <br />
            <a className={classes.link} href={`${p}/statistiques/`} target="_blank">
              Statistiques
            </a>
            <br />
            <a className={classes.link} href="/" target="_blank">
              Code source
            </a>
            <br />
            <a className={classes.link} href={`${p}/cgu/`} target="_blank">
              CGU
            </a>
            <br />
            <a className={classes.link} href={`${p}/mention/`} target="_blank">
              Mentions légales
            </a>
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
