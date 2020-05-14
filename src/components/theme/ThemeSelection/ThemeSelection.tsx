import React, { useContext } from 'react';

import SelectionContext from 'contexts/SelectionContext';

import { useDidUpdate } from 'hooks/useLifeCycle';

import { Theme, Activity } from 'requests/types';

import Avatar from 'components/common/Avatar/Avatar';
import Button from 'components/button/Button';

import arrow from 'assets/svg/arrw.svg';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface Props {
  theme?: Omit<Theme, 'activities'> | null;
  activities: Activity[];
}

const PrivateHeader = ({ theme, activities }: Props) => {
  const classes = useStyles();
  const { open, setOpen } = useContext(SelectionContext);
  const toggle = () => {
    if (theme) {
      setOpen(!open);
    }
  };

  useDidUpdate(() => {
    if (theme || activities.length) {
      setOpen(true);
    }
  }, [theme, activities]);

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
      {theme && open && (
        <div className={classes.childrenSelection}>
          <div className={classes.themeRoot}>
            <p className={classes.activityTitleSelection}>Thème</p>
            <div className={classes.themeSelection}>
              <Avatar
                size={60}
                className={classes.themeAvatar}
                avatarCircleBackground={theme.resources?.backgroundColor}
              >
                <img src={theme.resources?.icon} alt="" className={classes.avatarStyle} height={90} />
              </Avatar>
              <p className={classes.themeTile}>{theme.title}</p>
            </div>
            {activities.length ? (
              <div className={classes.activityContainer}>
                <p className={classes.activityTitleSelection}>Activité(s)</p>
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
