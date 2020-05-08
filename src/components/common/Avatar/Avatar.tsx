import React from 'react';
import classNames from 'utils/classNames';
import useStyles from './styles';

interface Props {
  title: string;
  size: number;
  className?: string;
  titleClassName?: string;
}

const Circle = ({
 title, size, className, titleClassName,
}: Props) => {
  const classes = useStyles({
    size,
  });
  return (
    <div className={classNames(classes.squareContainer, className)}>
      <div className={classes.square} />
      <p className={classNames(classes.title, titleClassName)}>{title}</p>
    </div>
  );
};

export default Circle;
