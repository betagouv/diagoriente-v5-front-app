import React from 'react';

import useStyles from './styles';

interface CardPartProps {
  title: string;
  children: React.ReactChild | React.ReactChild[];
}

const CardPart = ({ title, children }: CardPartProps) => {
  const classes = useStyles();

  return (
    <div className={classes.part}>
      <div className={classes.title}>{title}</div>
      {children}
    </div>
  );
};

export default CardPart;
