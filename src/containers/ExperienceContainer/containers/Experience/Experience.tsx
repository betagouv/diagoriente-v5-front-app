import React, { useContext, useState, useEffect } from 'react';
import parcourContext from 'contexts/ParcourContext';
import Title from 'components/common/TitleImage/TitleImage';
import blueline from 'assets/svg/blueline.svg';
import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';
import ModalContainer from 'components/common/Modal/ModalContainer';
import GameContainer from 'containers/HomeContainer/components/Modals/KItchenGame/Game';
import IlluExpPerso from 'assets/images/illu_xp_perso.png';
import IlluExpPro from 'assets/images/illu_xp_pro.png';

import help from 'assets/svg/help.svg';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Experience = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { parcours } = useContext(parcourContext);

console.log('parcours', parcours)

  useEffect(() => {
    if (!parcours?.played) openModal();
  }, [parcours]);
  return (
    <div className={classes.container}>
      <Title title="MES EXPERIENCES" image={blueline} color="#223A7A" />
      <p className={classes.title}>
        Nous apprenons de toutes nos expériences. 
        <br />
        Ajoute à ton profil tes expériences,
        <br />
        quel que soit le domaine.
      </p>
      <div className={classes.root}>
        <div className={classes.circleContainer}>
          <Avatar
            title="Ajouter une"
            size={200}
            titleClassName={classes.marginTitle}
            avatarCircleBackground="transparent"
            circleClassName={classes.circleStyle}
          >
            <img src={IlluExpPerso} alt="" className={classes.illus} />
          </Avatar>
          <Link to="/experience/theme">
            <Button childrenClassName={classes.margin} className={classes.btnperso} type="submit">
              <div className={classes.btnLabel}>Expérience perso </div>
            </Button>
          </Link>
        </div>
        <div>
          <div className={classes.circleContainer}>
            <Avatar
              title="Ajouter une"
              size={200}
              titleClassName={classes.marginTitle}
              avatarCircleBackground="transparent"
              circleClassName={classes.circleStyle}
            >
              <img src={IlluExpPro} alt="" className={classes.illus} />
            </Avatar>
            <Link to="/experience/theme-pro" className={classes.hideLine}>
              <Button childrenClassName={classes.margin} className={classes.btnpro} type="submit">
                <div className={classes.btnLabel}>Expérience pro</div>
              </Button>
            </Link>
          </div>
        </div>
        <div className={classes.circleContainer}>
          <Avatar title="Ajouter une" size={200} titleClassName={classes.marginTitle} />
          <Link to="/experience/theme?type=engagement" className={classes.hideLine}>
            <Button childrenClassName={classes.margin} className={classes.btnpro} type="submit">
              <div className={classes.btnLabel}>Expérience d'engagement</div>
            </Button>
          </Link>
        </div>
      </div>
      <div className={classes.help}>
        <img src={help} alt="help" />
      </div>

      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#4D6EC5" size={70}>
        <GameContainer onHandelClose={handleClose} />
      </ModalContainer>
    </div>
  );
};

export default Experience;
