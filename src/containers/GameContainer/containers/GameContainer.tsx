import React from 'react';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import UploadFile from './Diagoriente_RéférentielRectec.pdf'
import useStyles from './style';

const GameContainer = () => {
  const classes = useStyles();
  const donwload = () => {};

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
          <Link to="/experience">
            <Button className={classes.btn}>
              <div className={classes.btnLabel}>Je commence à ajouter mes expériences</div>
            </Button>
          </Link>
          <Button className={classes.btn} onClick={donwload}>
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
