import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Select from 'components/inputs/Select/Select';
import DrawerContext from 'contexts/DrawerContext';
import logo from 'assets/svg/diagoriente_logo.svg';
import beta from 'assets/images/marianne.png';
import betaGouv from 'assets/images/beta_gov.png';
import menu from 'assets/images/menu.png';
import useStyles from './styles';

export const links = [
  { text: 'Qui sommes nous?', path: '/Who' },
  { text: 'Actualités', path: '/News' },
  { text: 'DiagOvidéo', path: '/DiagOvidéo' },
  { text: 'Statistiques', path: '/Statistics' },
  { text: 'FAQ', path: '/FAQ' },
];

const PublicHeader = () => {
  const { open, setOpen } = useContext(DrawerContext);

  const toggle = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const Links = (
    <div className={classes.headerRoot}>
      <ul className={classes.headerSection}>
        {links.map((e) => (
          <li key={e.path} className={classes.linkContainer}>
            <Link className={classes.link} to={e.path}>
              {e.text}
            </Link>
          </li>
        ))}
      </ul>
      <div className={classes.select}>
        <Select />
      </div>
    </div>
  );
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.flexCenter}>
          <img src={menu} alt="menu" height={26} className={classes.menuIcon} onClick={toggle} />
          <Link to="/" className={classes.logoLink}>
            <img src={logo} alt="diagoriente_logo" height={66} />
          </Link>
          <div className={classes.imageWrapper}>
            <div className={classes.square}>
              <img src={beta} alt="menu" height={35} width={72} />
            </div>
            <img src={betaGouv} alt="menu" height={13} width={80} className={classes.betaGov} />
          </div>
        </div>
        {Links}
      </Toolbar>
    </AppBar>
  );
};

export default PublicHeader;
