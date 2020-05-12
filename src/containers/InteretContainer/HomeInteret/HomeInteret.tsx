import React from 'react';
import Trait from 'assets/images/trait_violet.png';
import TitleImage from 'components/common/Title/TitleImage';
import AvatarImage from 'components/common/Avatar/Avatar';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const HomeInteret = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TitleImage title="MES CENTRES D’INTERET" color="#420FAB" image={Trait} />
        <div className={classes.subTitleContainer}>
          <div className={classes.subTitle}>
            <div>Nous allons te présenter différents centres d&lsquo;intérêts.</div>
            <div>
              <b>Choisis les 5 qui te parlent le plus</b>
              dans un contexte professionnel.
            </div>
          </div>
        </div>
        <div className={classes.avatarContainer}>
          <AvatarImage size={206} />
          <Link to="/interet/parcours">
            <Button className={classes.btn} type="submit">
              <div className={classes.btnLabel}>C’est parti !</div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeInteret;
