import React from 'react';

import useStyles from './styles';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  background?: string;
  title: string;
  initialChildren?: React.ReactChild;
  openChildren?: React.ReactChild;
  state?: 'closed' | 'initial' | 'open';
  image?: string;
  titleBackground?: string;
}

const DashboardStep = ({
  title,
  background,
  initialChildren,
  openChildren,
  state,
  image,
  titleBackground,
  ...other
}: Props) => {
  const classes = useStyles({ background, state });

  return (
    <div {...other} className={classes.container}>
      <div className={classes.title}>
        {title}
        {titleBackground && <img src={titleBackground} alt="" className={classes.titleBackground} />}
      </div>
      <div className={classes.avatarContainer}>
        <div className={classes.avatar}>{image && <img className={classes.image} alt="" src={image} />}</div>
      </div>
      <div className={classes.initialChildren}>{initialChildren}</div>
      <div onClick={(e) => e.stopPropagation()} className={classes.openChildren}>
        {openChildren}
      </div>
    </div>
  );
};

export default DashboardStep;
