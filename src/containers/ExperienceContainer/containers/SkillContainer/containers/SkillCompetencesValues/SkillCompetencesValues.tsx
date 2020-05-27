import React, { useRef, useEffect, useState } from 'react';

import { Tooltip } from '@material-ui/core';

import { Link, RouteComponentProps } from 'react-router-dom';
import { CompetenceValues, Competence } from 'requests/types';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import RestLogo from 'components/common/Rest/Rest';
import Button from 'components/button/Button';
import Child from 'components/ui/ForwardRefChild/ForwardRefChild';

import classNames from 'utils/classNames';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  competencesValues: CompetenceValues[];
  setCompetencesValues: (CompetencesValues: CompetenceValues[]) => void;
  competences: Competence[];
  addSkill: () => void;
  addSkillState: boolean;
}
const echelonValue = [1, 2, 3, 4];
const echelon = ['Débutant.e', "Plutôt à l'aise", "A l'aise", 'Expert.e'];
const SkillCompetencesValues = ({
  match,
  competencesValues,
  setCompetencesValues,
  competences,
  addSkill,
  addSkillState,
}: Props) => {
  const classes = useStyles();
  const circleRef = useRef([] as (HTMLDivElement | null)[]);
  const arrowRef = useRef(null as HTMLDivElement | null);
  const [fixRef, setFixRef] = useState(0);

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
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPERIENCES PERSONNELLES" color="#223A7A" size={26} />
          <RestLogo color="#4D6EC5" label="Annuler" />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="4" image={blueline} color="#223A7A" height="80px" />
          <p className={classes.title}>
            Et enfin, pour chacune de ces compétences
            <br />
            que tu as choisies, comment te sens-tu ?
          </p>
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
                    width = circle.getBoundingClientRect().left - arrowRef.current.getBoundingClientRect().left;
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
                          title={(
                            <Child className={classes.tooltipContainer}>
                              <strong>{echelon[index]}</strong>

                              <div className={classes.tooltipPointContainer}>
                                {[...Array(value)].map(() => (
                                  <div key={value} className={classes.tooltipPoint} />
                                ))}
                              </div>
                              <strong>{competence.niveau[index].title}</strong>
                              {competence.niveau[index].sub_title}
                            </Child>
                          )}
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
            disabled={!competencesValues.length}
            className={classes.btnperso}
            type="submit"
            onClick={addSkill}
          >
            <div className={classes.contentBtn}>
              <div className={classes.btnLabel}>Suivant</div>
              {!addSkillState && <Arrow color="#223A7A" width="12" height="12" />}
            </div>
          </Button>
        </div>

        <Link to={`/experience/skill/${match.params.themeId}/competences`} className={classes.btnpreced}>
          <img src={arrowleft} alt="arrow" className={classes.arrowpreced} />
          Precedent
        </Link>
      </div>
    </div>
  );
};
export default SkillCompetencesValues;
