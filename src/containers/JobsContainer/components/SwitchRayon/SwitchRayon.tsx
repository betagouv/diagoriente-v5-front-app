import React from 'react';
import useStyle from './styles';

interface IProps {
  checked: string;
  onClick: (k: string) => void;
}
const SwitchRayon = ({ checked, onClick }: IProps) => {
  const classes = useStyle({ checked });
  return (
    <div className={classes.root}>
      <div className={classes.km} onClick={() => onClick('km')}>
        Km
      </div>
      <div className={classes.min} onClick={() => onClick('min')}>
        min
      </div>
    </div>
  );
};

export default SwitchRayon;
