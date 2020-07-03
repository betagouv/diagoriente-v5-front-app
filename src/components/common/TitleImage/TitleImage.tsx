import React from 'react';
import classNames from 'utils/classNames';
import useStyles from './styles';
import Title from '../Title/Title';

interface Props {
  title: string;
  image: string;
  color: string;
  height?: string;
  size?: number;
  font?: string;
  width?: number;
  className?: string;
}

const TitleImage = ({ title, image, color, height, size, font, width, className }: Props) => {
  const classes = useStyles({
    color,
    size,
    font,
    width,
  });
  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.imageContainer}>
        <img src={image} alt="trait" className={classes.image} height={height} />
      </div>
      <Title title={title} color={color} size={size} font={font} className={classes.position} />
    </div>
  );
};

export default TitleImage;
