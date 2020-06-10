import React, { useState } from 'react';
import Button from 'components/button/Button';
import fullHeart from 'assets/svg/fullHeart.svg';
import useStyles from './style';

interface IProps {
  title: string;
  description: string;
  accessibility: string;
}
const CardJob = ({ title, description, accessibility }: IProps) => {
  const [selected, setSelected] = useState(false);
  const onHover = () => setSelected(true);
  const onLeave = () => setSelected(false);
  const classes = useStyles({ selected });

  return (
    <div className={classes.root} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>
      {selected && (
        <div className={classes.btnContainer}>
          <Button className={classes.btn}>
            <div className={classes.btnLabel}>En savoir plus</div>
          </Button>
        </div>
      )}
      <div className={classes.footerCard}>
        {accessibility && !selected && <div className={classes.accessibility}>{accessibility}</div>}
        {!selected && <img src={fullHeart} alt="heart" />}
      </div>
    </div>
  );
};

export default CardJob;
