import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from 'assets/svg/diagoriente_logo.svg';
import DrawerContext from 'contexts/DrawerContext';
import UserContext from 'contexts/UserContext';
import menu from 'assets/images/menu.png';
import close from 'assets/svg/close.svg';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const PrivateHeader = () => {
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);
  const { user } = useContext(UserContext);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.flexCenter}>
          <img src={open ? close : menu} alt="menu" height={20} className={classes.menuIcon} onClick={toggle} />
          <Link to="/" className={classes.logoLink}>
            <img src={logo} alt="diagoriente_logo" height={44} />
          </Link>
        </div>
        <div className={classes.flexCenter}>
          <span className={classes.typography}>
            {user?.profile.firstName}
            {user?.profile.lastName}
          </span>
          <img src={user?.logo} alt="" height={39} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateHeader;
