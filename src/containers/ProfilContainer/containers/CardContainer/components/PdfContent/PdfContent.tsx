import { createPortal } from 'react-dom';
import React, { useContext, forwardRef, Ref } from 'react';
import ParcourContext from 'contexts/ParcourContext';
import classNames from 'utils/classNames';

import Grid from '@material-ui/core/Grid/Grid';

import carte from 'assets/svg/carte.svg';
import medaille from 'assets/svg/picto_medaille.svg';

import CardHeader from '../CardHeader/CardHeader';
import CardCompetence from '../CardCompetence/CardCompetence';
import CardSkills from '../CardSkills/CardSkills';
import CardPart from '../CardPart/CardPart';
import Comment, { CommentType } from '../Comment/Comment';

import useStyles from './styles';

const PdfContent = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const { parcours } = useContext(ParcourContext);
  const classes = useStyles();
  const comments = (
    ([] as { title: string; comment: CommentType }[]).concat(
      ...parcours?.skills.map((skill) => skill.comment.map((comment) => ({ title: skill.theme.title, comment }))),
    ) || []
  ).filter(({ comment }) => comment.status === 'accepted');
  const showBtn = parcours?.skills.length === 0;
  const showBtnEng = parcours?.skills.filter((el) => el.theme.type === 'engagement').length === 0;
  return createPortal(
    <div className={classes.container}>
      <div ref={ref} className={classes.pdf}>
        <CardHeader>
          <div className={classNames(classes.headerTitle, classes.pdfTitle)}>
            <img className={classes.headerImage} src={carte} alt="" />
            <span className={classes.title}>CARTE DE COMPÉTENCES</span>
          </div>
        </CardHeader>
        <div className={classes.competenceContainer}>
          <CardCompetence
            title="COMPÉTENCES TRANSVERSALES"
            description="En relation avec les expériences personnelles et professionnelles"
            type="tranversale"
          />
          <CardCompetence
            title="COMPÉTENCES D’ENGAGEMENT"
            description="En relation avec les expériences d’engagement (Service civique, Service National Universel...)"
            type="engagement"
          />
        </div>

        <CardSkills
          title="Expériences personnelles"
          type="personal"
          emptyMessage="Tu n’as pas encore renseigné d'expérience personnelle"
          emptyButton="J’ajoute une expérience perso"
          path=""
          showBtn={showBtn}
        />
        <CardSkills
          title="Expériences professionnelles"
          type="professional"
          emptyMessage="Tu n’as pas encore renseigné d'expérience professionnelle"
          emptyButton="J’ajoute une expérience pro"
          path=""
          showBtn={showBtn}
        />
        <CardSkills
          title="Expériences D’ENGAGEMENT"
          type="engagement"
          emptyMessage="Tu n’as pas encore renseigné d'expérience d'engagement"
          emptyButton="J’ajoute une expérience d'engagement"
          path=""
          showBtn={showBtnEng}
        />
        <CardPart title="RECOMMANDATIONS">
          <Grid className={classes.commentContainer} container spacing={3}>
            {comments.map(({ comment, title }) => (
              <Grid key={comment.id} item lg={4}>
                <div className={classes.themeTitle}>{title}</div>
                <Comment className={classes.comment} {...comment}>
                  <img src={medaille} alt="" className={classes.commentIcon} />
                </Comment>
              </Grid>
            ))}
          </Grid>
        </CardPart>
      </div>
    </div>,
    document.getElementById('root') as HTMLDivElement,
  );
});

export default PdfContent;
