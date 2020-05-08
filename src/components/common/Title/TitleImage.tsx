import React from 'react';
import useStyles from './styles';

interface Props {
  title: string;
  image: string;
  color: string;
  height?:string;
}

const TitleImage = ({
 title, image, color, height,
}: Props) => {
  const classes = useStyles({ color });
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={image} alt="trait" className={classes.image} height={height} />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{title}</div>
      </div>
    </div>
  );
};

export default TitleImage;
