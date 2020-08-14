import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ActivityEngagement, Theme } from 'requests/types';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import Select from 'components/Select/Select';
import { useAddActivityOption } from 'requests/activitiyOption';

import RestLogo from 'components/common/Rest/Rest';

import blueline from 'assets/svg/blueline.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  setEngagementActivities: (activities: ActivityEngagement[]) => void;
  isCreate?: boolean;
  activitiesEngagement: ActivityEngagement[];
  refetch?: any;
}

const EngagementActivities = ({
  history,
  match,
  theme,
  isCreate,
  location,
  activitiesEngagement,
  setEngagementActivities,
  refetch,
}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addValue, setAddValue] = useState('');
  const [addActivityOptionCall, addActivityOptionState] = useAddActivityOption();
  const openActivity = () => {
    setOpen(true);
  };
  const handleClose = (id: string) => {
    if (addValue.length > 2) {
      addActivityOptionCall({ variables: { option: addValue, id } });
      setOpen(false);
    }
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddValue(value);
  };
  useEffect(() => {
    if (addActivityOptionState.data) refetch();
    setAddValue('');
  }, [addActivityOptionState.data, refetch]);

  const handleChange = (e: React.ChangeEvent<any>, index: number) => {
    if (e.target.value) {
      const nextActivitiesEngagement = [...activitiesEngagement];
      const newValues = { ...nextActivitiesEngagement[index] };
      newValues.option = e.target.value;
      nextActivitiesEngagement[index] = newValues;
      setEngagementActivities(nextActivitiesEngagement);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPÉRIENCES D’ENGAGEMENT" color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              const path = '/experience';
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
          </p>
          <div className={classes.selectRoot}>
            <div>
              <span>Choisis en déroulant les menus ou ajoute tes propre activités</span>
              <div className={classes.selectGrid}>
                {theme.activities.map((activity, index) => (
                  <div className={classes.selectContainer}>
                    <Select
                      label={activity.title}
                      value={activitiesEngagement[index] ? activitiesEngagement[index].option : ''}
                      onChange={(e) => handleChange(e, index)}
                      options={activity.options.map((value) => ({ value: value.value, label: value.value }))}
                      open={open}
                      openActivity={openActivity}
                      setOpen={setOpen}
                      handleClose={() => handleClose(activity.id)}
                      onChangeValue={onChangeValue}
                      rootClassName={classes.rootClassName}
                      styleSelectClassName={classes.styleSelect}
                      className={classes.borderSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link
            to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
            className={classes.hideLine}
          >
            <NextButton
              disabled={activitiesEngagement.length !== activitiesEngagement.filter((e) => e.option !== '').length}
            />
          </Link>
        </div>
        {isCreate && (
          <Link
            to={`/experience/${theme.type === 'engagement' ? 'theme?type=engagement' : 'theme'}${location.search}`}
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
export default EngagementActivities;
