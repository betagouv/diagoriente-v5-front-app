import React, { useState } from 'react';
import useStyles from './styles';

const GraphCompetence = () => {
  const [select, setSelect] = useState('jobCompetence');
  const classes = useStyles({ select });
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
    </div>
  );
};

export default GraphCompetence;
