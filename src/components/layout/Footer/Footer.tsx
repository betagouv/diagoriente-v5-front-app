import React from 'react';

import classNames from 'utils/classNames';

import efp from 'assets/svg/efp.svg';
import orangeLogo from 'assets/svg/orangeLogo.svg';
import plan from 'assets/svg/plan.svg';
import beta from 'assets/images/marianne.png';
import twitter from 'assets/svg/twitter.svg';
import linkedin from 'assets/svg/linkedin.svg';
import circle from 'assets/svg/circle.svg';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footerContainer}>
      <div className={classNames(classes.leftSection)}>
        <p className={classes.textTop}>
          Diagoriente est une startup d’Etat de la DGEFP en partenariat avec Id6 - la DINUM Services du 1er Ministre
        </p>
        <div className={classNames(classes.footer)}>
          <span className={classes.textBottom}>Mentions légales</span>
          <img src={circle} alt="circle" className={classes.circleDot} />
          <span className={classes.text}>CGU</span>
          <img src={circle} alt="circle" className={classes.circleDot} />

          <div className={classNames(classes.circle, classes.circleTwitter, classes.marginIcons)}>
            <img src={twitter} alt="twitter" />
          </div>
          <div className={classNames(classes.circle, classes.circleLinkedin)}>
            <img src={linkedin} alt="linkedin" />
          </div>
        </div>
      </div>
      <div className={classes.rightSection}>
        <img src={efp} alt="efp" height={76} className={classes.efp} />
        <div className={classes.square}>
          <img src={orangeLogo} alt="orangeLogo" height={57} />
        </div>

        <div className={classes.square}>
          <img src={plan} alt="plan" height={57} />
        </div>

        <div className={classes.square}>
          <img src={beta} alt="beta" height={57} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
