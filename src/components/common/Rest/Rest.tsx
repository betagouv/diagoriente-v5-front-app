import React from 'react';
import Close from 'assets/images/close.svg';
import useStyles from './styles';

interface Props {
  color: string;
  label?: string;
  onClick?: () => void;
}
const RestLogo = ({ color, label, onClick }: Props) => {
  const classes = useStyles({ color });
  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.subTitle}>{label}</div>
      <div className={classes.root}>
        <img src={Close} alt="close" />
      </div>
    </div>
  );
};

export default RestLogo;
