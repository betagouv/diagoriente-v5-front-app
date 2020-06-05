import React, { useState } from 'react';
import Button from 'components/button/Button';
import outLineHeart from 'assets/svg/outlineHeart.svg';
import fullHeart from 'assets/svg/fullHeart.svg';
import useStyles from './style';

interface IProps {
  title: string;
  description: string;
  accessibility: string;
  selected: string;
  onClick: () => void;
}
const CardJob = ({ title, description, accessibility, onClick, selected }: IProps) => {
  const classes = useStyles({ selected });

  return (
    <div className={classes.root} onClick={onClick}>
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
        {!selected && <img src={outLineHeart} alt="heart" />}
      </div>
    </div>
  );
};

export default CardJob;
