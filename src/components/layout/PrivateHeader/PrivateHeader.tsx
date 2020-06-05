import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from 'assets/svg/diagoriente_logo.svg';
import DrawerContext from 'contexts/DrawerContext';
import UserContext from 'contexts/UserContext';
import menu from 'assets/images/menu.png';
import close from 'assets/svg/close.svg';

import classNames from 'utils/classNames';

import useStyles from './styles';

export interface Props {
  openLogoIcon: string;
  closeLogoIcon: string;
  openIcon: string;
  closeIcon: string;
  className?: string;
  showUser: boolean;
}

const PrivateHeader = ({
 openLogoIcon, closeLogoIcon, openIcon, closeIcon, className, showUser,
}: Props) => {
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);
  const { user } = useContext(UserContext);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <AppBar position="fixed" className={classNames(classes.appBar, className)}>
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.flexCenter}>
          <img src={open ? closeIcon : openIcon} alt="menu" height={20} className={classes.menuIcon} onClick={toggle} />
          <Link to="/">
            <img src={open ? openLogoIcon : closeLogoIcon} alt="diagoriente_logo" height={44} />
          </Link>
        </div>
        {showUser && (
          <div className={classes.flexCenter}>
            <span className={classes.typography}>
              {user?.profile.firstName}
              {' '}
              {user?.profile.lastName}
            </span>
            <img src={user?.logo} alt="" height={39} />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

PrivateHeader.defaultProps = {
  openLogoIcon: logo,
  closeLogoIcon: logo,
  openIcon: menu,
  closeIcon: close,
  showUser: true,
};

export default PrivateHeader;
