import React from 'react';
import { useHistory } from 'react-router-dom';
import download from 'assets/svg/download.svg';
import print from 'assets/svg/print.svg';
import partage from 'assets/svg/partage.svg';
import game from 'assets/svg/gamepad.svg';
import Spinner from '../loading/Spinner';

import useStyles from './styles';

interface CardIcons {
  onDownload: (i: string) => void;
  onPrint: (i: string) => void;
  fetching?: boolean;
  fetchingPrint?: boolean;
}

const CardIcons = ({
 onDownload, onPrint, fetching, fetchingPrint,
}: CardIcons) => {
  const classes = useStyles();
  const history = useHistory();
  const onNavigate = () => history.push('/profile/game');

  return (
    <div className={classes.headerIcons}>
      <div className={classes.headerIcon} onClick={onNavigate}>
        <div
          className={classes.gameIcon}
        >
          <img alt="game" src={game} className={classes.gameIconImage} width="80%" />
        </div>
        Jouer
      </div>
      <div onClick={() => onDownload('download')} className={classes.headerIcon}>
        <img className={classes.headerIconImage} src={download} alt="" />
        {fetching ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          'Télécharger'
        )}
      </div>
      <div className={classes.headerIcon} onClick={() => onPrint('print')}>
        <img className={classes.headerIconImage} src={print} alt="" />

        {fetchingPrint ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          'Imprimer'
        )}
      </div>

      {/* <div className={classes.headerIcon}>
        <img className={classes.headerIconImage} src={partage} alt="" />
        Partager
      </div> */}
    </div>
  );
};

export default CardIcons;
