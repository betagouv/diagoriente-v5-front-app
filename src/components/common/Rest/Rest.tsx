import React from 'react';
import Close from 'assets/images/close.svg';
import useStyles from './styles';

interface Props {
  color: string;
  label?: string;
  onClick?: () => void;
  size?: number;
}
const RestLogo = ({
  color, label, onClick, size,
}: Props) => {
  const classes = useStyles({ color, size });
  return (
    <div className={classes.container} onClick={onClick}>
      {label && <div className={classes.subTitle}>{label}</div>}
      <div className={classes.root}>
        <img src={Close} alt="close" width={size && size / 3} height={size && size / 3} />
      </div>
    </div>
  );
};

export default RestLogo;
