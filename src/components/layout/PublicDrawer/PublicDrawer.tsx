import React, { useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Select from 'components/inputs/Select/Select';
import beta from 'assets/images/marianne.png';
import betaGouv from 'assets/images/beta_gov.png';
import DrawerContext from 'contexts/DrawerContext';
import logo from 'assets/svg/diagoriente_logo.svg';

import useStyles from './styles';

const Sidebar = () => {
  const p = process.env.REACT_APP_PUBLIC_URL;
  const links = [
    { text: 'Qui sommes nous?', path: `${p}/info/` },
    { text: 'Notre démarche', path: `${p}/approach/` },
    { text: 'Actualités', path: `${p}/actualites/` },
    // { text: 'vidéo', path: '/DiagOvidéo' },
    { text: 'FAQ', path: `${p}/faq/` },
  ];
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
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
      <img src={logo} alt="diagoriente_logo" height={66} />
      <List className={classes.root}>
        {links.map((e) => (
          <li key={e.path} className={classes.linkContainer}>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a className={classes.link} href={e.path} target="_blank">
              {e.text}
            </a>
          </li>
        ))}

        <Select />
        <div className={classes.imageWrapper}>
          <div className={classes.square}>
            <img src={beta} alt="menu" width={80} />
          </div>
          <img src={betaGouv} alt="menu" width={100} className={classes.betaGov} />
        </div>
      </List>
    </Drawer>
  );
};
export default Sidebar;
