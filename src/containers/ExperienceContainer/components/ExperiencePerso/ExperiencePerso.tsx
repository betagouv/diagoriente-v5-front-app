import React, { useContext } from 'react';
import TitleImage from 'components/common/TitleImage/TitleImage';
import Avatar from 'components/common/Avatar/Avatar';
import Title from 'components/common/Title/Title';

import { useThemes } from 'requests/themes';
import Typography from '@material-ui/core/Typography/Typography';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import RestLogo from 'components/common/Rest/Rest';
import Grid from '@material-ui/core/Grid';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import SelectionContext from 'contexts/SelectionContext';
import ThemeContext from 'contexts/ThemeContext';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';

import useStyles from './styles';

const ExperiencePerso = () => {
  const classes = useStyles();
  const {
 themeId, themeTitle, themeIcon, themeBackground, setSelection,
} = useContext(SelectionContext);
  const { open, setOpen } = useContext(ThemeContext);
  const showAvatar = (id: string, title: string, icon: string, background: string) => {
    setSelection({
      id,
      title,
      icon,
      background,
    });
    setOpen(true);
  };
  const { data, loading } = useThemes({ variables: { type: 'personal' } });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPERIENCES PERSONNELLES" color="#223A7A" size={42} />
          <RestLogo color="#4D6EC5" label="Annuler" />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="1" image={blueline} color="#223A7A" height="80px" />
          <Typography>
            Choisis un
            <strong> thème :</strong>
          </Typography>
          <div className={classes.gridContainer}>
            <Grid className={classes.circleContainer} container spacing={5}>
              {loading && <div className={classes.loadingContainer}>...loading</div>}

              {data?.themes.data.map((theme) => (
                <Grid key={theme.id} item xs={12} sm={3} md={2}>
                  <Avatar
                    title={theme.title}
                    size={60}
                    titleClassName={classes.marginTitle}
                    className={classes.circle}
                    onClick={() =>
                      showAvatar(
                        theme.id,
                        theme.title,
                        theme.resources?.icon || '',
                        theme.resources?.backgroundColor || '',
                      )}
                    avatarCircleBackground={themeId === theme.id ? theme.resources?.backgroundColor : ''}
                  >
                    {themeId === theme.id && (
                      <img src={theme.resources?.icon} alt="ddd" className={classes.avatarStyle} />
                    )}
                  </Avatar>
                </Grid>
              ))}
            </Grid>
          </div>
          <Link to={`/experience/perso/${themeId}/activities`} className={classes.hideLine}>
            <Button className={classes.btnperso} type="submit" disabled={!open}>
            <div className={classes.contentBtn}>
                <div className={classes.btnLabel}>Suivant </div>
              <Arrow color="#223A7A" width="12" height="12" />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <Selection>
        {themeId ? (
          <div className={classes.themeRoot}>
            <p className={classes.titleSelection}>Thème</p>
            <div className={classes.themeSelection}>
              <Avatar size={60} key={themeId} className={classes.themeAvatar} avatarCircleBackground={themeBackground}>
                <img src={themeIcon} alt="ddd" className={classes.avatarStyle} height={90} />
              </Avatar>
              <p className={classes.themeTile}>{themeTitle}</p>
            </div>
          </div>
        ) : (
          <div />
        )}
      </Selection>
    </div>
  );
};
export default ExperiencePerso;
