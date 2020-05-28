import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { Activity, Theme } from 'requests/types';
import { Tooltip } from '@material-ui/core';

import classNames from 'utils/classNames';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import Button from 'components/button/Button';
import RestLogo from 'components/common/Rest/Rest';
import Child from 'components/ui/ForwardRefChild/ForwardRefChild';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

const ExperienceActivity = ({ match, activities, setActivities }: Props) => {
  const classes = useStyles();

  const addActivity = (activite: Activity) => {
    setActivities([...activities, activite]);
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((act) => act.id !== id));
  };

  const { data, loading } = useTheme({ variables: { id: match.params.themeId } });

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
            Peux-tu nous en dire un peu plus sur
            <br />
            <strong>les activités</strong>
            que tu pratiques ?
            <br />
            <small>(Plusieurs choix possibles)</small>
          </p>
          <div className={classes.circleContainer}>
            {loading && <div className={classes.loadingContainer}>...loading</div>}

            {data?.theme.activities.map((act) => {
              const selected = activities.find((e) => e.id === act.id);
              return (
                <Tooltip
                  open={!act.description ? false : undefined}
                  key={act.id}
                  title={<Child>{act.description}</Child>}
                  arrow
                  placement="right"
                >
                  <Button
                    variant="outlined"
                    className={classNames(classes.activity, selected && classes.selectedActivity)}
                    onClick={() => (!selected ? addActivity(act) : deleteActivity(act.id))}
                  >
                    {act.title}
                  </Button>
                </Tooltip>
              );
            })}
          </div>
          <Link to={`/experience/skill/${match.params.themeId}/competences`} className={classes.hideLine}>
            <Button disabled={!activities.length} className={classes.btnperso} type="submit">
              <div className={classes.contentBtn}>
                <div className={classes.btnLabel}>Suivant</div>
                <Arrow color="#223A7A" width="12" height="12" />
              </div>
            </Button>
          </Link>
        </div>
        <Link to="/experience/theme" className={classes.btnpreced}>
          <img src={arrowleft} alt="arrow" className={classes.arrowpreced} />
          Precedent
        </Link>
      </div>
    </div>
  );
};
export default ExperienceActivity;
