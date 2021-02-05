/* eslint-disable default-case */
import React, { useState, useRef } from 'react';
import { echelon } from 'utils/generic';
import { useCompetences } from 'requests/competences';
import Point from 'assets/svg/point.svg';
import useStyles from './styles';

interface IProps {
  competencesrequises: { _id: { id: string; title: string }; weight: number }[] | undefined;
  competenceUser: { id: string; value: number; count: number; title: string }[] | undefined;
}

const GraphCompetence = ({ competencesrequises, competenceUser }: IProps) => {
  const [select, setSelect] = useState('jobCompetence');

  const classes = useStyles({ select });
  const arrowRef = useRef(null as HTMLDivElement | null);
  const { data: competences } = useCompetences();
  const isExist = (id: string) => {
    let res = false;
    if (competenceUser?.length) {
      competenceUser.forEach((el) => {
        if (el.id === id && el.value !== 0) {
          res = true;
        }
      });
    }
    return res;
  };
  let widthBlue = 0;

  const getWidth = (id: string) => {
    competenceUser?.map((el) => {
      if (el.value === 1 && el.id === id) widthBlue = 70.5;
      if (el.value === 2 && el.id === id) widthBlue = 510 / 2 - 36;
      if (el.value === 3 && el.id === id) widthBlue = 510 / 2 + 645 / 4 - 51.25;
      if (el.value === 4 && el.id === id) widthBlue = 510 / 1;
    });
    return widthBlue;
  };
  const isLess = (id: string) => {
    let value = false;
    const valueRequis = competencesrequises?.find((selected) => selected._id.id === id);
    const valueUser = competenceUser?.find((el) => el.id === id);
    if (valueUser && valueRequis) {
      if (valueUser.value < valueRequis.weight) {
        value = true;
      } else {
        value = false;
      }
    }
    return value;
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.titleJobCompetence} onClick={() => setSelect('jobCompetence')}>
          Les compétences requises pour ce métier
        </div>
        <div className={classes.titleParcoursCompetence} onClick={() => setSelect('parcoursCompetence')}>
          Tes meilleures compétences pour ce métier
        </div>
      </div>
      <div>
        <div className={classes.echelonContainer}>
          <div className={classes.echelon}>
            <div className={classes.empty} />
            {echelon.map((value) => (
              <strong key={value} className={classes.echelonTitle}>
                {value}
              </strong>
            ))}
          </div>
        </div>
        <div className={classes.competencesContainer}>
          {competences?.competences.data.map((competence) => {
            let width = 0;
            if (competencesrequises && competencesrequises?.length !== 0) {
              const valueCompetence = competencesrequises.find((selected) => selected._id.id === competence.id);
              if (valueCompetence) {
                switch (valueCompetence.weight) {
                  case 1:
                    width = 70.5;
                    break;
                  case 2:
                    width = 510 / 2 - 36;
                    break;
                  case 3:
                    width = 510 / 2 + 645 / 4 - 51.25;
                    break;
                  case 4:
                    width = 510 / 1;
                    break;
                }
              }
            }
            return (
              <div
                key={competence.id}
                className={
                  select === 'parcoursCompetence' && (!isExist(competence.id) || isLess(competence.id))
                    ? classes.competencesValuesNotExist
                    : classes.competencesValues
                }
              >
                <p className={classes.competenceTitle}>{competence.title}</p>
                <div
                  className={
                    select === 'parcoursCompetence' && isExist(competence.id) && !isLess(competence.id)
                      ? classes.arrowEchelonBlue
                      : classes.arrowEchelon
                  }
                  ref={arrowRef}
                >
                  <div
                    className={
                      select === 'parcoursCompetence' && isExist(competence.id) && !isLess(competence.id)
                        ? classes.darkArrowEchelonBlue
                        : classes.darkArrowEchelon
                    }
                    style={{
                      width: `${
                        select === 'parcoursCompetence' && isExist(competence.id) ? getWidth(competence.id) : width
                      }px`,
                    }}
                  />
                  {select === 'parcoursCompetence' && isExist(competence.id) && !isLess(competence.id) && (
                    <img
                      src={Point}
                      alt=""
                      style={{ position: 'absolute', left: getWidth(competence.id) - 15, top: 26 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GraphCompetence;
