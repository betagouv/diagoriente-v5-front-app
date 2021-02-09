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
        <div className={classes.textHeader}>
          Etes-vous en relation avec une structure d&rsquo;accueil inscrite à Campus 2023 qui souhaite vous accueillir ?
        </div>
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
          Si ce n&rsquo;est pas le cas, l&rsquo;équipe Campus 2023 pourra vous en proposer une en fonction de votre
          profil.
        </div>
      </div>
    </div>
  );
};

export default ScreenIntro;
