import React, { useState, useEffect, useContext, useRef } from 'react';
import path from 'path';
import moment from 'moment';
import { useWillUnmount } from 'hooks/useLifeCycle';

import { RouteComponentProps, Switch, Route, Redirect, matchPath } from 'react-router-dom';
import { useTheme } from 'requests/themes';
import { useAddSkill, useUpdateSkill, useLazySkill } from 'requests/skills';

import ParcourContext from 'contexts/ParcourContext';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import SnackBar from 'components/SnackBar/SnackBar';
import Spinner from 'components/SpinnerXp/Spinner';

import { decodeUri } from 'utils/url';
import { SkillType, Competence } from 'requests/types';
import SkillActivities from './containers/SkillActivities';
import SkillCompetences from './containers/SkillCompetences';
import SkillCompetencesValues from './containers/SkillCompetencesValues/SkillCompetencesValues';
import SuccessCompetences from './containers/SuccessCompetences/SuccessCompetences';
import DoneCompetences from './containers/DoneCompetences/DoneCompetences';
import EngagementActivites from './containers/EngagementActivities/EngagementActivities';
import EngagementContext from './containers/EngagementContext/EngagementContext';
import EngagementDate from './containers/EngagementDate/EngagementDate';
import SkillDate from './containers/SkillDate/SkillDate';

import useStyles from './style';

