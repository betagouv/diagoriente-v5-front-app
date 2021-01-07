import React, { useContext, useEffect } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from 'components/button/Button';
import List from '@material-ui/core/List';
import { useLocation, matchPath } from 'react-router-dom';
import localforage from 'localforage';
import DrawerContext from 'contexts/DrawerContext';
import parcoursContext from 'contexts/ParcourContext';
import Img from 'assets/images/fleche_fu.png';
import userContext from 'contexts/UserContext';
import { setAuthorizationBearer, client } from 'requests/client';
import classNames from 'utils/classNames';
import { useUpdateParcour } from 'requests/parcours';

import useStyles from './styles';

const PrivateDrawer = () => {
  const p = process.env.REACT_APP_PUBLIC_URL;
  const f = process.env.REACT_APP_FRONT;
  const userLinks = [
    { text: 'TABLEAU DE BORD', path: '/' },
    { text: 'AIDE', path: `${p}campus2023/` },
    { text: 'FAQ', path: `${p}faq/` },
    { text: 'DÉCONNEXION', path: '/' },
  ];

  const adminLinks = [
    { text: 'Thèmes', path: '/admin/themes' },
    { text: 'Activités', path: '/admin/activities' },
    { text: 'Contextes', path: '/admin/contexts' },
    { text: 'Compétences', path: '/admin/competences' },
    { text: 'Institution', path: '/admin/institution' },
    { text: 'Options', path: '/admin/options' },
    { text: 'Questions', path: '/admin/questions' },
    { text: 'Utilisateurs', path: '/admin/users' },
    { text: 'DÉCONNEXION', path: '/' },
  ];

  const advisorLinks = [
    { text: 'Parcours', path: '/advisor/parcours' },
    { text: 'DÉCONNEXION', path: '/' },
  ];
  const { setParcours, parcours } = useContext(parcoursContext);
  const { setUser, user } = useContext(userContext);
  const location = useLocation();
  const isJobs = Boolean(matchPath(location.pathname, { path: '/jobs', exact: true }));
  const classes = useStyles({ isCampus: user?.isCampus && user?.role === 'user' });
  const [updateCompleteCall, updateCompeteState] = useUpdateParcour();
  const { open, setOpen } = useContext(DrawerContext);
  const logout = () => {
    localforage.removeItem('auth');
    setAuthorizationBearer('');
    setParcours(null);
    setUser(null);
    localStorage.clear();
    client.clearStore();
  };

  const onClose = () => {
    setOpen(false);
  };

  /* const links = user?.role === 'user' ? userLinks : adminLinks; */
  let links = [];
  switch (user?.role) {
    case 'advisor': {
      links = advisorLinks;
      break;
    }
    case 'user': {
      links = userLinks;
      break;
    }
    case 'admin': {
      links = adminLinks;
      break;
    }
    default: {
      links = userLinks;
    }
  }
  if (user?.role === 'advisor' && user?.email === 'drcampus2023@diagoriente.fr' && user?.isCampus) {
    advisorLinks.splice(advisorLinks.length - 1, 0, {
      text: 'Map',
      path: `${f}/campus2023-livemap`,
    });
  }
  if (user?.role === 'admin') {
    adminLinks.splice(advisorLinks.length - 1, 0, {
      text: 'Map',
      path: `${f}/campus2023-livemap`,
    });
  }
  useEffect(() => {
    if (!parcours?.completed && isJobs) {
      setOpen(true);
    }
  }, [parcours, setOpen, isJobs]);

  const onSubmit = () => {
    setOpen(false);
    if (!parcours?.completed) {
      updateCompleteCall({ variables: { completed: true } });
    }
  };

  useEffect(() => {
    if (updateCompeteState.data) {
      setParcours(updateCompeteState.data.updateParcour);
    }
  }, [updateCompeteState.data, setParcours]);

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="top"
        open={open}
        classes={{
          paper: classes.drawerPaper,
          root: classes.root,
        }}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={onClose}
      >
        <div className={classes.toolbar} />
        <List className={classes.root}>
          {links.map((e) => (
            <li key={e.text} className={classes.linkContainer} onClick={e.text === 'DÉCONNEXION' ? logout : () => {}}>
              <a href={e.path} target={e.text === 'AIDE' || e.text === 'FAQ' ? '_blank' : ''}>
                <div
                  className={classNames(
                    isJobs && !user?.isCampus ? classes.linkJob : classes.link,
                    !parcours?.completed && isJobs && e.text === 'TABLEAU DE BORD' && classes.firstUseLink,
                  )}
                >
                  {e.text}
                </div>
              </a>
            </li>
          ))}
        </List>
      </Drawer>
      {!parcours?.completed && isJobs && open && (
        <div
          style={{
            position: 'absolute',
            top: 65,
            left: 200,
            zIndex: 9999,
            display: 'flex',
          }}
        >
          <div>
            <img alt="" src={Img} />
          </div>
          <div>
            <div className={classes.textMsg}>
              Pour compléter ton profil et retrouver à tout moment toutes tes informations, rends toi dans ton tableau
              de bord, accessible via le menu.
            </div>
            <Button className={classes.btn} onClick={onSubmit}>
              <div className={classes.btnLabel}>Compris !</div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default PrivateDrawer;
