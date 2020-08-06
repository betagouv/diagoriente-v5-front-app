import React, { useContext, useEffect, useRef } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from 'components/button/Button';
import List from '@material-ui/core/List';
import { Link, useLocation } from 'react-router-dom';
import localforage from 'localforage';
import DrawerContext from 'contexts/DrawerContext';
import parcoursContext from 'contexts/ParcourContext';
import Img from 'assets/images/fleche_fu.png';
import userContext from 'contexts/UserContext';
import { setAuthorizationBearer, client } from 'requests/client';
import classNames from 'utils/classNames';

import useStyles from './styles';

export const userLinks = [
  { text: 'TABLEAU DE BORD', path: '/' },
  { text: 'Aide', path: '/' },
  { text: 'FAQ', path: '/' },
  { text: 'DÉCONNEXION', path: '/' },
];

const adminLinks = [
  { text: 'Thèmes', path: '/admin/themes' },
  { text: 'DÉCONNEXION', path: '/' },
];

const PrivateDrawer = () => {
  const location = useLocation();
  const path = location.pathname.split(/[//]/)[1];
  const classes = useStyles();
  /* const [variant, setVariant] = useState<'persistent' | 'temporary'>(
    window.innerWidth < 768 ? 'temporary' : 'persistent',
  ); */
  const { open, setOpen } = useContext(DrawerContext);
  const { setParcours, parcours } = useContext(parcoursContext);
  const { setUser, user } = useContext(userContext);
  const ParcourRef = useRef(parcours?.completed);
  const logout = () => {
    localforage.removeItem('auth');
    setAuthorizationBearer('');
    setParcours(null);
    setUser(null);
    localStorage.clear();
    client.clearStore();
  };
  /* useListener('resize', () => {
    const nextVariant = window.innerWidth < 768 ? 'temporary' : 'persistent';
    if (nextVariant !== variant) setVariant(nextVariant);
  });
*/
  const onClose = () => {
    setOpen(false);
  };
  const links = user?.role === 'user' ? userLinks : adminLinks;
  useEffect(() => {
    if (!ParcourRef.current) {
      if (parcours?.completed) {
        setOpen(true);
      }
    }
  }, [parcours?.completed, setOpen, parcours]);

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
              <Link to={e.path}>
                <div
                  className={classNames(
                    path === 'jobs' ? classes.linkJob : classes.link,
                    !ParcourRef.current && parcours?.completed && e.text === 'MON DASHBOARD' && classes.firstUseLink,
                  )}
                >
                  {e.text}
                </div>
              </Link>
            </li>
          ))}
        </List>
      </Drawer>
      {!ParcourRef.current && parcours?.completed && open && (
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
              Pour compléter ton profil et retrouver à tout moment toutes tes informations, rend toi dans ton tableau de
              bord, accessible via le menu.
            </div>
            <Button className={classes.btn} onClick={() => setOpen(false)}>
              <div className={classes.btnLabel}>Compris !</div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default PrivateDrawer;
