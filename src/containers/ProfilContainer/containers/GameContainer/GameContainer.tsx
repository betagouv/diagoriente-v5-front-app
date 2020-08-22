import React from 'react';
import Button from 'components/button/Button';
import { useHistory } from 'react-router-dom';
import useStyle from './style';

const GameContainer = () => {
  const classes = useStyle();
  const history = useHistory();
  const onNavigate = () => {
    history.push('/profile/card');
  };

  return (
    <div className={classes.root}>
      <div className={classes.frameContainer}>
        <div className={classes.frameOverlayContainer}>
          <iframe
            id="player"
            title="game"
            className={classes.frame}
            frameBorder="0"
            allowFullScreen
            scrolling="yes"
            src="https://diagoriente.beta.gouv.fr/new-game-card/"
          />
        </div>
        <div className={classes.btnContainer}>
          <div onClick={onNavigate}>
            <Button className={classes.btn}>
              <div className={classes.btnLabel}>Done</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
