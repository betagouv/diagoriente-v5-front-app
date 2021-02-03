import React, { useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Input from 'components/inputs/Input/Input';
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
  setOrganization: (e: string) => void;
  addSkill: () => void;
  addSkillState: boolean;
  organization: string;
}
const EngagementDate = ({
  history,
  setStartDate,
  startDate,
  endDate,
  setEndDate,
  setOrganization,
  addSkill,
  addSkillState,
  match,
  location,
  organization,
}: Props) => {
  const classes = useStyles();

  const handleChange = (date: string, type: 'Begin' | 'End') => {
    if (type === 'Begin') setStartDate(date);
    else setEndDate(date);
  };
  const handelChangeInput = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setOrganization(value);
  };

  const startDateEngagement = useMemo(() => moment(startDate), [startDate]);

  const endDateEngagement = useMemo(() => moment(endDate), [endDate]);

  const isBeginDateValid = startDateEngagement.month() === Number(moment(startDate).format('MM')) - 1;
  const isEndDateValid = endDateEngagement.month() === Number(moment(endDate).format('MM')) - 1;
  const errorText = 'La date est invalide';

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
            <br />
          </p>
          <div className={classes.dateContainer}>
            <div className={classes.date}>
              <span className={classes.text}>Nom de l’organisation</span>
              <Input
                name="organization"
                onChange={handelChangeInput}
                value={organization}
                placeholder="Nom de l’organisation"
                required
                withOutIcons
              />
            </div>
            <div className={classes.date}>
              <span className={classes.text}>Du</span>
              <DatePicker
                handleChange={(e) => handleChange(e, 'Begin')}
                day={startDate.slice(8)}
                month={startDate.slice(5, 7)}
                year={startDate.slice(0, 4)}
              />
            </div>
            <div className={classes.errorText}>{!isBeginDateValid ? errorText : ''}</div>
            <div className={classes.date}>
              <span className={classes.text}>Au</span>
              <DatePicker
                handleChange={(e) => handleChange(e, 'End')}
                day={endDate.slice(8)}
                month={endDate.slice(5, 7)}
                year={endDate.slice(0, 4)}
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
