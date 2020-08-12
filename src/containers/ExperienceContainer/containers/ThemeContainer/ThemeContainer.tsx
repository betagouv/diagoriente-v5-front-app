import React, { useState, useEffect, useContext } from 'react';
import TitleImage from 'components/common/TitleImage/TitleImage';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import Title from 'components/common/Title/Title';

import { useThemes } from 'requests/themes';
import Button from 'components/nextButton/nextButton';
import { Link, RouteComponentProps } from 'react-router-dom';
import RestLogo from 'components/common/Rest/Rest';
import Grid from '@material-ui/core/Grid';
import Selection from 'components/theme/ThemeSelection/ThemeSelection';
import parcoursContext from 'contexts/ParcourContext';
import Tooltip from '@material-ui/core/Tooltip';
import Child from 'components/ui/ForwardRefChild/ForwardRefChild';
import Spinner from 'components/SpinnerXp/Spinner';

import blueline from 'assets/svg/blueline.svg';
import classNames from 'utils/classNames';
import { decodeUri, encodeUri } from 'utils/url';
import { Theme } from 'requests/types';
import useStyles from './styles';

const ThemeContainer = ({ location, history }: RouteComponentProps) => {
  const classes = useStyles();

  const [selectedTheme, setSelectedTheme] = useState<Omit<Theme, 'activities'> | null>(null);

  const { type, redirect } = decodeUri(location.search);

  const showAvatar = (theme: Omit<Theme, 'activities'>) => {
    setSelectedTheme(theme);
  };
  const { data, loading } = useThemes({ variables: { type: type === 'professional' ? 'professional' : 'personal' } });
  const { parcours } = useContext(parcoursContext);

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
          <Title
            title={type === 'professional' ? 'MES EXPERIENCES PROFESSIONNELLES' : 'MES EXPERIENCES PERSONNELLES'}
            color="#223A7A"
            size={42}
          />
          <RestLogo
            onClick={() => {
              history.replace(redirect || '/experience');
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="1." image={blueline} color="#223A7A" width={180} />
          <p className={classes.themeTitle}>
            Choisis un
            <span className={classes.themeText}> thème :</span>
          </p>
          <div className={classes.gridContainer}>
            <Grid className={classes.circleContainer} container spacing={2}>
              {loading && (
                <div className={classes.loadingContainer}>
                  <Spinner />
                </div>
              )}

              {data?.themes.data
                .filter((theme) => !parcours?.skills.find((id) => theme.id === id.theme?.id))
                .map((theme, index) => (
                  <Grid key={theme.id} item xs={12} sm={3} md={2}>
                    <Tooltip
                      classes={{
                        tooltipPlacementRight: classes.tooltipRight,
                        tooltipPlacementLeft: classes.tooltipLeft,
                      }}
                      title={
                        <Child key={index}>
                          {theme.activities.map((act) => (
                            <li className={classes.dot} key={act.title}>{act.title}</li>
                          ))}
                        </Child>
                      }
                      arrow
                      placement="right"
                    >
                      <Child>
                        <Avatar
                          title={theme.title.replace(new RegExp('[//,]', 'g'), '\n')}
                          size={62}
                          titleClassName={selectedTheme?.id === theme.id ? classes.textSelected : classes.marginTitle}
                          className={classes.circle}
                          onClick={() => showAvatar(theme)}
                          avatarCircleBackground={
                            selectedTheme?.id === theme.id ? theme.resources?.backgroundColor : ''
                          }
                        >
                          <img
                            src={theme.resources?.icon}
                            alt=""
                            className={classNames(
                              classes.avatarStyle,
                              selectedTheme?.id === theme.id && classes.selectedImg,
                            )}
                          />
                        </Avatar>
                      </Child>
                    </Tooltip>
                  </Grid>
                ))}
            </Grid>
          </div>
          <Link
            to={selectedTheme ? `/experience/skill/${selectedTheme.id}${redirect ? encodeUri({ redirect }) : ''}` : ''}
            className={classes.hideLine}
          >
            <Button disabled={!selectedTheme} />
          </Link>
        </div>
      </div>

      <Selection theme={selectedTheme} activities={[]} />
    </div>
  );
};
export default ThemeContainer;
