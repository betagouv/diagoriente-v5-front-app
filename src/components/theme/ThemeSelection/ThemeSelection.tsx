import React, { useContext, useEffect, useRef, useState } from 'react';

import SelectionContext from 'contexts/SelectionContext';
import { matchPath, useLocation } from 'react-router-dom';
import { Theme } from 'requests/types';

import Avatar from 'components/common/Avatar/Avatar';
import Button from 'components/button/Button';

import arrow from 'assets/svg/arrw.svg';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  theme?: Omit<Theme, 'activities'> | null;
  activities: Theme['activities'];
}

const PrivateHeader = ({ theme, activities }: Props) => {
  const classes = useStyles({ theme });
  const location = useLocation();
  const isTheme = Boolean(matchPath(location.pathname, { path: '/experience/theme', exact: true }));
  const isAct = Boolean(matchPath(location.pathname, { path: '/experience/skill/:id/activities', exact: true }));
  const [isFirst, setIsFirst] = useState(false);
  const actRef = useRef(activities.length);
  const [EffectState, setEffectState] = useState(false);
  const { open, setOpen } = useContext(SelectionContext);
  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (theme && isTheme) {
      setOpen(true);
    }
  }, [theme, isTheme, setOpen]);

  useEffect(() => {
    if (isAct && activities.length === 0) setOpen(false);

    if (!isFirst && activities.length === 1) {
      // eslint-disable-next-line
      setIsFirst(true);
      setOpen(true);
    }
  }, [activities, setOpen, isAct, isFirst]);

  useEffect(() => {
    if (activities.length !== actRef.current) setEffectState(true);
  }, [activities.length]);

  useEffect(() => {
    if (EffectState) {
      setTimeout(() => {
        setEffectState(false);
      }, 500);
    }
  });

  return (
    <div className={classes.appBar}>
      <div onClick={toggle} className={classes.container}>
        <p className={classes.titleSelection}>Ta sélection</p>
        {isAct && activities.length > 0 &&  (
          <div className={classNames(classes.blob, EffectState && classes.animation)}>
            <div className={classes.badgeText}>{activities.length}</div>
          </div>
        )}
        <img
          src={arrow}
          alt="menu"
          height={12}
          className={classNames(classes.menuIcon, !open ? classes.menuIconClosed : undefined)}
        />
      </div>

      {open && (
        <div className={classes.childrenSelection}>
          <div className={classes.themeRoot}>
            {theme ? (
              <>
                <div className={classes.themeSelection}>
                  {theme.type !== 'professional' ? (
                    <Avatar
                      size={90}
                      className={classes.themeAvatar}
                      avatarCircleBackground={theme.resources?.backgroundColor}
                      circleClassName={classes.circleClassName}
                    >
                      <img src={theme.resources?.icon} alt="" className={classes.avatarStyle} height={90} />
                    </Avatar>
                  ) : (
                    undefined
                  )}
                  {theme.type === 'professional' ? (
                    <li className={classes.dot}>{theme.title}</li>
                  ) : (
                    <p className={classes.themeTile}>{theme.title}</p>
                  )}
                </div>
              </>
            ) : (
              <div className={classes.emptyChildren}>
                Tu n’as pas encore choisi
                <span className={classes.boldText}>d’expérience pro/perso</span>
              </div>
            )}
            {activities.length ? (
              <div className={classes.activityContainer}>
                {activities.map((e) => (
                  <Button
                    variant="outlined"
                    key={e.id}
                    className={classes.activitySelected}
                    childrenClassName={classes.selected}
                    disabled
                  >
                    {e.title}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateHeader;
