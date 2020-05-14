import React from 'react';
import Title from 'components/common/TitleImage/TitleImage';
import blueline from 'assets/svg/blueline.svg';
import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';
import help from 'assets/svg/help.svg';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Experience = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Title title="MES EXPERIENCES" image={blueline} color="#223A7A" />
      <p className={classes.title}>
        Nous apprenons de toutes nos expériences. 
        <br />
        Ajoute à ton profil tes expériences,
        <br />
        quel que soit le domaine.
      </p>
      <div className={classes.root}>
        <div className={classes.circleContainer}>
          <Avatar title="Ajouter une" size={200} titleClassName={classes.marginTitle} />

          <Button className={classes.btnperso} type="submit">
            <Link to="/experience/theme">
              <div className={classes.btnLabel}>Expérience perso </div>
            </Link>
          </Button>
        </div>
        <div>
          <div className={classes.circleContainer}>
            <Avatar title="Ajouter une" size={200} titleClassName={classes.marginTitle} />

            <Button className={classes.btnpro} type="submit">
              <Link to="/experience/theme?type=professional" className={classes.hideLine}>
                <div className={classes.btnLabel}>Expérience pro</div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.help}>
        <img src={help} alt="help" />
      </div>
    </div>
  );
};

export default Experience;
