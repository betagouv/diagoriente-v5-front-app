import React, { useContext } from 'react';
import arrow from 'assets/svg/arrw.svg';
import classNames from 'utils/classNames';

import ThemeContext from 'contexts/ThemeContext';

import useStyles from './styles';

const PrivateHeader = (props: any) => {
  const classes = useStyles();
  const { open, setOpen } = useContext(ThemeContext);
  const { children } = props;
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.appBar}>
      <div className={classes.container}>
        <p className={classes.titleSelection}>Ta sélection</p>
        <img
          src={arrow}
          alt="menu"
          height={12}
          className={classNames(classes.menuIcon, !open ? classes.menuIconClosed : undefined)}
          onClick={toggle}
        />
      </div>
      {open && <div className={classes.childrenSelection}>{children}</div>}
    </div>
  );
};

export default PrivateHeader;
