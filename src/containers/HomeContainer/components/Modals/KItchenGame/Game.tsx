import React from 'react';
import GameLogo from 'assets/svg/game.svg';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Game = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>PANIQUE EN CUISINE</div>
        <div className={classes.subTitle}>
          Pour t&lsquo;aider à identifier tes compétences, tu peux commencer par jouer à un petit jeu. Tu verras que
          chaque compétences compte !
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={GameLogo} alt="" />
      </div>
      <div className={classes.btnContainer}>
        <Link to="/game">
          <Button className={classes.btn}>
            <span className={classes.labelBtn}>Jouer</span>
          </Button>
        </Link>
      </div>
      <div className={classes.infoContainer}>
        <Link to="/experience">
          <div className={classes.infoText}>Non, je veux directement</div>
          <div className={classes.infoText}>renseigner ma première expérience</div>
        </Link>
      </div>
    </div>
  );
};

export default Game;
