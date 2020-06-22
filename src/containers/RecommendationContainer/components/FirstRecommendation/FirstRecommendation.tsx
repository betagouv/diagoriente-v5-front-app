import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import TitleSection from 'components/common/TitleSection/TitleSection';
import NextButton from 'components/nextButton/nextButton';

import attention from 'assets/svg/blueattention.svg';
import medaille from 'assets/svg/medaille.svg';
import CompetenceEchelon from '../Echelon/Echelon';

import useStyles from './styles';

const FirstRecommendation = ({ skill }: any) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const title = (
    <span>
      Bonjour Marie Dupont,
      <br />
      Vous pouvez renseigner ci dessous votre appréciation du travail de Léna Mazilu lorsque vous étiez son tuteur/sa
      tutrice
    </span>
  );

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={classes.container}>
      <TitleSection image={medaille} title={title} />
      <div className={classes.cardContainer}>
        <div className={classes.headerCard}>
          <div className={classes.header}>
            <span className={classes.themeHeader}>{skill.theme.title}</span>
            <span className={classes.themeHeader}>{skill.theme.date}</span>
          </div>
          <div className={classes.errorContainer}>
            <img src={attention} alt="attention" height={15} />
            <span className={classes.errorText}>Signaler une erreur</span>
          </div>
        </div>
        <div className={classes.bodyCard}>
          <span className={classes.competenceTitle}>Compétences identifiées par Léna lors de son expérience</span>
          {skill.competences.map((value: any) => (
            <CompetenceEchelon {...value} />
          ))}
        </div>
      </div>
      <span className={classes.recommendation}>Votre recommandation </span>
      <TextField
        name="comment"
        value={comment}
        placeholder="Ecrivez ici votre recommandation (xxx caractères max)"
        onChange={commentChange}
        InputProps={{
          classes: {
            input: classes.defaultValue,
          },
        }}
        rows={6}
        multiline
        className={classes.textArea}
        variant="outlined"
      />
      <Link to="/recommendation/complete" className={classes.hideLine}>
        <NextButton className={classes.button} disabled={!comment} />
      </Link>

      <Link to="/" className={classes.btnpreced}>
        Annuler
      </Link>
    </div>
  );
};
export default FirstRecommendation;
