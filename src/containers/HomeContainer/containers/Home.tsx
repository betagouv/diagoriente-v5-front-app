import React, { useContext, useState } from 'react';
import Logo from 'assets/svg/logoHome.svg';
import UserContext from 'contexts/UserContext';
import ParcoursContext from 'contexts/ParcourContext';
import logoInterest from 'assets/svg/interest.svg';
import logoJobs from 'assets/svg/logoJobs.svg';
import ModalContainer from 'components/common/Modal/ModalContainer';
import GameContainer from '../components/Modals/KItchenGame/Game';
import Box from '../components/Box/Box';
import BoxType from '../components/BoxType/BoxType';
import useStyles from './style';

const FirstDashboard = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { parcours } = useContext(ParcoursContext);

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const hasExp = parcours?.skills.length !== 0;
  const hasFamilies = parcours?.families.length !== 0;
  let dataToShow: { title: string; subTitle: string; logo?: string; color: string; link: string; colorText: string } = {
    title: 'MES EXPERIENCES',
    subTitle: 'Commence par complèter tes expériences, pros et/ou persos.',
    logo: '',
    color: '#223A7A',
    link: '/experience',
    colorText: '#4D6EC5',
  };
  if (hasExp) {
    dataToShow = {
      title: 'MES CENTRES D’INTERET',
      subTitle: 'Complète maintenant ce que tu aimes faire',
      logo: logoInterest,
      color: '#420FAB',
      link: '/interet',
      colorText: '#420FAB',
    };
  }
  if (hasExp && hasFamilies) {
    dataToShow = {
      title: 'MES PISTES METIER',
      subTitle: 'Découvre maintenant les métiers que nous avons sélectionné pour toi',
      logo: logoJobs,
      color: '#DB8F00',
      link: '/jobs',
      colorText: '#DB8F00',
    };
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>BIENVENU SUR</div>
            <img src={Logo} alt="logo" className={classes.image} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.types}>
              {hasExp && <BoxType title="MES EXPERIENCES" color="#00CFFF" />}
              {hasFamilies && <BoxType title="MES CENTRES D’INTERET" color="#7533FF" />}
            </div>
            <Box
              title={dataToShow.title}
              subTitle={dataToShow.subTitle}
              color={dataToShow.color}
              link={dataToShow.link}
              logo={dataToShow.logo}
              colorText={dataToShow.colorText}
            />
            <div className={classes.types} />
          </div>
        </div>
      </div>
      {!user?.played && (
        <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#4D6EC5" size={70}>
          <GameContainer />
        </ModalContainer>
      )}
    </div>
  );
};

export default FirstDashboard;
