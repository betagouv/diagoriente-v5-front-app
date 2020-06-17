import React, { useContext } from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import DrawerContext from 'contexts/DrawerContext';
import parcoursContext from 'contexts/ParcourContext';
import userContext from 'contexts/UserContext';

import useStyles from './styles';

export const links = [
  { text: 'MON DASHBOARD', path: '/' },
  { text: 'Aide', path: '/' },
  { text: 'FAQ', path: '/' },
  { text: 'DÉCONNEXION', path: '/' },
];

const PrivateDrawer = () => {
  const classes = useStyles();
  /* const [variant, setVariant] = useState<'persistent' | 'temporary'>(
    window.innerWidth < 768 ? 'temporary' : 'persistent',
  ); */
  const { open, setOpen } = useContext(DrawerContext);
  const { setParcours } = useContext(parcoursContext);
  const { setUser } = useContext(userContext);

  const logout = () => {
    localforage.removeItem('auth');
    setParcours(null);
    setUser(null);
    localStorage.clear();
  };
  /* useListener('resize', () => {
    const nextVariant = window.innerWidth < 768 ? 'temporary' : 'persistent';
    if (nextVariant !== variant) setVariant(nextVariant);
  });
*/
  const onClose = () => {
    setOpen(false);
  };

  return (
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
