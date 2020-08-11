import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { useTheme } from 'requests/themes';
import { Theme } from 'requests/types';
import { Tooltip } from '@material-ui/core';

import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import Button from 'components/button/Button';
import CancelButton from 'components/cancelButton/CancelButton';
import Spinner from 'components/SpinnerXp/Spinner';

import RestLogo from 'components/common/Rest/Rest';
import Child from 'components/ui/ForwardRefChild/ForwardRefChild';

import blueline from 'assets/svg/blueline.svg';

import { Unpacked } from 'utils/types';
import useStyles from './styles';

type Activity = Unpacked<Theme['activities']>;

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  isCreate?: boolean;
}

const ExperienceActivity = ({
 match, activities, setActivities, history, theme, isCreate, location,
}: Props) => {
  const classes = useStyles();
  const { redirect } = decodeUri(location.search);
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
          <Title
            title={theme.type === 'professional' ? 'MES EXPERIENCES PROFESSIONNELLES' : 'MES EXPERIENCES PERSONNELLES'}
            color="#223A7A"
            size={26}
          />
          <RestLogo
            onClick={() => {
              let path = '/experience';
              if (!isCreate) path = `/profile/experience?type=${data && data.theme.type}`;
              else if (redirect) path = redirect;
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="2." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Peux-tu nous en dire un peu plus sur
            <br />
            <strong>les activités </strong>
            que tu pratiques ?
            <br />
            <small>(Plusieurs choix possibles)</small>
          </p>
          <div className={classes.circleContainer}>
            {loading && (
              <div className={classes.loadingContainer}>
                {' '}
                <Spinner />
              </div>
            )}

            {data?.theme.activities
              .sort((a, b) => a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0))
              .map((act) => {
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
                      childrenClassName={classes.childrenClassName}
                    >
                      {act.title}
                    </Button>
                  </Tooltip>
                );
              })}
          </div>
          <Link
            to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
            className={classes.hideLine}
          >
            <NextButton disabled={!activities.length} />
          </Link>
        </div>
        {isCreate && (
          <Link
            to={`/experience/${theme.type === 'professional' ? 'theme-pro' : 'theme'}${location.search}`}
            className={classes.btnpreced}
          >
            <CancelButton />
            Précedent
          </Link>
        )}
      </div>
    </div>
  );
};
export default ExperienceActivity;
