import React from 'react';

import download from 'assets/svg/download.svg';
import print from 'assets/svg/print.svg';
import partage from 'assets/svg/partage.svg';

import useStyles from './styles';

interface CardIcons {
  onDownload?: () => void;
}

const CardIcons = ({ onDownload }: CardIcons) => {
  const classes = useStyles();

  return (
    <div className={classes.headerIcons}>
      <div onClick={onDownload} className={classes.headerIcon}>
        <img className={classes.headerIconImage} src={download} alt="" />
        Télécharger
      </div>
      <div className={classes.headerIcon}>
        <img className={classes.headerIconImage} src={print} alt="" />
        Imprimer
      </div>
      <div className={classes.headerIcon}>
        <img className={classes.headerIconImage} src={partage} alt="" />
        Partager
      </div>
    </div>
  );
};

export default CardIcons;
