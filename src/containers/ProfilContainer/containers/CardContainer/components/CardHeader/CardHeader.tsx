import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import betaGouv from 'assets/images/marianne.png';
import useStyles from './styles';

interface CardHeaderProps {
  children?: React.ReactChild;
  infoUser?: { firstName: string; lastName: string };
}

const CardHeader = ({ children, infoUser }: CardHeaderProps) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  let userInfo = (
    <div className={classes.userInfo}>
      <div className={classes.userName}>
        {infoUser ? (
          <>
            {infoUser.firstName} {infoUser.lastName}
          </>
        ) : (
          <>
            {' '}
            {user?.profile.firstName} {user?.profile.lastName}
          </>
        )}
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
        <img width={100} src={betaGouv} alt="betaGov" />
      </div>
    </div>
  );
};

export default CardHeader;
