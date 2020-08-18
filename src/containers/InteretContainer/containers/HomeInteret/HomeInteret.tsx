import React from 'react';
import Trait from 'assets/images/trait_violet.png';
import TitleImage from 'components/common/TitleImage/TitleImage';
import InterestLogo from 'assets/svg/interetHome.svg';
import GifIntro from 'assets/gif/intro_interets.gif';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const HomeInteret = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.interestContainerLogo}>
          <img src={InterestLogo} alt="interest" width="104" height="104" />
        </div>

        <TitleImage title="MES CENTRES D’INTÉRÊT" color="#420FAB" image={Trait} />
        <div className={classes.subTitleContainer}>
          <div className={classes.subTitle}>
            <div>Nous allons te présenter différents centres d&lsquo;intérêts.</div>
            <div>
              <b>À toi de choisir ceux qui te plairaient le plus</b>
              {'  '}
              en contexte professionnel
            </div>
          </div>
        </div>
        <div className={classes.avatarContainer}>
          <img src={GifIntro} alt="" width="175px" height="175px" />
          <div className={classes.btnContainer}>
            <Link to="/interet/main">
              <Button className={classes.btn} type="submit">
                <div className={classes.btnLabel}>C’est parti !</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInteret;
