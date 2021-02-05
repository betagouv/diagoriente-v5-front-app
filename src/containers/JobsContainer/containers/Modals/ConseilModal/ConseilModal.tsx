import React from 'react';
import IdeaFull from 'assets/svg/picto_ampoule_full.svg';
import Button from 'components/button/Button';
import useStyles from './styles';

interface IProps {
  handleClose: () => void;
}

const ConseilModal = ({ handleClose }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <img src={IdeaFull} alt="" />
        <div className={classes.titleContainer}>PssT ! PAS SI VITE !</div>
      </div>
      <div className={classes.description}>Quelques conseils avant de contacter une entreprise par téléphone :</div>
      <div className={classes.info}>
        <div className={classes.text}>
          • Réfléchis à une courte explication du fonctionnement de l’immersion ou du stage : tout le monde n’est pas au
          courant !
        </div>
        <div className={classes.text}>
          • Prépare à l’avance quelques phrases pour te présenter et expliquer l’environnement pro que tu aimerais
          découvrir.
        </div>
        <div className={classes.text}>
          • Pas besoin de tourner autour du pot : sois clair et direct dans ta demande.
        </div>
        <div className={classes.text}>
          • Renseigne-toi sur les horaires d’activités de l’entreprise. Inutile d’appeler un restaurant à 13h en plein
          rush, ils n’auront pas beaucoup de temps à te consacrer !
        </div>
        <div className={classes.text}>• Et surtout : reste courtois et relax, tout va bien se passer !</div>
      </div>
      <div className={classes.logoContainerBtn}>
        <Button childrenClassName={classes.btnLabel} className={classes.btn} onClick={handleClose}>
          J’ai compris !
        </Button>
      </div>
    </div>
  );
};

export default ConseilModal;
