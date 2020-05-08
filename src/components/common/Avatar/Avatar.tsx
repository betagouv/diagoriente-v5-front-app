import React from 'react';
import classNames from 'utils/classNames';
import useStyles from './styles';

interface Props {
  title: string;
  size: number;
  marginTop: string;
  marginBottom: string;
  className?: string;
}

const Circle = ({
 title, size, marginTop, marginBottom, className,
}: Props) => {
  const classes = useStyles({
    size,
    marginTop,
    marginBottom,
  });
  return (
    <div className={classNames(classes.squareContainer, className)}>
      <div className={classes.square} />
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default Circle;
