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
import illExpEng from 'assets/images/illu_xp_engagement.png';
import Picto from 'assets/svg/picto_ampoule_blue.svg';
import { Link, useHistory } from 'react-router-dom';
import Game from '../Game/gameModal/GameModal';
import classNames from 'utils/classNames';
import useStyles from './styles';

// import help from 'assets/svg/help.svg';

const Experience = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openEng, setOpenEng] = useState(false);

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openModalEng = () => setOpenEng(true);
  const handleEngClose = () => setOpenEng(false);

  const { parcours } = useContext(parcourContext);

  useEffect(() => {
    if (!parcours?.played) openModal();
  }, [parcours]);

  const onClickEng = () => {
    const p = '/experience/theme?type=engagement';
    if (!parcours?.playedEng) {
      openModalEng();
    } else {
      history.push(p);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.boxInfo}>
        <div className={classes.boxInfoImg}>
          <img src={Picto} alt="" />
        </div>
        <div className={classes.boxInfoDescription}>
          <p className={classes.descriptionBoxInfo}>Familiarise toi avec les</p>
          <p className={classes.descriptionBoxInfo}>compétences grâce aux modules :</p>
        </div>
        <div>
          <div>
            <Link to="/experience/gameCard">
              <p className={classes.linkBoxInfo}>Rectec</p>
            </Link>
          </div>
          <div>
            <Link to="/experience/game">
              <p className={classes.linkBoxInfo}>Rectec Engagement</p>
            </Link>
          </div>
          <div>
            <Link to="/game">
              <p className={classes.linkBoxInfo}>Burger speed</p>
            </Link>
          </div>
        </div>
      </div>
      <Title title="MES EXPERIENCES" image={blueline} color="#223A7A" />
      <p className={classes.title}>
        Nous apprenons de toutes nos expériences.
        <br />
        Ajoute à ton profil tes expériences,
        <br />
        <p className={classes.textDescription}>quel que soit le domaine.</p>
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
          <Avatar
            title="Ajouter une"
            avatarCircleBackground="transparent"
            size={200}
            titleClassName={classes.marginTitle}
            circleClassName={classes.circleStyleEng}
          >
            <img src={illExpEng} alt="ill" className={classes.illus} />
          </Avatar>
          <div onClick={onClickEng} className={classes.hideLine}>
            <Button childrenClassName={classes.margin} className={classes.btnpro} type="submit">
              <div className={classes.btnLabel}>Expérience d'engagement</div>
            </Button>
          </div>
        </div>
      </div>
      {/* <div className={classes.help}>
        <img src={help} alt="help" />
      </div> */}

      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#4D6EC5" size={70}>
        <GameContainer onHandelClose={handleClose} />
      </ModalContainer>
      <ModalContainer open={openEng} handleClose={handleEngClose} backdropColor="#011A5E" colorIcon="#4D6EC5" size={70}>
        <Game />
      </ModalContainer>
    </div>
  );
};

export default Experience;
