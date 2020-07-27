import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import betaGouv from 'assets/svg/logo-beta.gouv 3.svg';
import useStyles from './styles';

interface CardHeaderProps {
  children?: React.ReactChild;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  let userInfo = (
    <div className={classes.userInfo}>
      <div className={classes.userName}>
        {user?.profile.firstName}
        {' '}
        {user?.profile.lastName}
      </div>
      {user?.location}
    </div>
  );
  if (children) {
    userInfo = (
      <div className={classes.userInfo}>
        {children}
        {userInfo}
      </div>
    );
  }

  return (
    <div className={classes.cardHeader}>
      {userInfo}
      <div className={classes.appInfo}>
        <img className={classes.appLogo} height={65} src={logo} alt="logo" />
        <img height={55} src={betaGouv} alt="betaGov" />
      </div>
    </div>
  );
};

export default CardHeader;
