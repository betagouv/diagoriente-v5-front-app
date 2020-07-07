import React from 'react';
import TitleSection from 'components/common/TitleSection/TitleSection';

import Button from 'components/button/Button';

import medaille from 'assets/svg/medaille.svg';

import { PublicSkill } from 'requests/types';
import useStyles from './styles';

const DoneRecommendation = ({ skill }: { skill: PublicSkill }) => {
  const classes = useStyles();
  const historyChange = () => {
    window.location.href = process.env.REACT_APP_PUBLIC_URL as string;
  };
  const title = (
    <span>
      Merci !
      <br />
      Votre recommandation a été envoyée
      <br />
      Elle aidera
      {' '}
      {skill.user.firstName}
      {' '}
      à s'améliorer et décrocher de futures expériences professionnelles.
    </span>
  );
  return (
    <div className={classes.container}>
      <TitleSection image={medaille} title={title} textClassName={classes.text} />

      <div className={classes.btnContainerModal}>
        <Button className={classes.btn} onClick={historyChange}>
          <div className={classes.btnLabel}>Découvrir Diagoriente</div>
        </Button>
      </div>
    </div>
  );
};
export default DoneRecommendation;
