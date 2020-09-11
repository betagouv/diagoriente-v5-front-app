import React from 'react';
import { Families } from 'requests/types';
import Dotdotdot from 'react-dotdotdot';

import useStyles from './styles';

interface IProps {
  famille: Families;
  handleClick: (id: number) => void;
  index: number;
  direction: 'vertical' | 'horizontal';
}
const SelectedFamille = ({
  handleClick, famille, index, direction,
}: IProps) => {
  const classes = useStyles({ direction });

  const nom = famille?.nom;
  const res = nom && nom.replace(/\//g, '');
  return (
    <div className={classes.root} onClick={() => handleClick(index)}>
      <div className={classes.circle}>
        <div className={classes.imageContainer}>
          <img src={famille.resources[0]} alt="" />
          <img src={famille.resources[1]} alt="" className={classes.testImg} />
        </div>
      </div>
      <div className={classes.elements}>
        <Dotdotdot clamp={5}>
          <div className={classes.text}>{res}</div>
        </Dotdotdot>
      </div>
    </div>
  );
};

export default SelectedFamille;