const SkillContainer = ({ match, location, history }: RouteComponentProps<{ themeId: string }>) => {
  const classes = useStyles();
  const { redirect, skill: selectedSkillId } = decodeUri(location.search);

  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });
  const [skillCall, skillState] = useLazySkill();
  const { setParcours } = useContext(ParcourContext);

  const [activities, setActivities] = useState([] as SkillType['activities']);
  const [competences, setCompetences] = useState([] as Competence[]);
  const [competencesValues, setCompetencesValues] = useState([] as { id: string; value: number }[]);

  const [context, setContext] = useState('');
  const [organization, setOrganization] = useState('');

  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState('');

  const startDateSkill = useRef('');
  const endDateSkill = useRef('');
  const [extraActivity, setExtraActivity] = useState('');

  const [optionActivities, setOptionActivities] = useState([[]] as { id: string; title: string }[][]);
  const [activity, setActivity] = useState('');
  const [errorText, setErrorText] = useState('');

  const [addSkillCall, addSkillState] = useAddSkill();
  const [updateSkillCall, updateSkillState] = useUpdateSkill();

  const showSelection = matchPath(location.pathname, [`${match.path}/activities`, `${match.path}/competences`]);

  const renderError = () => {
    let localText = '';
    const isBeginDateValid = moment(startDateSkill.current).isAfter(moment());
    const isEndDateValid = moment(endDateSkill.current).isBefore(moment(startDateSkill.current));
    // comments
    if (isBeginDateValid) {
      localText = 'La date début doit être ultérieur à la date actuelle!';
      return localText;
    }
    if (endDateSkill.current) {
      if (isEndDateValid) {
        localText = 'La date de fin doit être supérieur à la date de début!';
        return localText;
      }
    }

    return localText;
  };
  useEffect(() => {
    if (selectedSkillId) skillCall({ variables: { id: selectedSkillId } });
    // eslint-disable-next-line
  }, [selectedSkillId]);

  useEffect(() => {
    if (skillState.data) {
      const selectedSkill = skillState.data.skill;
      setActivities(selectedSkill.activities);
      setCompetences(selectedSkill.competences.map((c) => c._id));
      setCompetencesValues(selectedSkill.competences.map((c) => ({ id: c._id.id, value: c.value })));
      if (selectedSkill.startDate) startDateSkill.current = selectedSkill.startDate;
      if (selectedSkill.endDate) endDateSkill.current = selectedSkill.endDate;
      if (selectedSkill.extraActivity) setExtraActivity(selectedSkill.extraActivity);
      if (selectedSkill.engagement) {
        setContext(selectedSkill.engagement.context?.id);
        setStartDate(moment(selectedSkill.engagement.startDate).format('YYYY-MM-DD'));
        setEndDate(moment(selectedSkill.engagement.endDate).format('YYYY-MM-DD'));
        setOptionActivities(
          selectedSkill.engagement.options.map((question) =>
            question.option.map((q) => ({ id: q.id, title: q.title })),
          ),
        );
        setActivity(selectedSkill.engagement.activity);
      }
    }
  }, [skillState.data]);

  useEffect(() => {
    const d = localStorage.getItem('optionActivities');
    if (d) {
      const activityData = JSON.parse(d);
      setOptionActivities(activityData.theme === match.params.themeId ? activityData.optionActivities : [[]]);
    }
    // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
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
    if (!selectedSkillId) {
      localStorage.setItem('activity', JSON.stringify({ theme: match.params.themeId, activity }));
    } // eslint-disable-next-line
  }, [activity, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('activities');
    if (d && !selectedSkillId) {
      const activityData = JSON.parse(d);
      setActivities(activityData.theme === match.params.themeId ? activityData.activities : []);
    }
    // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
      localStorage.setItem('activities', JSON.stringify({ theme: match.params.themeId, activities }));
    }
    // eslint-disable-next-line
  }, [activities, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competences');
    if (d && !selectedSkillId) {
      const competencesData = JSON.parse(d);
      setCompetences(competencesData.theme === match.params.themeId ? competencesData.competences : []);
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
      localStorage.setItem('competences', JSON.stringify({ theme: match.params.themeId, competences }));
    } // eslint-disable-next-line
  }, [competences, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('competencesValues');
    if (d && !selectedSkillId) {
      const competencesData = JSON.parse(d);
      setCompetencesValues(competencesData.theme === match.params.themeId ? competencesData.competencesValues : []);
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
      localStorage.setItem('competencesValues', JSON.stringify({ theme: match.params.themeId, competencesValues }));
    } // eslint-disable-next-line
  }, [competencesValues, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('context');
    if (d && !selectedSkillId) {
      const contextData = JSON.parse(d);
      setContext(contextData.theme === match.params.themeId ? contextData.context : '');
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
      localStorage.setItem('context', JSON.stringify({ theme: match.params.themeId, context }));
    } // eslint-disable-next-line
  }, [context, match.params.themeId]);

  useEffect(() => {
    const d = localStorage.getItem('extraActivity');
    if (d && !selectedSkillId) {
      const extraActivityData = JSON.parse(d);
      setExtraActivity(extraActivityData.theme === match.params.themeId ? extraActivityData.extraActivity : '');
    } // eslint-disable-next-line
  }, [match.params.themeId]);

  useEffect(() => {
    if (!selectedSkillId) {
      localStorage.setItem('extraActivity', JSON.stringify({ theme: match.params.themeId, extraActivity }));
    } // eslint-disable-next-line
  }, [context, match.params.themeId]);

  const addSkill = () => {
    const error = renderError();
    if (!error) {
      if (data) {
        setErrorText('');
        addSkillCall({
          variables: {
            theme: data.theme.id,
            activities: activities.map((a) => a.id),
            startDate: startDateSkill.current,
            endDate: endDateSkill.current,
            extraActivity,
            competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
          },
        });
      }
    } else {
      setErrorText(error);
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
            organization,
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
    } else if (selectedSkillId) {
      updateSkillCall({
        variables: {
          id: selectedSkillId,
          activities: activities.map((a) => a.id),
          startDate: startDateSkill.current,
          endDate: endDateSkill.current,
          extraActivity,
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
        },
      });
    }
  };

  const editSkillEngagement = () => {
    if (selectedSkillId) {
      updateSkillCall({
        variables: {
          id: selectedSkillId,
          competences: competencesValues.map((competence) => ({ _id: competence.id, value: competence.value })),
          engagement: {
            startDate,
            endDate,
            context,
            organization,
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
      history.push({
        pathname: `/experience/skill/${match.params.themeId}/success`,
        search: redirect || 'add',
      });
      localStorage.removeItem('theme');
      localStorage.removeItem('activities');
      localStorage.removeItem('competences');
      localStorage.removeItem('competencesValues');
      localStorage.removeItem('optionActivities');
      localStorage.removeItem('context');
      //
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
      localStorage.removeItem('extraActivity');
    } // eslint-disable-next-line
  }, [addSkillState.data, addSkillState.called]);

  useEffect(() => {
    if (updateSkillState.called && updateSkillState.data) {
      setParcours(updateSkillState.data.updateSkill);
      // history.push(`/profile/experience?type=${data?.theme.type}`);
      history.push({
        pathname: `/experience/skill/${match.params.themeId}/success`,
        search: location.search || 'edit',
      });
      localStorage.removeItem('theme');
      localStorage.removeItem('activities');
      localStorage.removeItem('competences');
      localStorage.removeItem('competencesValues');
      localStorage.removeItem('optionActivities');
      localStorage.removeItem('context');
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
      localStorage.removeItem('extraActivity');
    } // eslint-disable-next-line
  }, [updateSkillState.data, updateSkillState.called]);
  useWillUnmount(() => {
    localStorage.removeItem('theme');
    localStorage.removeItem('activities');
    localStorage.removeItem('competences');
    localStorage.removeItem('competencesValues');
    localStorage.removeItem('optionActivities');
    localStorage.removeItem('context');
    localStorage.removeItem('activity');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    localStorage.removeItem('extraActivity');
  });
  if (loading || skillState.loading) {
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
  const activitiesTitles =
    data?.theme.type === 'engagement'
      ? optionActivities.map((e) => e.map((o) => o.title).join(' '))
      : activities.map((a) => a.title);
  if (data?.theme.type === 'engagement' && activity) activitiesTitles.push(activity);
  console.log('addSkillState', addSkillState.error?.graphQLErrors[0]);
  return (
    <>
      <SnackBar
        variant="error"
        message={
          addSkillState.error
            ? (addSkillState.error.graphQLErrors[0].message as any).message ||
              addSkillState.error.graphQLErrors[0].message
            : ''
        }
        open={!!addSkillState.error}
      />

      <Switch>
        <Route
          render={(props) =>
            data.theme.type === 'engagement' ? (
              <EngagementActivites
                {...props}
                isCreate={!selectedSkillId}
                theme={data.theme}
                setOptionActivities={setOptionActivities}
                optionActivities={optionActivities}
                activity={activity}
                setActivity={setActivity}
              />
            ) : (
              <SkillActivities
                {...props}
                isCreate={!selectedSkillId}
                activities={activities}
                setActivities={setActivities}
                extraActivity={extraActivity}
                setExtraActivity={setExtraActivity}
                theme={data.theme}
              />
            )
          }
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
              isCreate={!selectedSkillId}
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
                theme={data.theme}
                isCreate={!selectedSkillId}
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
              setOrganization={setOrganization}
              organization={organization}
              addSkill={selectedSkillId ? editSkillEngagement : addSkillEngagement}
              addSkillState={selectedSkillId ? updateSkillState.loading : addSkillState.loading}
            />
          )}
          path={`${match.path}/date`}
          exact
        />
        <Route
          render={(props) => {
            if (!competences.length) return <Redirect to={path.join(match.url, `/competences${location.search}`)} />;
            return (
              <SkillDate
                {...props}
                addSkillState={selectedSkillId ? updateSkillState.loading : addSkillState.loading}
                theme={data.theme}
                startDate={startDateSkill.current}
                endDate={endDateSkill.current}
                errorText={errorText}
                onSubmit={(start, end) => {
                  if (start) startDateSkill.current = start;
                  if (end) endDateSkill.current = end;
                  const fn = selectedSkillId ? editSkill : addSkill;
                  fn();
                }}
              />
            );
          }}
          path={`${match.path}/SkillDate`}
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
