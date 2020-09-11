import React, { useContext, useState, useMemo, useCallback } from 'react';
import UserContext from 'contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import defaultAvatar from 'assets/svg/defaultAvatar.svg';
import IlluMeConnaitre from 'assets/images/illu_dashboard_se_connaitre.png';
import IlluMeProtejer from 'assets/images/illu_dashboard_se_projeter.png';
import IlluMengager from 'assets/images/illu_dashboard_sengager.png';
import blueLine from 'assets/svg/trait_bleu_tres_fonce.svg';
import yellowLine from 'assets/svg/trait_jaune_fonce.svg';
import pinkLine from 'assets/svg/trait_rose.svg';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Avatar from '@material-ui/core/Avatar/Avatar';
import DashboardStep from 'components/ui/DashboardStep/DashboardStep';
import Button from '@material-ui/core/Button/Button';

import classNames from 'utils/classNames';

import useStyles from './styles';

const HomeCompleted = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(-1);
  const [openModal, setOpenModal] = useState(false);

  const getState = (index: number) => {
    switch (open) {
      case index:
        return 'open';
      case -1:
        return 'initial';
      default:
        return 'closed';
    }
  };
  const onClickItem = (t: string, p?: string) => {
    if (t === 'MES DÉMARCHES') {
      setOpenModal(true);
    }
    if (p) history.push(`${p}`);
  };
  const renderContentItem = useCallback(
    (
      title: string,
      description: string,
      c: { path?: string; buttonClassName?: string; descriptionClassName?: string } = {},
    ) => (
      <div className={classes.itemContainer}>
        {/* <Link className={classes.itemLink} to={c.path || ''}>
          <Button className={classNames(classes.itemButton, c.buttonClassName)}>{title}</Button>
        </Link> */}
        <div className={classes.itemLink} onClick={() => onClickItem(title, c.path)}>
          <Button className={classNames(classes.itemButton, c.buttonClassName)}>{title}</Button>
        </div>
        <p className={classNames(classes.itemDescription, c.descriptionClassName)}>{description}</p>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classes],
  );

  const dashboardContent = useMemo(
    () => [
      {
        title: 'ME CONNAÎTRE',
        titleBackground: blueLine,
        background: '#4D6EC5',
        image: IlluMeConnaitre,
        initialChildren: (
          <div className={classes.contentChild}>
            Identifier mes <span className={classes.bold}>compétences</span>
            <br /> et explorer mes <span className={classes.bold}>intérêts</span>
          </div>
        ),
        openChildren: (
          <div className={classes.firstContent}>
            {renderContentItem(
              'MES EXPÉRIENCES',
              // eslint-disable-next-line
              "Complète tes expériences, qu'elles soient professionnelles ou personnelles, puis évalue tes compétences.",
              { path: '/experience', buttonClassName: classes.blue },
            )}
            {renderContentItem(
              'MES CENTRES D’INTÉRÊT',
              // eslint-disable-next-line
              "Sélectionne tes centres d'intérêt. Aimes-tu plutôt être dehors, travailler en équipe, manipuler des outils... ?",
              { path: '/interet', buttonClassName: classes.purple },
            )}
          </div>
        ),
      },
      {
        title: 'ME PROJETER',
        titleBackground: yellowLine,
        background: '#FFA600',
        image: IlluMeProtejer,
        initialChildren: (
          <div className={classNames(classes.contentChild, classes.black)}>
            Découvrir des <span className={classes.bold}>métiers</span> et identifier mon{' '}
            <span className={classes.bold}>idéal professionnel</span>
          </div>
        ),
        openChildren: renderContentItem(
          'MES PISTES MÉTIERS',
          // eslint-disable-next-line
          "Dès que tu auras rempli tes expériences et tes centres d'intérêt, explore des métiers qui te correspondent.",
          { path: '/jobs', descriptionClassName: classes.black },
        ),
      },
      {
        title: 'M’ENGAGER',
        titleBackground: pinkLine,
        background: '#D60051',
        image: IlluMengager,
        initialChildren: (
          <div className={classes.contentChild}>
            Faire mes <span className={classes.bold}>choix</span> et identifier des{' '}
            <span className={classes.bold}>entreprises</span> à contacter
          </div>
        ),
        openChildren: renderContentItem('MES DÉMARCHES', 'Gère tes démarches avec les entreprises qui t’intéressent.'),
      },
    ],
    [classes, renderContentItem],
  );

  return (
    <>
      <div className={classes.container}>
        <div className={classes.profileHeader}>MON PROFIL</div>
        <Avatar className={classes.logo} src={user?.logo ? user?.logo : defaultAvatar} />
        <div className={classes.info}>Ma carte de compétences, mes infos..</div>
        <Link className={classes.link} to="/profile">
          Voir mon profil
        </Link>
        <div className={classes.content}>
          {dashboardContent.map((content, index) => (
            <DashboardStep
              key={content.title}
              onClick={() => setOpen(open === index ? -1 : index)}
              {...content}
              state={getState(index)}
            />
          ))}
        </div>
      </div>
      <ModalContainer
        open={openModal}
        handleClose={() => setOpenModal(false)}
        backdropColor="#011A5E"
        colorIcon="#D60051"
      >
        <div className={classes.textModal}>Cette fonctionnalité arrive bientôt</div>
      </ModalContainer>
    </>
  );
};

export default HomeCompleted;
