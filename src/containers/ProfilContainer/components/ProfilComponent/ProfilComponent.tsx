import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useJobs } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
import { Families, Jobs } from 'requests/types';
import Button from 'components/button/Button';

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

import SecteurContext from 'contexts/SecteurContext';
import useStyles from './styles';

const ProfilComponent = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { parcours } = useContext(parcoursContext);
  const { data: secteurs } = useContext(SecteurContext);
  const [callJobs, stateJobs] = useJobs({ fetchPolicy: 'network-only' });

  useDidMount(() => {
    callJobs();
  });

  const persoSkills = parcours?.skills.filter((p) => p.theme?.type === 'personal') || [];
  const engagementSkills = parcours?.skills.filter((p) => p.theme?.type === 'engagement') || [];
  const sportSkills = parcours?.skills.filter((p) => p.theme?.type === 'sport') || [];
  const proSkills = parcours?.skills.filter((p) => p.theme?.type === 'professional') || [];

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
        <div key={j?.id} className={classes.favoriContainer}>
          <img src={littlestar} alt="" height={20} />
          <div className={classes.job}>{j?.title}</div>
        </div>
      ));
    }
    if (stateJobs.loading) return <Spinner />;
    return <div>Aucun metier à afficher</div>;
    // eslint-disable-next-line
  }, [stateJobs.loading, stateJobs.data]);

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
      title: 'MES CENTRES D’INTÉRÊT',
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
            parcours && parcours.families.length > 3 ? (
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
            ) : null
          }
          renderCenterRightControls={({ nextSlide, currentSlide }) =>
            parcours && parcours.families.length > 3 ? (
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
            ) : null
          }
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
                  <Grid item key={family.id} xs={4} sm={4} md={6} className={classes.themeSelection}>
                    <div className={classes.imageContainer}>
                      <img src={family.resources[2]} alt="" />
                    </div>

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
      title: 'MA CARTE DE COMPÉTENCES',
      background: '#D60051',
      color: '#fff',
      children: (
        <>
          <img src={carte} alt="" height={90} />
          {user?.isCampus ? (
            <span className={classes.txtCarte}>
              Toutes tes expériences, compétences et recommandations au même endroit pour partager à ton conseiller Pôle
              Emploi et valider ta candidature
            </span>
          ) : (
            <span className={classes.txtCarte}>
              Toutes tes expériences et compétences au même endroit pour partager à tes futurs employeurs
            </span>
          )}
        </>
      ),
    },
  ];
  const cardExp = [
    {
      titleCard: <Title title="MES EXPÉRIENCES" color="#424242" size={18} font="42" className={classes.title} />,
      title: 'MES EXPÉRIENCES PERSONNELLES',
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience',
      className: classes.experienceCard,
      children: persoSkills.length ? (
        <Grid container spacing={1}>
          {persoSkills.map((theme) => (
            <Grid item xs={8} sm={8} md={6} key={theme.id} className={classes.itemContainer}>
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
      ) : (
        <Link to="/experience/theme">
          <Button className={classes.btn}>
            <span className={classes.textButton}>J’ajoute une expérience personnelle</span>
          </Button>
        </Link>
      ),
    },
    {
      titleCard: <div className={classes.emptyDiv} />,
      title: 'MES EXPÉRIENCES PROFESSIONNELLES',
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience?type=professional',
      className: classes.experienceCard,
      children: proSkills.length ? (
        <Grid container spacing={1}>
          {proSkills.map((theme) => {
            const icon = secteurs?.themes.data.find((secteur) => theme.theme.parentId === secteur.id)?.resources?.icon;
            return (
              <Grid item xs={8} sm={8} md={6} key={theme.id} className={classes.itemContainer}>
                <div className={classes.themeSelection}>
                  <Circle avatarCircleBackground="transparent" size={100}>
                    {icon && <img className={classes.themeImage} src={icon} alt="theme" />}
                  </Circle>
                  <div className={classes.themeTile}>{theme.theme.title.replace(new RegExp('[//,]', 'g'), '\n')}</div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Link to="/experience/theme-pro">
          <Button className={classes.btn}>
            <span className={classes.textButton}>J’ajoute une expérience professionnelle</span>
          </Button>
        </Link>
      ),
    },
    {
      titleCard: <div className={classes.emptyDiv} />,
      title: "MES EXPÉRIENCES D'ENGAGEMENT",
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience?type=engagement',
      className: classes.experienceCard,
      children: engagementSkills.length ? (
        <Grid container spacing={1}>
          {engagementSkills.map((theme) => (
            <Grid item xs={8} sm={8} md={6} key={theme.id} className={classes.itemContainer}>
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
      ) : (
        <Link to="/experience/theme?type=engagement">
          <Button className={classes.btn}>
            <span className={classes.textButton}>J’ajoute une expérience d&apos;engagement</span>
          </Button>
        </Link>
      ),
    },
    {
      titleCard: <div className={classes.emptyDiv} />,
      title: 'MES EXPÉRIENCES SPORTIVES',
      background: '#4D6EC5',
      color: '#fff',
      path: '/profile/experience?type=sport',
      className: classes.experienceCard,
      children: sportSkills.length ? (
        <Grid container spacing={1}>
          {sportSkills.map((theme) => {
            const icon = theme?.theme.resources?.icon;
            return (
              <Grid item xs={8} sm={8} md={6} key={theme.id} className={classes.itemContainer}>
                <div className={classes.themeSelection}>
                  <Circle avatarCircleBackground="transparent" size={100}>
                    {icon && <img className={classes.themeImage} src={icon} alt="theme" />}
                  </Circle>
                  <div className={classes.themeTile}>{theme.theme.title.replace(new RegExp('[//,]', 'g'), '\n')}</div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Link to="/experience/theme?type=sport">
          <Button className={classes.btn}>
            <span className={classes.textButton}>J’ajoute une expérience sportive</span>
          </Button>
        </Link>
      ),
    },
  ];
  const cardJobs = [
    {
      titleCard: <Title title="MES DÉMARCHES" color="#424242" size={18} font="42" className={classes.title} />,

      title: 'MON TOP MÉTIERS',
      background: '#FFD382',
      color: '#424242',
      logo: star,
      children: renderTopJobs,
      path: '/jobs',
    },
    {
      titleCard: <div className={classes.emptyDiv} />,
      title: 'MES MÉTIERS FAVORIS',
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
  ];
  function createMarkup() {
    return {
      __html: `<div style="position:fixed;top:calc(50% - 250px);right:0;transition:width 300ms ease-out;width:0;" data-qa="side_panel"> <a class="typeform-share button" href="https://form.typeform.com/to/Ogshf7wm?typeform-medium=embed-snippet" data-mode="side_panel" style="box-sizing:border-box;position:absolute;top:300px;width:200px;height:48px;padding:0 20px;margin:0;cursor:pointer;background:#10255E;border-radius:4px 4px 0px 0px;box-shadow:0px 2px 12px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.08);display:flex;align-items:center;justify-content:flex-start;transform:rotate(-90deg);transform-origin:bottom left;color:white;text-decoration:none;z-index:9999;" data-width="320" data-height="500" target="_blank"> <span class="icon" style="width:32px;position:relative;text-align:center;transform:rotate(90deg) scale(0.85);left:-8px;"> <img alt="" src="https://images.typeform.com/images/rFLYYTQuQf5G" style="max-width:24px;max-height:24px;margin-top:10px;" /> </span> <span style="text-decoration:none;font-size:18px;font-family:Helvetica,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;"> Faisons le point </span> </a> </div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>`,
    };
  }
  return (
    <div className={classes.profilContainer}>
      <div dangerouslySetInnerHTML={createMarkup()} />
      <Title title="MON PROFIL" color="#424242" size={18} font="42" className={classes.title} />
      <div className={classes.cardGridContainer}>
        <Grid container spacing={3}>
          {allCard.map((e, index) => (
            // eslint-disable-next-line
            <Grid key={index} item xs={4} sm={4} className={classNames(classes.cardGrid)}>
              {e.title && e.background && e.children && (
                <Card
                  className={classes.cardClassName}
                  title={e.title}
                  background={e.background}
                  color={e.color}
                  path={e.path}
                >
                  {e.children}
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {cardExp.map((e, index) => (
            // eslint-disable-next-line
            <Grid key={index} item xs={4} sm={4} className={classNames(classes.cardGrid)}>
              {e.title && e.background && e.children && (
                <Card
                  className={classes.cardClassName}
                  title={e.title}
                  background={e.background}
                  color={e.color}
                  path={e.path}
                >
                  {e.children}
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {!user?.isCampus &&
            cardJobs.map((e, index) => (
              // eslint-disable-next-line
              <Grid key={index} item xs={4} sm={4} className={classNames(classes.cardGrid)}>
                {e.title && e.background && e.children && (
                  <Card
                    className={classes.cardClassName}
                    titleCard={e.titleCard}
                    title={e.title}
                    background={e.background}
                    color={e.color}
                    path={e.path}
                  >
                    {e.children}
                  </Card>
                )}
              </Grid>
            ))}
        </Grid>
      </div>
      <div className={classes.avis}>
        <a
          href="https://voxusagers.numerique.gouv.fr/Demarches/2453?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=74fff875f8b11d24367e9267b73ed92c"
          target="_blank"
        >
          <img
            src="https://voxusagers.numerique.gouv.fr/static/bouton-bleu.svg"
            alt="Je donne mon avis"
            title="Je donne mon avis sur cette démarche"
            width="100%"
            height="50px"
          />
        </a>
      </div>
    </div>
  );
};
export default ProfilComponent;
