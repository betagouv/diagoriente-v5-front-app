import React, { useState, useEffect, useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'hooks/useInputs';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import RestLogo from 'components/common/Rest/Rest';
import moment from 'moment';

import blueline from 'assets/svg/blueline.svg';
import DatePicker from './components/DatePicker/DatePicker';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  setStartDate: (e: string) => void;
  startDate: string;
  endDate: string;
  setEndDate: (e: string) => void;
  addSkill: () => void;
  addSkillState: boolean;
  days: any;
  months: any;
  years: any;
}
const EngagementDate = ({
  history,
  setStartDate,
  startDate,
  endDate,
  setEndDate,
  addSkill,
  addSkillState,
  match,
  location,
  days,
  months,
  years,
}: Props) => {
  const classes = useStyles();

  const handleChange = (e: any, date: 'Begin' | 'End') => {
    date === 'Begin' ? setStartDate(e) : setEndDate(e);
  };

  const startDateEngagement = useMemo(() => moment(startDate), [startDate]);

  const endDateEngagement = useMemo(() => moment(endDate), [endDate]);

  const isBeginDateValid = startDateEngagement.month() === Number(moment(startDate).format('MM')) - 1;
  const isEndDateValid = endDateEngagement.month() === Number(moment(endDate).format('MM')) - 1;
  const errorText = 'La date est invalide';

  useEffect(() => {
    if (isBeginDateValid) setStartDate(startDateEngagement.format('YYYY-MM-DD'));
  }, [startDateEngagement]);

  useEffect(() => {
    if (isEndDateValid) setEndDate(moment(endDateEngagement).format('YYYY-MM-DD'));
  }, [endDateEngagement]);

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
          <TitleImage title="6." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Pour finir, à quelles dates s’est déroulée cette
            <br />
            expérience d’engagement
            {' '}
            <br />
          </p>
          <div className={classes.dateContainer}>
            <div className={classes.date}>
              <span className={classes.text}>Du</span>
              <DatePicker
                handleChange={(e) => handleChange(e, 'Begin')}
                day={moment(startDate).format('DD')}
                month={moment(startDate).month() + 1}
                year={moment(startDate).year()}
                days={days}
                months={months}
                years={years}
              />
            </div>
            <div className={classes.errorText}>{!isBeginDateValid ? errorText : ''}</div>
            <div className={classes.date}>
              <span className={classes.text}>Au</span>
              <DatePicker
                handleChange={(e) => handleChange(e, 'End')}
                day={moment(endDate).format('DD')}
                month={moment(endDate).month() + 1}
                year={moment(endDate).year()}
                days={days}
                months={months}
                years={years}
              />
            </div>
            <div className={classes.errorText}>{!isEndDateValid ? errorText : ''}</div>
          </div>
          <NextButton fetching={addSkillState} onClick={addSkill} disabled={!isBeginDateValid || !isEndDateValid} />
        </div>

        <Link to={`/experience/skill/${match.params.themeId}/context${location.search}`} className={classes.btnpreced}>
          <CancelButton />
          Précedent
        </Link>
      </div>
    </div>
  );
};
export default EngagementDate;
