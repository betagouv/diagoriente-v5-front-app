import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import TitleSection from 'components/common/TitleSection/TitleSection';
import NextButton from 'components/nextButton/nextButton';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import Button from 'components/button/Button';

import medaille from 'assets/svg/medaille.svg';

import useStyles from './styles';

const DoneRecommendation = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [selectedLocation, setSelectedLocation] = useState('');
  const historyChange = () => {
    window.location.href = process.env.REACT_APP_PUBLIC_URL as string;
  };
  const title = (
    <span>
      Merci !
      <br />
      Votre avis a été envoyé.
      <br />
      Il aidera Léna à s'améliorer et à trouver un travail
    </span>
  );
  return (
    <div className={classes.container}>
      <TitleSection image={medaille} title={title} textClassName={classes.text} />
      <div className={classes.location}>
        <span className={classes.recommendation}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec erat
          <br />
          suscipit risus egestas bibendum. Sed at nibh arcu.
        </span>
      </div>
      <div className={classes.btnContainerModal}>
        <Button className={classes.btn} onClick={historyChange}>
          <div className={classes.btnLabel}>Découvrir Diagoriente</div>
        </Button>
      </div>
    </div>
  );
};
export default DoneRecommendation;
