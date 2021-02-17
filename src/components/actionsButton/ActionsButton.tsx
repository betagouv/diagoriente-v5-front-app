import React from 'react';
import classNames from 'utils/classNames';

import useStyles from './styles';

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  text: string;
  icon: string;
}

const ActionButton = ({
 className, icon, text, ...other
}: Props) => {
  const classes = useStyles();
  return (
    <div {...other} className={classes.root}>
      <img src={icon} alt="" className={classNames(classes.icon, className)} />
      <span className={classes.text}>{text}</span>
    </div>
  );
};

export default ActionButton;
