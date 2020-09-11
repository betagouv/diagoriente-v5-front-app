import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import TitleImage from 'components/common/TitleImage/TitleImage';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import Title from 'components/common/Title/Title';
import SelectionContext from 'contexts/SelectionContext';

import { useThemes } from 'requests/themes';
import Button from 'components/nextButton/nextButton';
import { RouteComponentProps } from 'react-router-dom';
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
  const { setOpen } = useContext(SelectionContext);

  const [selectedTheme, setSelectedTheme] = useState<Omit<Theme, 'activities'> | null>(null);

  const { type, redirect } = decodeUri(location.search);

  const showAvatar = (theme: Omit<Theme, 'activities'>) => {
    setSelectedTheme(theme);
  };
  const { data, loading } = useThemes({
    variables: { type: type === 'engagement' ? 'engagement' : 'personal' },
  });
  const { parcours } = useContext(parcoursContext);

  const themeFiltereds = useMemo(
    () => (data ? data.themes.data.filter((theme) => !parcours?.skills.find((id) => theme.id === id.theme?.id)) : []),
    [data, parcours],
  );
  const themeNotFiltered = useMemo(() => (data ? data.themes.data : []), [data]);

  const themeFiltered = useMemo(() => (type === 'engagement' ? themeNotFiltered : themeFiltereds), [
    themeFiltereds,
    themeNotFiltered,
    type,
  ]);

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

  const onNavigate = () => {
    if (selectedTheme) history.push(`/experience/skill/${selectedTheme.id}${redirect ? encodeUri({ redirect }) : ''}`);
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title
            title={type === 'engagement' ? 'MES EXPERIENCES D’ENGAGEMENT' : 'MES EXPERIENCES PERSONNELLES'}
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
          {themeFiltered.length === 0 && !loading ? (
            <div className={classes.errorMessage}>
              Il n&apos;y a plus de thèmes disponible, vous les avez deja tous choisis !{' '}
            </div>
          ) : (
            <p className={classes.themeTitle}>
              Choisis un
              <span className={classes.themeText}> thème :</span>
            </p>
          )}
          <div className={classes.gridContainer}>
            <Grid className={classes.circleContainer} container spacing={2}>
              {loading && (
                <div className={classes.loadingContainer}>
                  <Spinner />
                </div>
              )}

              {themeFiltered.map((theme) => (
                <Grid key={theme.id} item xs={12} sm={3} md={2}>
                  <Tooltip
                    classes={{
                      tooltipPlacementRight: classes.tooltipRight,
                      tooltipPlacementLeft: classes.tooltipLeft,
                    }}
                    title={
                      theme.activities.length ? (
                        <Child>
                          {theme.activities.map((act) => (
                            <li className={classes.dot} key={act.title}>
                              {act.title}
                            </li>
                          ))}
                        </Child>
                      ) : (
                        ''
                      )
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
                        avatarCircleBackground={selectedTheme?.id === theme.id ? 'rgba(122, 230, 255, 0.2)' : ''}
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
          <div onClick={onNavigate} className={classes.hideLine}>
            <Button disabled={!selectedTheme} />
          </div>
        </div>
      </div>

      <Selection theme={selectedTheme} activities={[]} />
    </div>
  );
};
export default ThemeContainer;
