import React, { useContext, useMemo } from 'react';
import ParcourContext from 'contexts/ParcourContext';

import Grid from '@material-ui/core/Grid/Grid';

import CompetenceEchelon from 'components/common/CompetenceEchelon/CompetenceEchelon';

import useStyles from './styles';

const CardCompetence = () => {
  const { parcours } = useContext(ParcourContext);
  const classes = useStyles();
  const globalCompetences = useMemo(() => parcours?.globalCompetences.filter((comp) => comp.value > 0) || [], [
    parcours,
  ]);
  return (
    <div className={classes.part}>
      <div className={classes.competencesPart}>
        <div className={classes.title}>COMPÉTENCES TRANSVERSALES</div>
        <div className={classes.subTitle}>En relation avec les expériences personnelles et professionnelles</div>
        {globalCompetences.length ? (
          <Grid className={classes.competences} container spacing={3}>
            {globalCompetences.map((comp) => (
              <Grid item lg={6} key={comp.id}>
                <div className={classes.competenceTitle}>{comp.title}</div>
                <CompetenceEchelon value={comp.value} />
                <div className={classes.competenceNiveau}>{`${comp.niveau.title} ${comp.niveau.sub_title}`}</div>
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
