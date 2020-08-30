import React, {
 useState, useEffect, useContext, useMemo,
} from 'react';
import path from 'path';
import moment from 'moment';

import {
 RouteComponentProps, Switch, Route, Redirect, matchPath,
} from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { useAddSkill, useUpdateSkill } from 'requests/skills';

import ParcourContext from 'contexts/ParcourContext';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import SnackBar from 'components/SnackBar/SnackBar';
import Spinner from 'components/SpinnerXp/Spinner';

import { decodeUri } from 'utils/url';
import SkillActivities from './containers/SkillActivities';
import SkillCompetences from './containers/SkillCompetences';
import SkillCompetencesValues from './containers/SkillCompetencesValues/SkillCompetencesValues';
import SuccessCompetences from './containers/SuccessCompetences/SuccessCompetences';
import DoneCompetences from './containers/DoneCompetences/DoneCompetences';
import EngagementActivites from './containers/EngagementActivities/EngagementActivities';
import EngagementContext from './containers/EngagementContext/EngagementContext';
import EngagementDate from './containers/EngagementDate/EngagementDate';

import useStyles from './style';

const SkillContainer = ({ match, location, history }: RouteComponentProps<{ themeId: string }>) => {
  const classes = useStyles();

  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });

  const { parcours, setParcours } = useContext(ParcourContext);
  const selectedSkill = useMemo(() => parcours?.skills.find((skill) => skill.theme?.id === match.params.themeId), [
    parcours,
    match.params.themeId,
  ]);
  const [activities, setActivities] = useState(selectedSkill?.activities || []);
  const [competences, setCompetences] = useState(selectedSkill?.competences.map((c) => c._id) || []);
  const [competencesValues, setCompetencesValues] = useState(
    selectedSkill?.competences.map((c) => ({ id: c._id.id, value: c.value })) || [],
  );

  const [context, setContext] = useState(selectedSkill?.engagement?.context?.id || '');
  const [startDate, setStartDate] = useState(
    selectedSkill?.engagement?.startDate
      ? moment(selectedSkill.engagement.startDate).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    selectedSkill?.engagement?.endDate
      ? moment(selectedSkill.engagement.endDate).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD'),
  );

  const [optionActivities, setOptionActivities] = useState(
    selectedSkill?.engagement?.options.map((question) =>
      question.option.map((q) => ({ id: q.id, title: q.title })),
    ) || [[]],
  );

  const [addSkillCall, addSkillState] = useAddSkill();
  const [updateSkillCall, updateSkillState] = useUpdateSkill();
  const [activity, setActivity] = useState(selectedSkill?.engagement?.activity || '');
  const showSelection = matchPath(location.pathname, [`${match.path}/activities`, `${match.path}/competences`]);

  useEffect(() => {
    const d = localStorage.getItem('optionActivities');
    if (d) {
      const activityData = JSON.parse(d);
      setOptionActivities(activityData.theme === match.params.themeId ? activityData.optionActivities : [[]]);
    }
    // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('optionActivities', JSON.stringify({ theme: match.params.themeId, optionActivities }));
    } // eslint-disable-next-line
  }, [optionActivities, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('activity');
    if (d) {
      const activityData = JSON.parse(d);
      setActivity(activityData.theme === match.params.themeId ? activityData.activity : '');
    }
    // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('activity', JSON.stringify({ theme: match.params.themeId, activity }));
    } // eslint-disable-next-line
  }, [activity, match.params.themeId]);

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
    if (!selectedSkill) {
      localStorage.setItem('competences', JSON.stringify({ theme: match.params.themeId, competences }));
    } // eslint-disable-next-line
  }, [competences, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competencesValues');
    if (d && !selectedSkill) {
      const competencesData = JSON.parse(d);
      setCompetencesValues(competencesData.theme === match.params.themeId ? competencesData.competencesValues : []);
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('competencesValues', JSON.stringify({ theme: match.params.themeId, competencesValues }));
    } // eslint-disable-next-line
  }, [competencesValues, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('context');
    if (d && !selectedSkill) {
      const contextData = JSON.parse(d);
      setContext(contextData.theme === match.params.themeId ? contextData.context : '');
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkill) {
      localStorage.setItem('context', JSON.stringify({ theme: match.params.themeId, context }));
    } // eslint-disable-next-line
  }, [context, match.params.themeId]);

  const addSkill = () => {
    if (data?.theme.type === 'engagement') {
      history.push(`/experience/skill/${match.params.themeId}/context`);
    } else if (data) {
      addSkillCall({
        variables: {
          theme: data.theme.id,
          activities: activities.map((a) => a.id),
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  const addSkillEngagement = () => {
    if (data) {
      addSkillCall({
        variables: {
          theme: data.theme.id,
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
          engagement: {
            startDate,
            endDate,
            context,
            options: optionActivities.filter((o) => o.length > 0).map((option) => option.map((o) => o.id)),
            activity,
          },
        },
      });
    }
  };

  const editSkill = () => {
    if (data?.theme.type === 'engagement') {
      history.push(`/experience/skill/${match.params.themeId}/context`);
    } else if (selectedSkill) {
      updateSkillCall({
        variables: {
          id: selectedSkill.id,
          activities: activities.map((a) => a.id),
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  const editSkillEngagement = () => {
    if (selectedSkill) {
      updateSkillCall({
        variables: {
          id: selectedSkill.id,
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
          engagement: {
            startDate,
            endDate,
            context,
            options: optionActivities.map((option) => option.map((o) => o.id)),
            activity,
          },
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
      localStorage.removeItem('optionActivities');
      localStorage.removeItem('context');
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
      localStorage.removeItem('optionActivities');
      localStorage.removeItem('context');
    } // eslint-disable-next-line
  }, [updateSkillState.data, updateSkillState.called]);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  if (!data) return <NotFoundPage />;

  if (match.isExact) {
    return <Redirect to={path.join(match.url, `/activities${location.search}`)} />;
  }

  const activitiesTitles = data?.theme.type === 'engagement'
      ? optionActivities.map((e) => e.map((o) => o.title).join(' '))
      : activities.map((a) => a.title);
  if (data?.theme.type === 'engagement' && activity) activitiesTitles.push(activity);
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
            (data.theme.type === 'engagement' ? (
              <EngagementActivites
                {...props}
                isCreate={!selectedSkill}
                theme={data.theme}
                setOptionActivities={setOptionActivities}
                optionActivities={optionActivities}
                activity={activity}
                setActivity={setActivity}
              />
            ) : (
              <SkillActivities
                {...props}
                isCreate={!selectedSkill}
                activities={activities}
                setActivities={setActivities}
                theme={data.theme}
              />
            ))}
          path={`${match.path}/activities`}
          exact
        />
        <Route
          render={(props) => (
            // if (!activities.length) return <Redirect to={path.join(match.url, `/activities${location.search}`)} />;
            <SkillCompetences
              {...props}
              competences={competences}
              setCompetences={setCompetences}
              theme={data.theme}
              isCreate={!selectedSkill}
            />
          )}
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
                addSkillState={selectedSkill ? updateSkillState.loading : addSkillState.loading}
                theme={data.theme}
                isCreate={!selectedSkill}
                activities={activitiesTitles}
              />
            );
          }}
          path={`${match.path}/competencesValues`}
          exact
        />

        <Route
          render={(props) => <EngagementContext {...props} setContext={setContext} contextCheck={context} />}
          path={`${match.path}/context`}
          exact
        />
        <Route
          render={(props) => (
            <EngagementDate
              {...props}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              addSkill={selectedSkill ? editSkillEngagement : addSkillEngagement}
              addSkillState={selectedSkill ? updateSkillState.loading : addSkillState.loading}
            />
          )}
          path={`${match.path}/date`}
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
      {showSelection && <Selection activities={activitiesTitles} theme={data.theme} />}
    </>
  );
};

export default SkillContainer;
