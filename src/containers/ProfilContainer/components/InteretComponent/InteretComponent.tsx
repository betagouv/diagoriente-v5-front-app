import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import parcoursContext from 'contexts/ParcourContext';
import Title from 'components/common/Title/Title';
import InterestContainer from 'containers/InteretContainer/components/InterestContainer/InterestContainer';
import Button from 'components/button/Button';
import Arrow from '../Arrow/Arrow';

import useStyles from './styles';

const InteretComponent = () => {
  const { parcours } = useContext(parcoursContext);
  const classes = useStyles();

  return (
    <div className={classes.InteretContainer}>
      <div className={classes.titleContainer}>
        <Arrow />
        <Title title="MES CENTRES D’INTÉRÊT" color="#420FAB" size={42} className={classes.title} />
        <div className={classes.empty} />
      </div>
      <span className={classes.text}>Liste des centres d’intérêt que tu as sélectionnés et classés.</span>
      <div className={classes.interestCardContainer}>
        {parcours?.families.map((family, index) => (
          <div key={family.id} className={classes.interestGrid}>
            <InterestContainer
              index={index + 1}
              key={family.id}
              height={222 - index * 20}
              marginTop={71 - index * 20}
              famille={family}
              className={classes.rootClassName}
              resetClassName={classes.hideReset}
              circleClassName={classes.circleClassName}
              containerClassName={classes.containerClassName}
              textFamilleClassName={classes.textFamille}
            />
          </div>
        ))}
      </div>
      <Link to="/interet/parcours?profile=true">
        <Button className={classes.btn}>
          <span className={classes.textButton}>Je modifie mes centres d’intérêt</span>
        </Button>
      </Link>
    </div>
  );
};
export default InteretComponent;
