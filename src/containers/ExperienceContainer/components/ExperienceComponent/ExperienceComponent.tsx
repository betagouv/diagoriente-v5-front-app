import React from 'react';
import Title from 'components/common/Title/TitleImage';
import blueline from 'assets/svg/blueline.svg';
import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';
import help from 'assets/svg/help.svg';

import useStyles from './styles';

const HomeComponent = () => {
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
          <Avatar title="Ajouter une" size={200} marginTop="41px" marginBottom="16px" />
          <Button className={classes.btnperso} type="submit">
            <div className={classes.btnLabel}>Expérience perso </div>
          </Button>
        </div>
        <div>
          <div className={classes.circleContainer}>
            <Avatar title="Ajouter une" size={200} marginTop="41px" marginBottom="16px" />
            <Button className={classes.btnpro} type="submit">
              <div className={classes.btnLabel}>Expérience pro</div>
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

export default HomeComponent;
