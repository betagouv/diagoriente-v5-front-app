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
        <div className={classes.textHeader}>Avez-vous un club pour vous récurter ?</div>
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
    </div>
  );
};

export default ScreenIntro;
