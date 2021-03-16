/* eslint-disable react/default-props-match-prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import useOnclickOutside from 'hooks/useOnclickOutside';
import moment from 'moment';
import { Theme } from 'requests/types';
import CancelButton from 'components/cancelButton/CancelButton';
import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import RestLogo from 'components/common/Rest/Rest';
import Button from 'components/nextButton/nextButton';

import blueline from 'assets/svg/blueline.svg';
import { decodeUri } from 'utils/url';
import 'moment/locale/fr';

import Select from './component/SelectDateSkill';
import useStyles from './style';

interface Props extends RouteComponentProps<{ themeId: string }> {
  addSkillState: boolean;
  theme: Theme | null;
  isCreate?: boolean;
  months?: any;
  onSubmit: (startDate: string, endDate: string) => void;
}

const SkillDate = ({ match, addSkillState, theme, location, isCreate, months, history, onSubmit }: Props) => {
  const classes = useStyles();
  const { redirect } = decodeUri(location.search);
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const renderTypeTheme = () => {
    let res = '';
    if (theme) {
      switch (theme.type) {
        case 'professional': {
          res = 'MES EXPERIENCES PROFESSIONNELLES';
          break;
        }
        case 'sport': {
          res = 'MES EXPERIENCES SPORTIVES';
          break;
        }
        case 'engagement': {
          res = 'MES EXPERIENCES D’ENGAGEMENT';
          break;
        }
        default: {
          res = 'MES EXPERIENCES PERSONNELLES';
        }
      }
    }
    return res;
  };
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

  const [error, setError] = useState('');

  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  const [monthStart, setMonthStart] = useState('');
  const [monthStartText, setMonthStartText] = useState('');

  const [monthEnd, setMonthEnd] = useState('');
  const [monthEndText, setMonthEndText] = useState('');

  useOnclickOutside(startRef, () => {
    if (isOpenStart) setIsOpenStart(false);
  });
  useOnclickOutside(endRef, () => {
    if (isOpenEnd) setIsOpenEnd(false);
  });

  const onClickItem = (e: { label: string; value: string }, type: string) => {
    if (type === 'begin') {
      setMonthStart(e.value);
      setMonthStartText(e.label);
      setIsOpenStart(false);
    } else {
      setMonthEnd(e.value);
      setMonthEndText(e.label);
      setIsOpenEnd(false);
    }
  };

  const checkDate = () => {
    if (yearStart && monthStart) {
      onSubmit(
        new Date(`${yearStart}-${monthStart}-01`).toISOString(),
        new Date(`${yearEnd}-${monthEnd}-01`).toISOString(),
      );
    } else {
      setError('saisie au moins la date de début');
    }
  };
  useEffect(() => {
    if (yearStart && monthStart) {
      setError('');
    }
  }, [yearStart, monthStart]);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title={renderTypeTheme()} color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              let path = '/experience';
              if (!isCreate) path = `/profile/experience?type=${theme && theme.type}`;
              else if (redirect) path = redirect;
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="5." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Pour finir, à quelles dates s’est déroulée cette
            <br /> expérience perso ?
          </p>
          <div className={classes.error}>{error}</div>

          <div className={classes.wrapperDates}>
            <div className={classes.date}>
              <span className={classes.text}>
                Date de début <span className={classes.subText}>(obligatoire)</span>
              </span>
              <div className={classes.dateWrapper}>
                <Select
                  value={monthStartText}
                  placeholder="mois"
                  name="monthStart"
                  isOpen={isOpenStart}
                  options={months}
                  onClick={() => setIsOpenStart(!isOpenStart)}
                  onClickItem={(e) => onClickItem(e, 'begin')}
                  ref={startRef}
                />
                <input
                  className={classes.selectContainer}
                  value={yearStart}
                  placeholder="AAAA"
                  onChange={(e) => setYearStart(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className={classes.date}>
              <span className={classes.text}>
                Date de fin <span className={classes.subText}>(optionnelle)</span>
              </span>
              <div className={classes.dateWrapper}>
                <Select
                  value={monthEndText}
                  placeholder="mois"
                  name="monthEnd"
                  isOpen={isOpenEnd}
                  options={months}
                  onClickItem={(e) => onClickItem(e, 'end')}
                  onClick={() => setIsOpenEnd(!isOpenEnd)}
                  ref={endRef}
                />
                <input
                  className={classes.selectContainer}
                  value={yearEnd}
                  placeholder="AAAA"
                  onChange={(e) => setYearEnd(e.target.value)}
                  type="number"
                />
              </div>
            </div>
          </div>
          <Button fetching={addSkillState} onClick={checkDate} />
        </div>
        <Link
          to={`/experience/skill/${match.params.themeId}/competencesValues${location.search}`}
          className={classes.btnpreced}
        >
          <CancelButton />
          Précedent
        </Link>
      </div>
    </div>
  );
};
SkillDate.defaultProps = {
  months: moment.months().map((month, index) => ({
    value: index + 1 < 10 ? `0${index + 1}` : String(index + 1),
    label: month[0].toUpperCase() + month.slice(1),
  })),
};

export default SkillDate;
