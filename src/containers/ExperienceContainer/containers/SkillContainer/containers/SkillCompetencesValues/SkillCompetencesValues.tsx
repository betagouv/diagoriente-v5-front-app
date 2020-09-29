import React, { useRef, useEffect, useState } from 'react';

import { Tooltip } from '@material-ui/core';

import { Link, RouteComponentProps } from 'react-router-dom';
import { CompetenceValues, Competence, Theme } from 'requests/types';

import { echelon, echelonValue } from 'utils/generic';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import RestLogo from 'components/common/Rest/Rest';
import Button from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';

import Child from 'components/ui/ForwardRefChild/ForwardRefChild';

import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';

import blueline from 'assets/svg/blueline.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  competencesValues: CompetenceValues[];
  setCompetencesValues: (CompetencesValues: CompetenceValues[]) => void;
  competences: Competence[];
  addSkill: () => void;
  addSkillState: boolean;
  theme: Theme | null;
  isCreate?: boolean;
  activities: string[];
}

const SkillCompetencesValues = ({
  match,
  competencesValues,
  setCompetencesValues,
  competences,
  addSkill,
  addSkillState,
  history,
  theme,
  isCreate,
  location,
  activities,
}: Props) => {
  const classes = useStyles();
  const circleRef = useRef([] as (HTMLDivElement | null)[]);
  const arrowRef = useRef(null as HTMLDivElement | null);

  // eslint-disable-next-line
  const [fixRef, setFixRef] = useState(0);
  const { redirect } = decodeUri(location.search);
  const pointClick = (id: string, value: number) => {
    const nextCompetenceValues = [...competencesValues];
    const index = nextCompetenceValues.findIndex((v) => v.id === id);
    if (index === -1) {
      nextCompetenceValues.push({ id, value });
    } else {
      nextCompetenceValues[index] = { id, value };
    }
    setCompetencesValues(nextCompetenceValues);
  };

  useEffect(() => {
    if (competencesValues.length) {
      setFixRef(1);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCompetencesValues(competencesValues.filter((comp) => competences.find((id) => comp.id === id.id)));
    // eslint-disable-next-line
  }, [competences]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title
            title={
              theme && theme.type === 'professional'
                ? 'MES EXPERIENCES PROFESSIONNELLES'
                : 'MES EXPERIENCES PERSONNELLES'
            }
            color="#223A7A"
            size={26}
          />
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
          <TitleImage title="4." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>En rapport avec les compétences que tu as choisies, comment te sens-tu ?</p>

          <div className={classes.echelonBackground}>
            <Avatar
              title={theme?.title}
              size={95}
              className={classes.themeAvatar}
              squareContainerClassName={classes.squareContainerClassName}
              titleClassName={classes.titleClassName}
            >
              <img src={theme?.resources?.icon} alt="" className={classes.avatarStyle} height={90} />
            </Avatar>
            <div className={classes.dataOptions}>
              {activities.slice(0, 4).map((activity) => (
                <div key={activity}>{activity}</div>
              ))}
            </div>
          </div>

          <div className={classes.echelonContainer}>
            <div className={classes.echelon}>
              <div className={classes.empty} />
              {echelon.map((value) => (
                <strong key={value} className={classes.echelonTitle}>
                  {value}
                </strong>
              ))}
            </div>

            <div className={classes.competencesContainer}>
              {competences.map((competence, i) => {
                const valueCompetence = competencesValues.find((selected) => selected.id === competence.id);
                let width = 0;
                if (valueCompetence && arrowRef.current) {
                  const circle = circleRef.current[valueCompetence.value - 1];

                  if (circle) {
                    width = circle.getBoundingClientRect().left - arrowRef.current.getBoundingClientRect().left + 9;
                  }
                }
                return (
                  <div key={competence.id} className={classes.competencesValues}>
                    <p className={classes.competenceTitle}>{competence.title}</p>
                    <div className={classes.arrowEchelon} ref={arrowRef}>
                      <div
                        className={classes.darkArrowEchelon}
                        style={{
                          width,
                        }}
                      />
                      {echelonValue.map((value, index) => (
                        <Tooltip
                          key={value}
                          title={
                            <Child className={classes.tooltipContainer}>
                              <strong>{echelon[index]}</strong>

                              <div className={classes.tooltipPointContainer}>
                                {[...Array(value)].map((e, point) => (
                                  // eslint-disable-next-line
                                  <div key={point} className={classes.tooltipPoint} />
                                ))}
                                {[...Array(4 - value)].map((e, point) => (
                                  // eslint-disable-next-line
                                  <div key={point} className={classes.tooltip} />
                                ))}
                              </div>
                              <strong>{competence.niveau[index].title}</strong>
                              {competence.niveau[index].sub_title}
                            </Child>
                          }
                          arrow
                          placement="right"
                        >
                          <Child className={classes.pointContainer}>
                            <div
                              onClick={() => pointClick(competence.id, value)}
                              className={classNames(
                                classes.point,
                                valueCompetence && valueCompetence.value === value && classes.pointSelected,
                                valueCompetence && valueCompetence.value > value && classes.smallPointSelected,
                              )}
                              ref={(ref) => {
                                if (i === 0) {
                                  circleRef.current[index] = ref;
                                }
                              }}
                            />
                          </Child>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            fetching={addSkillState}
            disabled={!(competencesValues.length === competences.length)}
            onClick={addSkill}
          />
        </div>

        <Link
          to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
          className={classes.btnpreced}
        >
          <CancelButton />
          Précedent
        </Link>
      </div>
    </div>
  );
};
export default SkillCompetencesValues;
