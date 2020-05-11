import React from 'react';
import Close from 'assets/images/close.svg';
import useStyles from './styles';

interface Props {
  color: string;
  label?: string;
}
const RestLogo = ({ color, label }: Props) => {
  const classes = useStyles({ color });
  return (
    <div className={classes.container}>
      <div className={classes.subTitle}>{label}</div>
      <div className={classes.root}>
        <img src={Close} alt="close" />
      </div>
    </div>
  );
};

export default RestLogo;
