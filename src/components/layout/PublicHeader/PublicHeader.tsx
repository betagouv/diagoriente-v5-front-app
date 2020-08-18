import React, { useContext, useState } from 'react';
import { useListener } from 'hooks/useListener';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Select from 'components/inputs/Select/Select';
import DrawerContext from 'contexts/DrawerContext';

import logo from 'assets/svg/diagoriente_logo.svg';
import smallbeta from 'assets/svg/smallbeta.svg';
import beta from 'assets/images/marianne.png';
import betaGouv from 'assets/images/beta_gov.png';
import menu from 'assets/images/menu.png';

import useStyles from './styles';

export const links = [
  { text: 'Qui sommes nous?', path: '/Who' },
  { text: 'Notre démarche', path: '/demarche' },
  { text: 'Actualités', path: '/News' },
  { text: 'vidéo', path: '/DiagOvidéo' },
  { text: 'Statistiques', path: '/Statistics' },
  { text: 'FAQ', path: '/FAQ' },
];
const PublicHeader = () => {
  const { open, setOpen } = useContext(DrawerContext);
  const [showlogo, setShowLogo] = useState(window.innerWidth > 768 && window.innerWidth < 1280);
  const toggle = () => {
    setOpen(!open);
  };

  useListener('resize', () => {
    setShowLogo(window.innerWidth > 768 && window.innerWidth < 1280);
  });

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
            <img src={logo} alt="diagoriente_logo" className={classes.logoIcon} />
          </Link>
          <div className={classes.imageWrapper}>
            {showlogo ? (
              <img src={smallbeta} alt="menu" height={13} width={77} className={classes.smallbeta} />
            ) : (
              <>
                <div className={classes.beta}>
                  <img src={beta} alt="menu" height={35} width={72} />
                </div>

                <img src={betaGouv} alt="menu" height={13} width={80} className={classes.betaGov} />
              </>
            )}
          </div>
        </div>
        {Links}
      </Toolbar>
    </AppBar>
  );
};

export default PublicHeader;
