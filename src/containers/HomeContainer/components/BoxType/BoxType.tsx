import React from 'react';
import LogoCheck from 'assets/form/check';
import useStyles from './style';

interface IProps {
  title: string;
  color: string;
}

const BoxType = ({ title, color }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div>
        <LogoCheck color={color} width="25" height="16" />
      </div>
    </div>
  );
};

export default BoxType;
