import React, { useContext, useEffect } from 'react';
import GameLogo from 'assets/images/ServiceCivique_RéférentielRectec-page-001.jpg';
import { useUpdateParcour } from 'requests/parcours';
import Button from 'components/button/Button';
import { Link, useHistory } from 'react-router-dom';
import ParcourContext from 'contexts/ParcourContext';
import useStyles from './style';

const Game = () => {
  const classes = useStyles();
  const history = useHistory();

  const [updateCall, updateState] = useUpdateParcour();
  const { setParcours } = useContext(ParcourContext);

  const onNavigate = () => {
    updateCall({ variables: { playedEng: true } });
  };

  useEffect(() => {
    if (updateState.data) {
      setParcours(updateState.data.updateParcour);
      history.push('/experience/theme?type=engagement');
    }
  }, [updateState.data, setParcours, history]);
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>JEU DE CARTES</div>
        <div className={classes.subTitle}>
          Tu ne maîtrises pas totalement la notion de compétence et souhaiterais
          <br />
          en apprendre davantage ? Entraîne-toi à manipuler le référentiel RECTEC-
          <br />
          Engagement à l’aide de notre jeu de cartes numérique.
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={GameLogo} alt="" className={classes.imgref} />
      </div>
      <div className={classes.btnContainer}>
        <Link to="/experience/game">
          <Button className={classes.btn}>
            <span className={classes.labelBtn}>Je commence l’entraînement</span>
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
