import React, { useState, useEffect, useContext } from 'react';
import path from 'path';
import {
 RouteComponentProps, Switch, Route, Redirect, matchPath,
} from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { Activity, Competence, CompetenceValues } from 'requests/types';
import { useAddSkill } from 'requests/skills';

import ParcourContext from 'contexts/ParcourContext';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import SnackBar from 'components/SnackBar/SnackBar';

import SkillActivities from './containers/SkillActivities';
import SkillCompetences from './containers/SkillCompetences';
import SkillCompetencesValues from './containers/SkillCompetencesValues/SkillCompetencesValues';
import SuccessCompetences from './containers/SuccessCompetences/SuccessCompetences';
import DoneCompetences from './containers/DoneCompetences/DoneCompetences';

const SkillContainer = ({ match, location, history }: RouteComponentProps<{ themeId: string }>) => {
  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });
  const [activities, setActivities] = useState([] as Activity[]);
  const [competences, setCompetences] = useState([] as Competence[]);
  const [competencesValues, setCompetencesValues] = useState([] as CompetenceValues[]);
  const [addSkillCall, addSkillState] = useAddSkill();

  const { setParcours } = useContext(ParcourContext);

  const showSelection = matchPath(location.pathname, [
    `${match.path}/activities`,

    `${match.path}/competences`,
    `${match.path}/competencesValues`,
  ]);

  useEffect(() => {
    const d = localStorage.getItem('activities');
    if (d) {
      const activityData = JSON.parse(d);
      setActivities(activityData.theme === match.params.themeId ? activityData.activities : []);
    }
  }, [match.params.themeId]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify({ theme: match.params.themeId, activities }));
  }, [activities, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competences');
    if (d) {
      const competencesData = JSON.parse(d);
      setCompetences(competencesData.theme === match.params.themeId ? competencesData.competences : []);
    }
  }, [match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competencesValues');
    if (d) {
      const competencesData = JSON.parse(d);
      setCompetencesValues(competencesData.theme === match.params.themeId ? competencesData.competencesValues : []);
    }
  }, [match.params.themeId]);

  useEffect(() => {
    localStorage.setItem('competences', JSON.stringify({ theme: match.params.themeId, competences }));
  }, [competences, match.params.themeId]);

  useEffect(() => {
    localStorage.setItem('competencesValues', JSON.stringify({ theme: match.params.themeId, competencesValues }));
  }, [competencesValues, match.params.themeId]);

  const addSkill = () => {
    if (data) {
      addSkillCall({
        variables: {
          theme: data.theme.id,
          activities: activities.map((activity) => activity.id),
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  useEffect(() => {
    if (addSkillState.called && addSkillState.data) {
      setParcours(addSkillState.data.addSkill);
      history.push(`/experience/skill/${match.params.themeId}/success`);
      localStorage.removeItem('theme');
      localStorage.removeItem('activities');
      localStorage.removeItem('competences');
      localStorage.removeItem('competencesValues');
    } // eslint-disable-next-line
  }, [addSkillState.data, addSkillState.called]);

  if (loading) {
    return <div>...loading</div>;
  }

  if (!data) return <NotFoundPage />;

  if (match.isExact) {
    return <Redirect to={path.join(match.url, '/activities')} />;
  }

  return (
    <>
      <SnackBar
        variant="error"
        message={addSkillState.error ? addSkillState.error.graphQLErrors[0].message : ''}
        open={!!addSkillState.error}
      />

      <Switch>
        <Route
          render={(props) => (
            <SkillActivities {...props} activities={activities} setActivities={setActivities} theme={data.theme} />
          )}
          path={`${match.path}/activities`}
          exact
        />
        <Route
          render={(props) => {
            if (!activities.length) return <Redirect to={path.join(match.url, '/activities')} />;
            return (
              <SkillCompetences
                {...props}
                competences={competences}
                setCompetences={setCompetences}
                theme={data.theme}
              />
            );
          }}
          path={`${match.path}/competences`}
          exact
        />
        <Route
          render={(props) => {
            if (!competences.length) return <Redirect to={path.join(match.url, '/competences')} />;
            return (
              <SkillCompetencesValues
                {...props}
                competencesValues={competencesValues}
                setCompetencesValues={setCompetencesValues}
                competences={competences}
                addSkill={addSkill}
                addSkillState={addSkillState.loading}
              />
            );
          }}
          path={`${match.path}/competencesValues`}
          exact
        />
        <Route
          render={(props) => <SuccessCompetences {...props} theme={data.theme} />}
          path={`${match.path}/success`}
          exact
        />
        <Route
          render={(props) => <DoneCompetences {...props} theme={data.theme} />}
          path={`${match.path}/done`}
          exact
        />
        <Route component={NotFoundPage} />
      </Switch>
      {showSelection && <Selection activities={activities} theme={data.theme} />}
    </>
  );
};

export default SkillContainer;
