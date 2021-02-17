import React, { useEffect, useContext } from 'react';
import Button from 'components/button/Button';
import { useHistory } from 'react-router-dom';
import { useUpdateParcour } from 'requests/parcours';
import ParcourContext from 'contexts/ParcourContext';
import UploadFile from './ServiceCivique.pdf';
import useStyles from './style';

const GameContainer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setParcours } = useContext(ParcourContext);
  const [updateCall, updateState] = useUpdateParcour();
  const onNavigate = () => {
    updateCall({ variables: { playedEng: true } });
  };
  useEffect(() => {
    if (updateState.data) {
      setParcours(updateState.data.updateParcour);
      history.push('/experience/theme?type=engagement');
    }
  }, [updateState.data, setParcours, updateState.error, history]);

  return (
    <div className={classes.root}>
      <div className={classes.frameContainer}>
        <div className={classes.frameOverlayContainer}>
          <iframe
            title="game"
            className={classes.frame}
            frameBorder="0"
            allowFullScreen
            scrolling="yes"
            src="https://diagoriente.beta.gouv.fr/ServiceCiviqueGame/"
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
