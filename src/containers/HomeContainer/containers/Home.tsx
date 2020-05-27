import React from 'react';
import Logo from 'assets/svg/logoHome.svg';
import Box from '../components/Box/Box';
import useStyles from './style';

const FirstDashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>BIENVENU SUR</div>
            <img src={Logo} alt="logo" className={classes.image} />
          </div>
          <Box
            title="MES EXPERIENCES"
            subTitle="Commence par complèter tes expériences, pros et/ou persos."
            color="#4D6EC5"
            link="/experience"
          />
        </div>
      </div>
    </div>
  );
};

export default FirstDashboard;
