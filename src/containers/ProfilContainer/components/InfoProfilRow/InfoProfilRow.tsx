import React from 'react';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  className?: string;
  title?: string;
  userInfo?: string;
  logo?: string;
  children?: React.ReactChild;
}
const InfoProfilRow = ({
 title, className, children,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.infoRowContainer, className)}>
      <span className={classes.title}>{title}</span>
      {children}
    </div>
  );
};

export default InfoProfilRow;
