import React from 'react';
import Button from 'components/button/Button';
import useStyles from './style';

interface Props {
  onClickAnswer: (answer: string) => void;
}

const ScreenIntro = ({ onClickAnswer }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.textHeader}>Avez-vous déjà identifié une structure d&lsquo;accueil ?</div>
        <div className={classes.textHeader} />
      </div>
      <div className={classes.content}>
        <Button className={classes.btn} onClick={() => onClickAnswer('oui')}>
          <span className={classes.textBtn}>OUI</span>
        </Button>
        <Button className={classes.btn} onClick={() => onClickAnswer('non')}>
          <span className={classes.textBtn}>NON</span>
        </Button>
      </div>
      <div className={classes.subInfoContainer}>
        <div className={classes.subInfo}>
          Si vous n&lsquo;avez pas identifié de structure d&lsquo;accueil, Campus2023 et le Conseiller Pôle Emploi vont
          pouvoir vous en proposer une en fonction de votre profil.
        </div>
      </div>
    </div>
  );
};

export default ScreenIntro;
