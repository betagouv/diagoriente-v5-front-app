import React, { useContext, useMemo } from 'react';
import { useJobs } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
import { Families, Jobs } from 'requests/types';

import Carousel from 'nuka-carousel';

import Grid from '@material-ui/core/Grid';
import classNames from 'utils/classNames';

import UserContext from 'contexts/UserContext';
import parcoursContext from 'contexts/ParcourContext';

import Spinner from 'components/Spinner/Spinner';
import Title from 'components/common/Title/Title';
import Card from 'components/common/Card/Card';
import Avatar from '@material-ui/core/Avatar';
import Circle from 'components/common/Avatar/Avatar';
import Arrow from 'assets/svg/arrow';

import defaultAvatar from 'assets/svg/defaultAvatar.svg';
import star from 'assets/svg/star.svg';
import littlestar from 'assets/svg/littlestar.svg';

import carte from 'assets/svg/carte.svg';
import location from 'assets/svg/localisation.svg';
import heart from 'assets/svg/heart.svg';
import littleheart from 'assets/svg/littleheart.svg';

import useStyles from './styles';

const ProfilComponent = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { parcours } = useContext(parcoursContext);

  const [callJobs, stateJobs] = useJobs();

  useDidMount(() => {
    callJobs();
  });

  const persoSkills = parcours?.skills.filter((p) => p.theme.type === 'personal') || [];

  const proSkills = parcours?.skills.filter((p) => p.theme.type === 'professional') || [];

  const topJobs: Jobs[] = [];
  if (stateJobs.data && stateJobs.data.myJobs.length) {
    const showNumber = stateJobs.data.myJobs.length > 5 ? 5 : stateJobs.data.myJobs.length;
    for (let i = 0; i <= showNumber; i += 1) {
      topJobs.push(stateJobs.data.myJobs[i]);
    }
  }

  const favoriteJobs = stateJobs.data?.myJobs.filter((job) => job.favorite && job.favorite.interested) || [];

  const renderTopJobs = useMemo(() => {
    if (topJobs.length) {
      return topJobs.map((j) => (
        <div key={j.id} className={classes.favoriContainer}>
          <img src={littlestar} alt="" height={20} />
          <div className={classes.job}>{j.title}</div>
        </div>
      ));
    }
    if (stateJobs.loading) return <Spinner />;
    return <div>Aucun metier à afficher</div>;
    // eslint-disable-next-line
  }, [stateJobs.loading]);

  const allCard = [
    {
      title: 'MES INFOS PERSONNELLES',
      background: '#6B6B6A',
      color: '#fff',
      path: '/profile/info',
      children: (
        <>
          <Avatar className={classes.logo} src={user?.logo ? user?.logo : defaultAvatar} />
          <div className={classes.infoContainer}>
            <span className={classes.userName}>{`${user?.profile.firstName} ${user?.profile.lastName}`}</span>
            <div className={classes.locationContainer}>
              <img src={location} alt="" height={19} />
              <span className={classes.location}>{user?.location}</span>
            </div>
            <span>{user?.email}</span>
          </div>
        </>
      ),
    },
    {
      title: 'MES CENTRES D’INTERET',
      background: '#420FAB',
      color: '#fff',
      path: '/profile/interest',
      childrenCardClassName: classes.childrenCardClassName,
      children: (
        <Carousel
          renderBottomCenterControls={({ slideCount, currentSlide, goToSlide }) => (
            <div tabIndex={-1} className={classes.circleContainer}>
              {[...new Array(slideCount)].map((count, index) => (
                <div
                  tabIndex={-1}
                  // eslint-disable-next-line
                  key={index}
                  className={classNames(
                    classes.carouselCircle,
                    index === currentSlide && classes.currentCarouselCircle,
                  )}
                  onClick={index !== currentSlide ? () => goToSlide(index) : undefined}
                />
              ))}
            </div>
          )}
          dragging={false}
          renderCenterLeftControls={({ previousSlide, currentSlide }) =>
            (parcours && parcours.families.length > 3 ? (
              <div
                tabIndex={-1}
                className={classNames(currentSlide === 0 && classes.hide, classes.wrapperBtn, classes.prevWrap)}
              >
                <Arrow
                  onClick={() => {
                    if (currentSlide !== 0) {
                      previousSlide();
                    }
                  }}
                  width="14"
                  height="14"
                  color="#7533FF"
                  className={classes.rotatedArrow}
                />
              </div>
            ) : null)}
          renderCenterRightControls={({ nextSlide, currentSlide }) =>
            (parcours && parcours.families.length > 3 ? (
              <div
                tabIndex={-1}
                className={classNames(currentSlide === 1 && classes.hide, classes.wrapperBtn, classes.nextWrap)}
              >
                <Arrow
                  onClick={() => {
                    if (currentSlide !== 1) {
                      nextSlide();
                    }
                  }}
                  width="14"
                  height="14"
                  color="#7533FF"
                />
              </div>
            ) : null)}
          className={classes.root}
        >
          {parcours?.families
            .reduce((result, family) => {
              if (result[result.length - 1] && result[result.length - 1].length < 3) {
                result[result.length - 1].push(family);
              } else {
                result.push([family]);
              }
              return result;
            }, [] as Families[][])
            .map((families, index) => (
              <Grid key={index} container className={classes.interestItem}>
                {families.map((family) => (
                  <Grid item key={family.id} xs={4} sm={4} className={classes.themeSelection}>
                    <Circle size={70} />
                    <p className={classes.themeTile}>{family.nom.replace(new RegExp('[//,]', 'g'), '\n')}</p>
                  </Grid>
                ))}
              </Grid>
            ))}
        </Carousel>
      ),
    },
    {
      path: '/profile/card',
      title: 'MA CARTE DE COMPETENCES',
      background: '#D60051',
      color: '#fff',
      children: (
        <>
          <img src={carte} alt="" height={90} />
          <span className={classes.txtCarte}>
            Toutes tes expériences et compétences
            <br />
            au même endroit pour partager à tes
            <br />
            futurs employeurs
          </span>
        </>
      ),
    },
    {
      titleCard: <Title title="MES EXPERIENCES" color="#424242" size={18} font="42" className={classes.title} />,
      title: 'MES EXPERIENCES PERSONNELLES',
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience',
      className: classes.experienceCard,
      children: persoSkills.length ? (
        <Grid container spacing={1}>
          {persoSkills.map((theme) => (
            <Grid item xs={4} sm={4} key={theme.id} className={classes.itemContainer}>
              <div className={classes.themeSelection}>
                <Circle avatarCircleBackground="transparent" size={100}>
                  {theme.theme.resources && theme.theme.resources.icon && (
                    <img className={classes.themeImage} src={theme.theme.resources.icon} alt="theme" />
                  )}
                </Circle>
                <div className={classes.themeTile}>{theme.theme.title.replace(new RegExp('[//,]', 'g'), '\n')}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : null,
    },
    {
      titleCard: <div className={classes.emptyDiv} />,

      title: 'MES EXPERIENCES PROFESSIONNELLES',
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience?type=professional',
      className: classes.experienceCard,
      children: proSkills.length ? (
        <Grid container spacing={1}>
          {proSkills.map((theme) => (
            <Grid item xs={4} sm={12} key={theme.id}>
              <li className={classNames(classes.themeTile, classes.alignThemeTitle)}>{theme.theme.title.replace(new RegExp('[//,]', 'g'), '\n')}</li>
            </Grid>
          ))}
        </Grid>
      ) : null,
    },
    {},
    {
      titleCard: <Title title="MES DÉMARCHES" color="#424242" size={18} font="42" className={classes.title} />,

      title: 'MON TOP METIERS',
      background: '#FFD382',
      color: '#424242',
      logo: star,
      children: renderTopJobs,
    },
    {
      titleCard: <div className={classes.emptyDiv} />,
      title: 'MES METIERS FAVORIS',
      background: '#FFD382',
      color: '#424242',
      logo: heart,

      children: favoriteJobs.length
        ? favoriteJobs.map((j) => (
          <div key={j.id} className={classes.favoriContainer}>
            <img src={littleheart} alt="" height={20} />
            <div className={classes.job}>{j.title}</div>
          </div>
          ))
        : null,
    },
    /*  {
      titleCard: <div className={classes.emptyDiv} />,

      title: 'MES ENTREPRISES ENREGISTREES',
      background: '#FFD382',
      color: '#424242',
      children: <div>hello</div>,
    }, */
  ];
  return (
    <div className={classes.profilContainer}>
      <Title title="MON PROFIL" color="#424242" size={18} font="42" className={classes.title} />
      <div className={classes.cardGridContainer}>
        <Grid container spacing={3}>
          {allCard.map((e, index) => (
            // eslint-disable-next-line
            <Grid key={index} item xs={4} sm={4} className={classNames(classes.cardGrid, e.className)}>
              {e.title && e.background && e.children && (
                <Card
                  className={classes.cardClassName}
                  titleCard={e.titleCard}
                  title={e.title}
                  background={e.background}
                  color={e.color}
                  logo={e.logo}
                  path={e.path}
                  childrenCardClassName={e.childrenCardClassName}
                >
                  {e.children}
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default ProfilComponent;