import React from 'react';
import { Families } from 'requests/types';
import useStyles from './styles';

interface IProps {
  index?: number;
  direction: 'horizontal' | 'vertical';
  size?: number;
  famille?: Families;
}

const Placeholder = ({
 index, direction, size, famille,
}: IProps) => {
  const classes = useStyles({ direction, size });
  return (
    <div className={classes.root}>
      <div className={classes.circle}>
        <div className={classes.number}>{index || null}</div>
      </div>
      {famille ? (
        <div className={classes.textFamille}>{famille.nom}</div>
      ) : (
        <div className={classes.elements}>
          <div className={classes.bigElement} />
          <div className={classes.smallElement} />
          <div className={classes.bigElement} />
        </div>
      )}
    </div>
  );
};

export default Placeholder;
