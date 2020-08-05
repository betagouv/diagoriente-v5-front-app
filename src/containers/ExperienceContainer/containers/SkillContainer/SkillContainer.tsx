import React, { useState, useEffect, useContext, useMemo } from 'react';
import path from 'path';
import { RouteComponentProps, Switch, Route, Redirect, matchPath } from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { useAddSkill, useUpdateSkill } from 'requests/skills';

import ParcourContext from 'contexts/ParcourContext';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import SnackBar from 'components/SnackBar/SnackBar';

import { decodeUri } from 'utils/url';
import SkillActivities from './containers/SkillActivities';
import SkillCompetences from './containers/SkillCompetences';
import SkillCompetencesValues from './containers/SkillCompetencesValues/SkillCompetencesValues';
import SuccessCompetences from './containers/SuccessCompetences/SuccessCompetences';
import DoneCompetences from './containers/DoneCompetences/DoneCompetences';
import Engagement from './containers/EngagementActivities/EngagementActivities';
import EngagementContext from './containers/EngagementContext/EngagementContext';

const SkillContainer = ({ match, location, history }: RouteComponentProps<{ themeId: string }>) => {
  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });

  //for testing engagement type
  /*  if (data) {
    (data as any).theme.type = 'engagement';
  } */

  const { parcours, setParcours } = useContext(ParcourContext);
  const selectedSkill = useMemo(() => parcours?.skills.find((skill) => skill.theme.id === match.params.themeId), [
    parcours,
    match.params.themeId,
  ]);
  const [activities, setActivities] = useState(selectedSkill?.activities || []);
  const [competences, setCompetences] = useState(selectedSkill?.competences.map((c) => c._id) || []);
  const [competencesValues, setCompetencesValues] = useState(
    selectedSkill?.competences.map((c) => ({ id: c._id.id, value: c.value })) || [],
  );
  const [addSkillCall, addSkillState] = useAddSkill();
  const [updateSkillCall, updateSkillState] = useUpdateSkill();

  const showSelection = matchPath(location.pathname, [
    `${match.path}/activities`,

    `${match.path}/competences`,
    `${match.path}/competencesValues`,
  ]);

  useEffect(() => {
    const d = localStorage.getItem('activities');
    if (d && !selectedSkill) {
      const activityData = JSON.parse(d);
      setActivities(activityData.theme === match.params.themeId ? activityData.activities : []);
    }
    // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) localStorage.setItem('activities', JSON.stringify({ theme: match.params.themeId, activities }));
    // eslint-disable-next-line
  }, [activities, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competences');
    if (d && !selectedSkill) {
      const competencesData = JSON.parse(d);
      setCompetences(competencesData.theme === match.params.themeId ? competencesData.competences : []);
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competencesValues');
    if (d && !selectedSkill) {
      const competencesData = JSON.parse(d);
      setCompetencesValues(competencesData.theme === match.params.themeId ? competencesData.competencesValues : []);
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('competences', JSON.stringify({ theme: match.params.themeId, competences }));
    } // eslint-disable-next-line
  }, [competences, match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('competencesValues', JSON.stringify({ theme: match.params.themeId, competencesValues }));
    } // eslint-disable-next-line
  }, [competencesValues, match.params.themeId]);

  const addSkill = () => {
    if (data?.theme.type === 'engagement') {
      history.push(`/experience/skill/${match.params.themeId}/context`);
    } else if (data) {
      addSkillCall({
        variables: {
          theme: data.theme.id,
          activities: activities.map((activity) => activity.id),
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  const editSkill = () => {
    if (selectedSkill) {
      updateSkillCall({
        variables: {
          id: selectedSkill.id,
          activities: activities.map((activity) => activity.id),
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  useEffect(() => {
    if (addSkillState.called && addSkillState.data) {
      setParcours(addSkillState.data.addSkill);
      const { redirect } = decodeUri(location.search);
      history.push(redirect || `/experience/skill/${match.params.themeId}/success`);
      localStorage.removeItem('theme');
      localStorage.removeItem('activities');
      localStorage.removeItem('competences');
      localStorage.removeItem('competencesValues');
    } // eslint-disable-next-line
  }, [addSkillState.data, addSkillState.called]);

  useEffect(() => {
    if (updateSkillState.called && updateSkillState.data) {
      setParcours(updateSkillState.data.updateSkill);
      history.push(`/profile/experience?type=${data?.theme.type}`);
      localStorage.removeItem('theme');
      localStorage.removeItem('activities');
      localStorage.removeItem('competences');
      localStorage.removeItem('competencesValues');
    } // eslint-disable-next-line
  }, [updateSkillState.data, updateSkillState.called]);

  if (loading) {
    return <div>...loading</div>;
  }

  if (!data) return <NotFoundPage />;

  if (match.isExact) {
    return <Redirect to={path.join(match.url, `/activities${location.search}`)} />;
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
          render={(props) =>
            data.theme.type === 'engagement' ? (
              <Engagement
                {...props}
                isCreate={!selectedSkill}
                activities={activities}
                setActivities={setActivities}
                theme={data.theme}
              />
            ) : (
              <SkillActivities
                {...props}
                isCreate={!selectedSkill}
                activities={activities}
                setActivities={setActivities}
                theme={data.theme}
              />
            )
          }
          path={`${match.path}/activities`}
          exact
        />
        <Route
          render={(props) => {
            // if (!activities.length) return <Redirect to={path.join(match.url, `/activities${location.search}`)} />;
            return (
              <SkillCompetences
                {...props}
                competences={competences}
                setCompetences={setCompetences}
                theme={data.theme}
                isCreate={!selectedSkill}
              />
            );
          }}
          path={`${match.path}/competences`}
          exact
        />
        <Route
          render={(props) => {
            if (!competences.length) return <Redirect to={path.join(match.url, `/competences${location.search}`)} />;
            return (
              <SkillCompetencesValues
                {...props}
                competencesValues={competencesValues}
                setCompetencesValues={setCompetencesValues}
                competences={competences}
                addSkill={selectedSkill ? editSkill : addSkill}
                addSkillState={addSkillState.loading}
                theme={data.theme}
                isCreate={!selectedSkill}
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
        <Route component={EngagementContext} path={`${match.path}/context`} exact />

        <Route component={NotFoundPage} />
      </Switch>
      {showSelection && <Selection activities={activities} theme={data.theme} />}
    </>
  );
};

export default SkillContainer;
