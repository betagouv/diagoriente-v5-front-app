import React, { useContext, useEffect } from 'react';
import GameLogo from 'assets/svg/game.svg';
import { useUpdateParcour } from 'requests/parcours';
import Button from 'components/button/Button';
import { Link, useHistory } from 'react-router-dom';
import ParcourContext from 'contexts/ParcourContext';

import useStyles from './styles';

const Game = () => {
  const classes = useStyles();
  const history = useHistory();
  const [updateCall, updateState] = useUpdateParcour();
  const { setParcours } = useContext(ParcourContext);

  const onNavigate = () => {
    updateCall({ variables: { played: true } });
    history.push('/experience');
  };
  useEffect(() => {
    if (updateState.data && !updateState.error) {
      setParcours(updateState.data.updateParcour);
    }
  }, [updateState.data, setParcours, updateState.error]);
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>PANIQUE EN CUISINE</div>
        <div className={classes.subTitle}>
          Pour t&apos;aider à identifier tes compétences, tu peux commencer
          <br />
          par jouer à un petit jeu. Tu verras qu’à travers chaque expérience se
          <br />
          cachent des compétences !
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
      <div className={classes.infoContainer} onClick={onNavigate}>
        <div className={classes.infoText}>Non, je veux directement</div>
        <div className={classes.infoText}>renseigner ma première expérience</div>
      </div>
    </div>
  );
};

export default Game;
