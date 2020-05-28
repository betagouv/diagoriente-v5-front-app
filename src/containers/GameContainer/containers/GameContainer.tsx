import React from 'react';
import { useUpdatePlayParcour } from 'requests/parcours';
import { useDidMount } from 'hooks/useLifeCycle';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import useStyles from './style';

const GameContainer = () => {
  const classes = useStyles();
  const [updateCall] = useUpdatePlayParcour();

  useDidMount(() => {
    updateCall({ variables: { played: true } });
  });
  return (
    <div className={classes.root}>
      <div className={classes.frameContainer}>
        <div className={classes.frameOverlayContainer}>
          <iframe
            title="game"
            className={classes.frame}
            frameBorder="0"
            src="https://monbilansnu.beta.gouv.fr/game-diagoriente/"
          />
        </div>
        <div className={classes.btnContainer}>
          <Link to="/experience">
            <Button className={classes.btn}>
              <div className={classes.btnLabel}>Commencer à ajouter mes expériences</div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
