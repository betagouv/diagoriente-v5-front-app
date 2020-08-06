import React from 'react';
import Close from 'assets/images/close.svg';
import classNames from "utils/classNames"

import useStyles from './styles';

interface Props {
  color: string;
  label?: string;
  onClick?: () => void;
  size?: number;
  className?: string;
}
const RestLogo = ({
 color, label, onClick, size, className,
}: Props) => {
  const classes = useStyles({ color, size });
  return (
    <div className={classNames(classes.container, className)} onClick={onClick}>
      {label && <div className={classes.subTitle}>{label}</div>}
      <div className={classes.root}>
        <img src={Close} alt="close" width={size && size / 3} height={size && size / 3} />
      </div>
    </div>
  );
};

export default RestLogo;
