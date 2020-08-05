import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'hooks/useInputs';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import Date from './components/DatePicker/DatePicker';
import RestLogo from 'components/common/Rest/Rest';
import moment from 'moment';

import blueline from 'assets/svg/blueline.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {}
const EngagementDate = ({ history }: Props) => {
  const classes = useStyles();

  const [state, actions] = useForm({
    initialValues: {
      dayBegin: moment().day(),
      monthBegin: moment().month() + 1,
      yearBegin: moment().year(),
      dayEnd: moment().day(),
      monthEnd: moment().month() + 1,
      yearEnd: moment().year(),
    },

    required: ['dayBegin', 'monthBegin', 'yearBegin', 'dayEnd', 'monthEnd', 'yearEnd'],
  });

  const handleChange = (e: React.ChangeEvent<any>, type: 'day' | 'month' | 'year', date: 'Begin' | 'End') => {
    actions.setValues({ [type + date]: e.target.value });
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title={'MES EXPÉRIENCES D’ENGAGEMENT'} color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              let path = '/experience';
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
            expérience d’engagement <br />
          </p>
          <div className={classes.dateContainer}>
            <div className={classes.date}>
              <span className={classes.text}>Du</span>{' '}
              <Date
                handleChange={(e, type) => handleChange(e, type, 'Begin')}
                day={state.values.dayBegin}
                month={state.values.monthBegin}
                year={state.values.yearBegin}
              />
            </div>
            <div className={classes.date}>
              <span className={classes.text}>Au</span>{' '}
              <Date
                handleChange={(e, type) => handleChange(e, type, 'End')}
                day={state.values.dayEnd}
                month={state.values.monthEnd}
                year={state.values.yearEnd}
              />
            </div>
          </div>
          <Link to={''} className={classes.hideLine}>
            <NextButton />
          </Link>
        </div>

        <Link to={'/experience/engagement-context'} className={classes.btnpreced}>
          <CancelButton />
          Précedent
        </Link>
      </div>
    </div>
  );
};
export default EngagementDate;
