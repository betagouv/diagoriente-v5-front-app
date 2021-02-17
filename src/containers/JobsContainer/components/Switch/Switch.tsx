import React from 'react';
import useStyles from './styles';

interface IProps {
  checked: boolean;
  onClick: () => void;
}

const Switch = ({ checked, onClick }: IProps) => {
  const classes = useStyles({ checked });
  return (
    <div className={classes.switchContainer} onClick={onClick}>
      <div className={classes.switchContent} />
    </div>
  );
};

export default Switch;
