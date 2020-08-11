import React, { useContext } from 'react';

import SelectionContext from 'contexts/SelectionContext';

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
  const { open, setOpen } = useContext(SelectionContext);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.appBar}>
      <div onClick={toggle} className={classes.container}>
        <p className={classes.titleSelection}>Ta sélection</p>
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
              <div className={classes.emptyChildren}>Tu n’as pas encore choisi de thème</div>
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
