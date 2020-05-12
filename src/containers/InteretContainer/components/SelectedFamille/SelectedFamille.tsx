import React from 'react';
import { Interests } from 'requests/types';
import useStyles from './styles';

interface IProps {
  famille: Interests;
  handleClick: (id: number) => void;
  index: number;
  direction: 'vertical' | 'horizontal';
}
const SelectedFamille = ({
 handleClick, famille, index, direction,
}: IProps) => {
  const classes = useStyles({ direction });
  return (
    <div className={classes.root} onClick={() => handleClick(index)}>
      <div className={classes.circle}>
        <div className={classes.number}>logo</div>
      </div>
      <div className={classes.elements}>{famille?.nom}</div>
    </div>
  );
};

export default SelectedFamille;
