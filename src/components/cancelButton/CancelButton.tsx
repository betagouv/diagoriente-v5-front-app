import React from 'react';
import classNames from 'utils/classNames';

import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

export interface Props {
  className?: string;
}

const NextButton = ({ className }: Props) => {
  const classes = useStyles();
  return <img src={arrowleft} alt="arrow" className={classNames(classes.arrowpreced, className)} />;
};

export default NextButton;
