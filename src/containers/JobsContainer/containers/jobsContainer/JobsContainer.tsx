import React from 'react';
import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/Title/Title';
import useStyles from './styles';

const JobsContainer = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.logoContainer}>
          <img src={Logo} alt="log" />
        </div>
        <Title title="MON TOP METIER" font="ocean" size={42} color="#DB8F00" className={classes.title} />
      </div>
      <div className={classes.subTitle}>Sélectionnés en fonction de tes réponses</div>
      <div className={classes.filtersContainer}>
        <div>filter:</div>
      </div>
    </div>
  );
};

export default JobsContainer;
