import React, { useContext, useMemo } from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import ParcourContext from 'contexts/ParcourContext';
import CompetenceEchelon from 'components/common/CompetenceEchelon/CompetenceEchelon';
import { isEmpty } from 'lodash';
import useStyles from './styles';

interface IProps {
  title: string;
  description: string;
  type?: string;
}

const CardCompetence = ({ title, description, type }: IProps) => {
  const classes = useStyles();
  const { parcours } = useContext(ParcourContext);
  const globalCompetences = useMemo(
    () => parcours?.globalCompetences.filter((comp) => comp.value > 0 && comp.type === 'default') || [],
    [parcours],
  );
  const globalEngagement = useMemo(
    () => parcours?.globalCompetences.filter((comp) => comp.type === 'engagement' && !isEmpty(comp.niveau)) || [],
    [parcours],
  );
  const globals = type === 'engagement' ? globalEngagement : globalCompetences;

  return (
    <div className={classes.part}>
      <div className={classes.competencesPart}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subTitle}>{description}</div>
        {globals.length ? (
          <Grid className={classes.competences} container spacing={3}>
            {globals.map((comp) => (
              <Grid item lg={6} key={comp.id}>
                <div className={classes.competenceTitle}>{comp.title}</div>
                <CompetenceEchelon value={comp.value} />
                <div className={classes.competenceNiveau}>{`${comp?.niveau?.title} ${comp.niveau?.sub_title}`}</div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className={classes.emptyCompetences}>
            Pour évaluer tes compétences, tu dois d&lsquo;abord
            {' '}
            <span className={classes.emptyCompetencesBold}>
              ajouter des expériences personnelles ou professionnelles
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCompetence;
