import React from 'react';
import useStyles from './styles';

interface Props {
  title: string;
  image: string;
  color: string;
}

const TitleImage = ({
 title, image, color,
}: Props) => {
  const classes = useStyles({ color });
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={image} alt="trait" className={classes.image} />
        </div>
        <div className={classes.titleContainer}>
          <div className={classes.title}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default TitleImage;
