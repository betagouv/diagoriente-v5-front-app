import React from 'react';
import { Link } from 'react-router-dom';
import mainInterest from 'assets/svg/mainInterest.svg';
import Button from 'components/button/Button';
import useStyle from './styles';

const MainInteret = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>COMMENT ÇA MARCHE ?</div>
      <div className={classes.title}>Travailler avec sa tête / avec ses mains / avec d’autres personnes</div>
      <div className={classes.imgContainer}>
        <img src={mainInterest} alt="" />
      </div>
      <div className={classes.textFooter}>Navigue dans les illustrations à droite et à gauche pour tout voir.</div>
      <div className={classes.textFooter}>Tu peux en sélectionner 5 maximum.</div>
      <div className={classes.btnContainer}>
        <Link to="/interet/parcours">
          <Button className={classes.btn}>Compris !</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainInteret;
