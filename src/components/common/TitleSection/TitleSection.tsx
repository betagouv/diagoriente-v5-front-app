import React from 'react';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  title: any ;
  image: string;
  width?: number;
  className?: string;
  textClassName?: string;
}

const TitleSection = ({
 title, image, width, className, textClassName,
}: Props) => {
  const classes = useStyles({ width });
  return (
    <div className={classNames(classes.container, className)}>
      <img src={image} alt="medaille" className={classes.image} />
      <span className={classNames(classes.text, textClassName)}>{title}</span>
    </div>
  );
};

export default TitleSection;
