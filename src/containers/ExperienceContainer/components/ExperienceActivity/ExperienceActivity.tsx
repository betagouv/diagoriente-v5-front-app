import React, { useState, useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { useDidMount } from 'hooks/useLifeCycle';
import { Activity } from 'requests/types';

import classNames from 'utils/classNames';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import Avatar from 'components/common/Avatar/Avatar';
import Button from 'components/button/Button';
import RestLogo from 'components/common/Rest/Rest';

import Selection from 'components/theme/ThemeSelection/ThemeSelection';

import SelectionContext from 'contexts/SelectionContext';
import ThemeContext from 'contexts/ThemeContext';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

const ExperienceActivity = ({ match }: RouteComponentProps<{ themeId: string }>) => {
  const classes = useStyles();
  const {
 themeId, themeTitle, themeIcon, themeBackground, setSelection,
} = useContext(SelectionContext);
  const { open, setOpen } = useContext(ThemeContext);

  const [activity, setActivity] = useState([] as Activity[]);

  const addActivity = (id: string, title: string) => {
    setActivity([...activity, { id, title }]);
    setOpen(true);
  };
  const deleteActivity = (id: string) => {
    setActivity(activity.filter((act) => act.id !== id));
  };
  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });

  useEffect(() => {
    if (data) {
      setSelection({
        id: data.theme.id,
        title: data.theme.title,
        icon: data.theme.resources?.icon || '',
        background: data.theme.resources?.backgroundColor || '',
      });
    }
  }, [data]);

  useDidMount(() => {
    const d = localStorage.getItem('activity');
    if (d) {
      const activityData = JSON.parse(d);
      if (activityData.theme === match.params.themeId) {
        setActivity(activityData.activity);
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('activity', JSON.stringify({ theme: match.params.themeId, activity }));
  }, [activity]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPERIENCES PERSONNELLES" color="#223A7A" size={26} />
          <RestLogo color="#4D6EC5" label="Annuler" />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="2" image={blueline} color="#223A7A" height="80px" />
          <p className={classes.title}>
            Peux-tu nous en dire un peu plus sur les activités que tu pratiques ?
            <small>(Plusieurs choix possibles)</small>
          </p>
          <div className={classes.circleContainer}>
            {loading && <div className={classes.loadingContainer}>...loading</div>}

            {data?.theme.activities.map((act) => {
              const selected = activity.find((e) => e.id === act.id);
              return (
                <Button
                  variant="outlined"
                  key={act.id}
                  className={classNames(classes.activity, selected && classes.selectedActivity)}
                  onClick={() => (!selected ? addActivity(act.id, act.title) : deleteActivity(act.id))}
                >
                  {act.title}
                </Button>
              );
            })}
          </div>

          <Button className={classes.btnperso} type="submit">
            <Link to={`/experience/perso/${match.params.themeId}/competences`} className={classes.hideLine}>
            <div className={classes.contentBtn}>

              <div className={classes.btnLabel}>
                Suivant</div>
                <Arrow color="#223A7A" width="12" height="12" />
              </div>
            </Link>
          </Button>
        </div>
        <Link to="/experience/perso" className={classes.btnpreced}>
          <img src={arrowleft} alt="arrow" />
          Precedent
        </Link>
      </div>

      <Selection>
        <div className={classes.themeRoot}>
          <p className={classes.titleSelection}>Thème</p>
          <div className={classes.themeSelection}>
            <Avatar size={60} key={themeId} className={classes.themeAvatar} avatarCircleBackground={themeBackground}>
              <img src={themeIcon} alt="ddd" className={classes.avatarStyle} height={90} />
            </Avatar>
            <p className={classes.themeTile}>{themeTitle}</p>
          </div>

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
export default ExperienceActivity;
