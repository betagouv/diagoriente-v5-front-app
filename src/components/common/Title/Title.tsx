import React from 'react';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  title: string;
  color: string;
  size?: number;
  font?: string;
  className?: string;
}

const TitleImage = ({
 title, color, size, font, className,
}: Props) => {
  const classes = useStyles({
    color,
    size,
    font,
  });
  return <h1 className={classNames(classes.title, className)}>{title}</h1>;
};

export default TitleImage;
