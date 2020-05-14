import React, { useState, useEffect } from 'react';
import path from 'path';
import {
 RouteComponentProps, Switch, Route, Redirect,
} from 'react-router-dom';
import { useTheme } from 'requests/themes';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';

import { Activity, Competence } from 'requests/types';

import SkillActivities from './containers/SkillActivities';
import SkillCompetences from './containers/SkillCompetences';

const SkillContainer = ({ match }: RouteComponentProps<{ themeId: string }>) => {
  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });
  const [activities, setActivities] = useState([] as Activity[]);
  const [competences, setCompetences] = useState([] as Competence[]);

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

  if (loading) {
    return <div>...loading</div>;
  }

  if (!data) return <NotFoundPage />;

  if (match.isExact) {
    return <Redirect to={path.join(match.url, '/activities')} />;
  }

  return (
    <>
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
            return <SkillCompetences {...props} competences={competences} setCompetences={setCompetences} />;
          }}
          path={`${match.path}/competences`}
          exact
        />
      </Switch>
      <Selection activities={activities} theme={data.theme} />
    </>
  );
};

export default SkillContainer;
