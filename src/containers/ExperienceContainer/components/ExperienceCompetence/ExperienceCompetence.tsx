import React, { useState } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import { useCompetence } from 'requests/competences';
import { Activity, Competence } from 'requests/types';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import RestLogo from 'components/common/Rest/Rest';
import Grid from '@material-ui/core/Grid';
import Button from 'components/button/Button';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';

import classNames from 'utils/classNames';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

const ExperienceCompetence = ({ match }: RouteComponentProps<{ themeId: string }>) => {
  const classes = useStyles();
  const [competence, setCompetence] = useState([] as Competence[]);
  const [activity, setActivity] = useState([] as Activity[]);

  const { data, loading } = useCompetence();

  useDidMount(() => {
    const d = localStorage.getItem('activity');
    if (d) {
      const activityData = JSON.parse(d);
      if (activityData.theme === match.params.themeId) {
        setActivity(activityData.activity);
      }
    }
  });

  const addCompetence = (id: string, title: string) => {
    setCompetence([...competence, { id, title }]);
  };

  const deleteCompetence = (id: string) => {
    setCompetence(competence.filter((comp) => comp.id !== id));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPERIENCES PERSONNELLES" color="#223A7A" size={26} />
          <RestLogo color="#4D6EC5" label="Annuler" />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="3" image={blueline} color="#223A7A" height="80px" />
          <p className={classes.title}>
            En rapport avec ces activités, quelles sont les compétences que tu mets en oeuvre ?
            <small>(4 choix maximum) </small>
          </p>
          <Grid className={classes.circleContainer} container spacing={3}>
            {loading && <div className={classes.loadingContainer}>...loading</div>}

            {data?.competences.data.map((comp: any) => {
              const selected = competence.find((e) => e.id === comp.id);

              return (
                <Grid item xs={12} md={6}>
                  <Button
                    key={comp.id}
                    className={classNames(classes.competences, selected && classes.selectedCompetence)}
                    onClick={() => (!selected ? addCompetence(comp.id, comp.title) : deleteCompetence(comp.id))}
                  >
                    {comp.title}
                  </Button>
                </Grid>
              );
            })}
          </Grid>

          <Button className={classes.btnperso} type="submit">
            <Link to="/experience/perso/comp" className={classes.hideLine}>
              <div className={classes.contentBtn}>
                <div className={classes.btnLabel}>Suivant</div>
                <Arrow color="#223A7A" width="12" height="12" />
              </div>
            </Link>
          </Button>
        </div>

        <Link to={`/experience/perso/${match.params.themeId}/activities`} className={classes.btnpreced}>
          <img src={arrowleft} alt="arrow" />
          Precedent
        </Link>
      </div>
      <Selection>
        <div className={classes.themeRoot}>
          {activity ? (
            <div className={classes.activityContainer}>
              <p className={classes.titleSelection}>Activité(s)</p>
              {activity.map((e) => (
                <Button
                  variant="outlined"
                  key={e.id}
                  className={classes.activitySelected}
                  childrenClassName={classes.selected}
                >
                  {e.title}
                </Button>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </Selection>
    </div>
  );
};
export default ExperienceCompetence;
