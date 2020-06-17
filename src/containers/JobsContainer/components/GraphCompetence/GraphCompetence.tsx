/* eslint-disable default-case */
import React, { useState, useRef } from 'react';
import { echelon } from 'utils/generic';
import { useCompetence } from 'requests/competences';
import useStyles from './styles';

interface Iprops {
  competencesrequises: { _id: { id: string; title: string }; weight: number }[] | undefined;
}

const GraphCompetence = ({ competencesrequises }: Iprops) => {
  const [select, setSelect] = useState('jobCompetence');
  const classes = useStyles({ select });
  const arrowRef = useRef(null as HTMLDivElement | null);
  const { data: competences } = useCompetence();
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
              <div key={competence.id} className={classes.competencesValues}>
                <p className={classes.competenceTitle}>{competence.title}</p>
                <div className={classes.arrowEchelon} ref={arrowRef}>
                  <div
                    className={classes.darkArrowEchelon}
                    style={{
                      width: `${width}px`,
                    }}
                  />
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
