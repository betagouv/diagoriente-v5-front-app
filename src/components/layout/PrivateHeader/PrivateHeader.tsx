import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from 'assets/svg/diagoriente_logo.svg';
import userLogo from 'assets/images/user_icon.png';
import DrawerContext from 'contexts/DrawerContext';
import menu from 'assets/images/menu.png';
import close from 'assets/svg/close.svg';
import useStyles from './styles';

const PrivateHeader = () => {
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.flexCenter}>
          <img src={open ? menu : close} alt="menu" height={20} className={classes.menuIcon} onClick={toggle} />
          <img src={logo} alt="diagoriente_logo" height={44} />
        </div>
        <div className={classes.flexCenter}>
          <Typography variant="h6" noWrap className={classes.typography}>
            Lena M
          </Typography>
          <img src={userLogo} alt="user_logo" height={39} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateHeader;
