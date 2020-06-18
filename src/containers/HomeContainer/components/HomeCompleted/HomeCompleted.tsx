import React, {
 useContext, useState, useMemo, useCallback,
} from 'react';
import UserContext from 'contexts/UserContext';
import { Link } from 'react-router-dom';
import defaultAvatar from 'assets/svg/defaultAvatar.svg';

import Avatar from '@material-ui/core/Avatar/Avatar';
import DashboardStep from 'components/ui/DashboardStep/DashboardStep';
import Button from '@material-ui/core/Button/Button';

import classNames from 'utils/classNames';

import experienceImage from 'assets/images/experience.png';

import useStyles from './styles';

const HomeCompleted = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(-1);

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

  const renderContentItem = useCallback(
    (
      title: string,
      description: string,
      c: { path?: string; buttonClassName?: string; descriptionClassName?: string } = {},
    ) => (
      <div className={classes.itemContainer}>
        <Link className={classes.itemLink} to={c.path || ''}>
          <Button className={classNames(classes.itemButton, c.buttonClassName)}>{title}</Button>
        </Link>
        <p className={classNames(classes.itemDescription, c.descriptionClassName)}>{description}</p>
      </div>
    ),
    [classes],
  );

  const dashboardContent = useMemo(
    () => [
      {
        title: 'ME CONNAITRE',
        background: '#4D6EC5',
        image: experienceImage,
        initialChildren: (
          <div className={classes.contentChild}>
            Identifier mes
            {' '}
            <span className={classes.bold}>compétences</span>
            {' '}
            et explorer mes
            {' '}
            <span className={classes.bold}>intérêts</span>
          </div>
        ),
        openChildren: (
          <div className={classes.firstContent}>
            {renderContentItem(
              'MES EXPERIENCES',
              "Complète tes expériences, qu'elles soient professionnelles ou personnelles, puis évalue tes compétences",
              { path: '/experience', buttonClassName: classes.blue },
            )}
            {renderContentItem(
              'MES CENTRES D’INTERÊT',
              // eslint-disable-next-line
              "Sélectionne tes centres d'intérêts. Aimes-tu plutôt être dehors, travailler seul.e, manipuler des outils... ?",
              { path: '/interet', buttonClassName: classes.purple },
            )}
          </div>
        ),
      },
      {
        title: 'ME PROJETER',
        background: '#FFA600',
        initialChildren: (
          <div className={classNames(classes.contentChild, classes.contentChildBlack)}>
            Découvrir des
            {' '}
            <span className={classes.bold}>métiers</span>
            {' '}
            et identifier mon
            {' '}
            <span className={classes.bold}>idéal professionnel</span>
          </div>
        ),
        openChildren: renderContentItem(
          'MES PISTES METIER',
          // eslint-disable-next-line
          "Dès que tu auras rempli tes expériences et tes centres d'intérêts, nous te proposerons des métiers qui te correspondent",
          { path: '/jobs', descriptionClassName: classes.black },
        ),
      },
      {
        title: 'M’ENGAGER',
        background: '#D60051',
        initialChildren: (
          <div className={classes.contentChild}>
            Faire mes
            {' '}
            <span className={classes.bold}>choix</span>
            {' '}
            et identifier des
            {' '}
            <span className={classes.bold}>entreprises</span>
            {' '}
            à contacter
          </div>
        ),
        openChildren: renderContentItem('MES DEMARCHES', 'Gère tes démarches avec les entreprises'),
      },
    ],
    [classes, renderContentItem],
  );

  return (
    <div className={classes.container}>
      <div className={classes.profileHeader}>MON PROFIL</div>
      <Avatar
        className={classes.logo}
        src={
          user?.logo
            ? user?.logo
            : defaultAvatar
        }
      />
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
  );
};

export default HomeCompleted;
