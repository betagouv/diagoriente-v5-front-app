import React, { useState } from 'react';
import { Families } from 'requests/types';
import Dotdotdot from 'react-dotdotdot';
import Reset from 'components/common/Rest/Rest';

import useStyles from './styles';

interface IProps {
  famille: Families;
  handleClick: (id: number) => void;
  index: number;
  direction: 'vertical' | 'horizontal';
}
const SelectedFamille = ({ handleClick, famille, index, direction }: IProps) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles({ direction, hover });

  const nom = famille?.nom;
  const res = nom && nom.replace(/\//g, '');
  const mouseEnter = () => {
    setHover(true);
  };
  const mouseLeave = () => {
    setHover(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.circle}>
        <div className={classes.imgWrapper}>
          {direction && (
            <div onClick={() => handleClick(index)} className={classes.closeContainer}>
              <Reset color="#420FAB" size={20} />
            </div>
          )}
          <div className={classes.imageContainer} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <img src={famille.resources[2]} alt="" />
          </div>
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
