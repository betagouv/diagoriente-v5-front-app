import React, { useEffect, useContext } from 'react';
import Button from 'components/button/Button';
import { useHistory } from 'react-router-dom';
import { useUpdateParcour } from 'requests/parcours';
import ParcourContext from 'contexts/ParcourContext';
import UploadFile from './Diagoriente_RéférentielRectec.pdf';
import useStyles from './style';

const GameContainer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setParcours } = useContext(ParcourContext);
  const [updateCall, updateState] = useUpdateParcour();
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
      <div className={classes.frameContainer}>
        <div className={classes.frameOverlayContainer}>
          <iframe
            title="game"
            className={classes.frame}
            frameBorder="0"
            src="https://diagoriente.beta.gouv.fr/new-game-diagoriente/"
          />
        </div>
        <div className={classes.btnContainer}>
          <div onClick={onNavigate}>
            <Button className={classes.btn}>
              <div className={classes.btnLabel}>Je commence à ajouter mes expériences</div>
            </Button>
          </div>
          <Button className={classes.btn}>
            <a className={classes.btnLabel} href={UploadFile} download>
              Télécharger le Référentiel{' '}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
