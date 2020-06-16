import React from 'react';
import { echelon } from 'utils/generic';
import useStyles from './styles';

const CompetenceEchelon = ({ value }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.echelonContainer}>
      <div className={classes.echelon}>
        <span className={classes.echelonTitle}>{echelon[value - 1]}</span>
        <div className={classes.tooltipPointContainer}>
          {[...Array(value)].map((t, point) => (
            // eslint-disable-next-line
            <div key={point} className={classes.tooltipPoint} />
          ))}
          {[...Array(4 - value)].map((t, point) => (
            // eslint-disable-next-line
            <div key={point} className={classes.tooltip} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CompetenceEchelon;
