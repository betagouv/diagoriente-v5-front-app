import React from 'react';
import classNames from 'utils/classNames';
import useStyles from './styles';

interface Props {
  title: string;
  size: number;
  className?: string;
  titleclassName?: string;
}

const Circle = ({
 title, size, className, titleclassName,
}: Props) => {
  const classes = useStyles({
    size,
  });
  return (
    <div className={classNames(classes.squareContainer, className)}>
      <div className={classes.square} />
      <p className={classNames(classes.title, titleclassName)}>{title}</p>
    </div>
  );
};

export default Circle;
