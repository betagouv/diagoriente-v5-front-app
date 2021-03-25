/* eslint-disable react/default-props-match-prop-types */
import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  startDate: string;
  endDate: string;
  months?: any;
  errorText: string;
  onSubmit: (startDate?: string, endDate?: string) => void;
}

const SkillDate = ({
  match,
  addSkillState,
  startDate,
  endDate,
  theme,
  location,
  isCreate,
  months,
  history,
  errorText,
  onSubmit,
}: Props) => {
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

  const [yearStart, setYearStart] = useState(startDate ? moment(startDate).format('YYYY') : '');
  const [yearEnd, setYearEnd] = useState(endDate ? moment(endDate).format('YYYY') : '');

  const [monthStart, setMonthStart] = useState(startDate ? moment(startDate).format('MM') : '');
  const [monthStartText, setMonthStartText] = useState(startDate ? moment(startDate).format('MMMM') : '');

  const [monthEnd, setMonthEnd] = useState(endDate ? moment(endDate).format('MM') : '');
  const [monthEndText, setMonthEndText] = useState(endDate ? moment(endDate).format('MMMM') : '');

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
    if (yearStart && monthStart && !yearEnd && !monthEnd) {
      onSubmit(moment(`${yearStart}-${monthStart}-01`).format('YYYY-MM-DD'));
    } else if (yearStart && !monthStart) {
      setError('le mois du date de début est obligatoire');
    } else if (!yearStart && monthStart) {
      setError("l'année du date de début est obligatoire");
    } else if (yearStart && monthStart && !yearEnd && monthEnd) {
      setError("l'année du date de fin est obligatoire");
    } else if (yearStart && monthStart && yearEnd && !monthEnd) {
      setError('le mois du date de fin est obligatoire');
    } else if ((!yearStart && yearEnd && monthEnd) || (!monthStart && yearEnd && monthEnd)) {
      setError('les champs du date de début est obligatoire');
    } else if (yearStart && monthStart && yearEnd && monthEnd) {
      onSubmit(
        moment(`${yearStart}-${monthStart}-01`).format('YYYY-MM-DD'),
        moment(`${yearEnd}-${monthEnd}-01`).format('YYYY-MM-DD'),
      );
    } else {
      onSubmit();
    }
  };
  const renderType = (text?: string) => {
    let type = '';
    if (text) {
      switch (text) {
        case 'personal': {
          type = 'personnelle';
          break;
        }
        case 'professional': {
          type = 'professionnelle';
          break;
        }
        case 'sport': {
          type = 'sportive';
          break;
        }
        default: {
          type = 'personnelle';
          break;
        }
      }
    }

    return type;
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
            <br /> expérience {renderType(theme?.type)} ?
          </p>
          <div className={classes.error}>{error}</div>

          <div className={classes.wrapperDates}>
            <div className={classes.date}>
              <span className={classes.text}>
                Date de début <span className={classes.subText}>(optionnelle)</span>
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
                <span className={classes.exampleDate}>Ex: 2018</span>
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
                <span className={classes.exampleDate}>Ex: 2018</span>
              </div>
            </div>
          </div>
          <div className={classes.errorText}>{errorText || ''}</div>
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
