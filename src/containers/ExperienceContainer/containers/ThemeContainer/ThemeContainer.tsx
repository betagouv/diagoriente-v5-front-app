import React, { useState, useEffect } from 'react';
import TitleImage from 'components/common/TitleImage/TitleImage';
import Avatar from 'components/common/Avatar/Avatar';
import Title from 'components/common/Title/Title';

import { useThemes } from 'requests/themes';
import Typography from '@material-ui/core/Typography/Typography';
import Button from 'components/button/Button';
import { Link, RouteComponentProps } from 'react-router-dom';
import RestLogo from 'components/common/Rest/Rest';
import Grid from '@material-ui/core/Grid';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';

import blueline from 'assets/svg/blueline.svg';
import Arrow from 'assets/svg/arrow';

import { decodeUri } from 'utils/url';
import { Theme } from 'requests/types';
import useStyles from './styles';

const ThemeContainer = ({ location, history }: RouteComponentProps) => {
  const classes = useStyles();

  const [selectedTheme, setSelectedTheme] = useState<Omit<Theme, 'activities'> | null>(null);

  const { type } = decodeUri(location.search);

  const showAvatar = (theme: Omit<Theme, 'activities'>) => {
    setSelectedTheme(theme);
  };
  const { data, loading } = useThemes({ variables: { type: type === 'professional' ? 'professional' : 'personal' } });

  useEffect(() => {
    if (data) {
      const id = localStorage.getItem('theme');
      const selected = data.themes.data.find((theme) => theme.id === id);
      if (selected) setSelectedTheme(selected);
    }
  }, [data]);

  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem('theme', selectedTheme?.id);
    }
  }, [selectedTheme]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPERIENCES PERSONNELLES" color="#223A7A" size={42} />
          <RestLogo
            onClick={() => {
              history.replace('/experience');
            }}
            color="#4D6EC5"
            label="Annuler"
          />
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
                    onClick={() => showAvatar(theme)}
                    avatarCircleBackground={selectedTheme?.id === theme.id ? theme.resources?.backgroundColor : ''}
                  >
                    {selectedTheme?.id === theme.id && (
                      <img src={theme.resources?.icon} alt="" className={classes.avatarStyle} />
                    )}
                  </Avatar>
                </Grid>
              ))}
            </Grid>
          </div>
          <Link to={selectedTheme ? `/experience/skill/${selectedTheme.id}` : ''} className={classes.hideLine}>
            <Button disabled={!selectedTheme} className={classes.btnperso} type="submit">
              <div className={classes.contentBtn}>
                <div className={classes.btnLabel}>Suivant </div>
                <Arrow color="#223A7A" width="12" height="12" />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <Selection theme={selectedTheme} activities={[]} />
    </div>
  );
};
export default ThemeContainer;
