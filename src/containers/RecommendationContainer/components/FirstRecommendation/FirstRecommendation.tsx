import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PublicSkill } from 'requests/types';

import TitleSection from 'components/common/TitleSection/TitleSection';
import NextButton from 'components/nextButton/nextButton';

import attention from 'assets/svg/blueattention.svg';
import medaille from 'assets/svg/medaille.svg';
import classNames from 'utils/classNames';
import CompetenceEchelon from '../Echelon/Echelon';

import useStyles from './styles';

interface Props extends RouteComponentProps {
  skill: PublicSkill;
  comment: string;
  setComment: (comment: string) => void;
}

const FirstRecommendation = ({
 skill, location, comment, setComment,
}: Props) => {
  const classes = useStyles();
  const title = (
    <span>
      Bonjour
      {' '}
      {` ${skill.comment.firstName} ${skill.comment.lastName}`}
      ,
      <br />
      Vous pouvez renseigner ci dessous votre appréciation du travail de
      {' '}
      {skill.user.firstName}
      {' '}
      {skill.user.lastName}
      {' '}
      lorsque vous étiez son tuteur/sa tutrice
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
            {/*  <span className={classes.themeHeader}>{skill.theme.date}</span> */}
          </div>
         {/*  <div className={classes.errorContainer}>
            <img src={attention} alt="attention" height={15} />
            <span className={classes.errorText}>Signaler une erreur</span>
          </div> */}
        </div>
        <div className={classes.bodyCard}>
          <span className={classes.competenceTitle}>
            Compétences identifiées par
            {' '}
            {` ${skill.user.firstName} ${skill.user.lastName}  `}
            lors de son expérience
          </span>
          {skill.competences.map((competence) => (
            <CompetenceEchelon
              key={competence._id.id}
              value={competence.value}
              title={competence._id.title}
              niveau={`${competence._id.niveau[competence.value - 1].title} ${
                competence._id.niveau[competence.value - 1].sub_title
              }`}
            />
          ))}
        </div>
      </div>
      <span className={classes.recommendation}>Votre recommandation </span>
      <TextField
        name="comment"
        value={comment}
        placeholder="Ecrivez ici votre recommandation"
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
      <Link
        to={`/recommendation/complete${location.search}`}
        className={classNames(classes.hideLine, !comment && classes.disabled)}
      >
        <NextButton className={classes.button} disabled={comment.length < 5} />
      </Link>

      <Link to="/" className={classes.btnpreced}>
        Annuler
      </Link>
    </div>
  );
};
export default FirstRecommendation;
