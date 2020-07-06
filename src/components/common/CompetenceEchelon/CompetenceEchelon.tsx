import React from 'react';
import { echelon } from 'utils/generic';

import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  value: number;
  className?: string;
  echelonClassName?: string;
  echelonTitleClassName?: string;
  tooltipPointClassName?: string;
  tooltipClassName?: string;
}

const CompetenceEchelon = ({
  value,
  className,
  echelonClassName,
  echelonTitleClassName,
  tooltipPointClassName,
  tooltipClassName,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.echelonContainer, className)}>
      <div className={classNames(classes.echelon, echelonClassName)}>
        <span className={classNames(classes.echelonTitle, echelonTitleClassName)}>{echelon[value - 1]}</span>
        <div className={classes.tooltipPointContainer}>
          {[...Array(value)].map((t, point) => (
            // eslint-disable-next-line
            <div key={point} className={classNames(classes.tooltipPoint, tooltipPointClassName)} />
          ))}
          {[...Array(4 - value)].map((t, point) => (
            // eslint-disable-next-line
            <div key={point} className={classNames(classes.tooltipPoint, classes.tooltip, tooltipClassName)} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CompetenceEchelon;
