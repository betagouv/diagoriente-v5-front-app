import React from 'react';
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
}

const TitleImage = ({
 title, image, color, height, size, font, width,
}: Props) => {
  const classes = useStyles({
    color,
    size,
    font,
    width,
  });
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={image} alt="trait" className={classes.image} height={height} />
      </div>
      <Title title={title} color={color} size={size} font={font} className={classes.position} />
    </div>
  );
};

export default TitleImage;
