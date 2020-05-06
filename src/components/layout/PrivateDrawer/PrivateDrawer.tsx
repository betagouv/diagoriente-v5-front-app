import React, { useContext, useRef } from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import DrawerContext from 'contexts/DrawerContext';

import useStyles from './styles';

export const links = [
  { text: 'MON DASHBOARD', path: '/' },
  { text: 'MES EXPERIENCES', path: '/' },
  { text: "MES CENTRES D'INTERETS", path: '/' },
  { text: 'MES PISTES METIERS', path: '/' },
  { text: 'MA CARTE DE COMPETENCE', path: '/' },
  { text: 'MES DEMARCHES', path: '/' },
  { text: 'Aide', path: '/' },
  { text: 'FAQ', path: '/' },
];

const PrivateDrawer = () => {
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);
  const navRef = useRef<HTMLElement | null>(null);
  const onClose = () => {
    setOpen(false);
  };

  const test = window.innerWidth < 768 ? 'temporary' : 'persistent';

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List className={classes.root}>
        {links.map((e) => (
          <li className={classes.linkContainer}>
            <Link className={classes.link} to={e.path}>
              {e.text}
            </Link>
          </li>
        ))}
      </List>
    </>
  );
  return (
    <nav aria-label="mailbox folders" className={classes.drawerPaper} ref={navRef}>
      <Drawer
        variant={test}
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
        {drawer}
      </Drawer>
    </nav>
  );
};
export default PrivateDrawer;
