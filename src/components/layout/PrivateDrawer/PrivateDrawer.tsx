import React, { useContext, useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import DrawerContext from 'contexts/DrawerContext';
import parcoursContext from 'contexts/ParcourContext';
import userContext from 'contexts/UserContext';

import { useListener } from 'hooks/useListener';
import useStyles from './styles';

export const links = [
  { text: 'MON DASHBOARD', path: '/' },
  { text: 'MES EXPERIENCES', path: '/experience' },
  { text: "MES CENTRES D'INTERETS", path: '/interet' },
  { text: 'MES PISTES METIERS', path: '/jobs' },
  { text: 'MA CARTE DE COMPETENCE', path: '/' },
  { text: 'MES DEMARCHES', path: '/' },
  { text: 'Aide', path: '/' },
  { text: 'FAQ', path: '/' },
  { text: 'DECONEXION', path: '/' },
];

const PrivateDrawer = () => {
  const classes = useStyles();
  const [variant, setVariant] = useState<'persistent' | 'temporary'>(
    window.innerWidth < 768 ? 'temporary' : 'persistent',
  );
  const { open, setOpen } = useContext(DrawerContext);
  const { setParcours } = useContext(parcoursContext);
  const { setUser } = useContext(userContext);

  const logout = () => {
    localforage.setItem('auth', {});
    setParcours(null);
    setUser(null);
  };
  useListener('resize', () => {
    const nextVariant = window.innerWidth < 768 ? 'temporary' : 'persistent';
    if (nextVariant !== variant) setVariant(nextVariant);
  });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant={variant}
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
          <li key={e.text} className={classes.linkContainer} onClick={e.text === 'DECONEXION' ? logout : () => {}}>
            <Link className={classes.link} to={e.path}>
              {e.text}
            </Link>
          </li>
        ))}
      </List>
    </Drawer>
  );
};
export default PrivateDrawer;
