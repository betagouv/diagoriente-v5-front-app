import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';

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
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const validateCampus = user?.validateCampus;
  const classes = useStyles({ background, state });

  return (
    <>
      <div {...other} className={classes.container}>
        {isCampus && state !== 'open' && !validateCampus && <div className={classes.disableClass} />}
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
    </>
  );
};

export default DashboardStep;
