import React, { useContext, useState } from 'react';
import { useListener } from 'hooks/useListener';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from 'components/selectpublic/Select';
import DrawerContext from 'contexts/DrawerContext';
import logo from 'assets/svg/diagoriente_logo.svg';
import smallbeta from 'assets/svg/smallbeta.svg';
import menu from 'assets/images/menu.png';
import marienne from 'assets/svg/marianne.svg';

import useStyles from './styles';

const PublicHeader = () => {
  const p = process.env.REACT_APP_PUBLIC_URL;
  const links = [
    { text: 'Qui sommes nous?', path: `${p}qui-sommes-nous/` },
    { text: 'Notre démarche', path: `${p}demarche/` },
    { text: 'Actualités', path: `${p}actualites/` },
    // { text: 'vidéo', path: '/DiagOvidéo' },
    { text: 'FAQ', path: `${p}faq/` },
  ];
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
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a className={classes.link} href={e.path} target="_blank">
              {e.text}
            </a>
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
          <a href={p || '/'} className={classes.logoLink}>
            <img src={logo} alt="diagoriente_logo" className={classes.logoIcon} />
          </a>
          <div className={classes.imageWrapper}>
            {showlogo ? (
              <img src={smallbeta} alt="menu" height={13} width={77} className={classes.smallbeta} />
            ) : (
              <img src={marienne} alt="menu" height={135} width={92} />
            )}
          </div>
        </div>
        {Links}
      </Toolbar>
    </AppBar>
  );
};

export default PublicHeader;
