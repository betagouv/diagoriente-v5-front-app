import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ParcourContext from 'contexts/ParcourContext';
import UserContext from 'contexts/UserContext';
import { UserParcour } from 'requests/types';

import { encodeUri } from 'utils/url';

import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Circle from 'components/common/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';

import carte from 'assets/svg/carte.svg';
import download from 'assets/svg/download.svg';
import print from 'assets/svg/print.svg';
import partage from 'assets/svg/partage.svg';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import betaGouv from 'assets/svg/logo-beta.gouv 3.svg';
import medaille from 'assets/svg/picto_medaille.svg';

import { Unpacked } from 'containers/ProfilContainer/components/ExperienceComponent/ExperienceProfil';

import CompetenceEchelon from 'components/common/CompetenceEchelon/CompetenceEchelon';
import Arrow from '../../components/Arrow/Arrow';

import useStyles from './styles';

const CardContainer = () => {
  const classes = useStyles();
  const { parcours } = useContext(ParcourContext);
  const { user } = useContext(UserContext);

  function renderSkill(skill: Unpacked<UserParcour['skills']>) {
    const comment = skill.comment.filter((c) => c.status === 'accepted');
    return (
      <Tooltip
        key={skill.id}
        arrow
        placement="right"
        classes={{ popper: classes.tooltip }}
        title={
          comment.length
            ? comment.map((c) => (
              <div key={c.id} className={classes.tooltipContainer}>
                <div className={classes.tooltipTitle}>
                  Expérience validée par
                  {' '}
                  <span className={classes.tooltipUser}>
                    {c.firstName}
                    {' '}
                    {c.lastName}
                  </span>
                  {c.location && (
                  <>
                    <br />
                    <span className={classes.tooltipLocation}>{c.location}</span>
                  </>
                    )}
                </div>
                <div className={classes.tooltipCommentText}>{c.commentText}</div>
              </div>
              ))
            : ''
        }
      >
        <Grid className={classes.skill} item lg={4}>
          <div className={classes.skillHeader}>
            <Circle size={42}>
              {skill.theme.resources && <img className={classes.themeIcon} src={skill.theme.resources.icon} alt="" />}
            </Circle>
            <div className={classes.themeTitle}>
              <div className={classes.titleText}>{skill.theme.title}</div>
              {comment.length ? <img className={classes.commentIcon} src={medaille} alt="" /> : null}
            </div>
          </div>
          <ul className={classes.activityContainer}>
            {skill.activities.map((activity) => (
              <li className={classes.activity} key={activity.id}>
                {activity.title}
              </li>
            ))}
          </ul>
        </Grid>
      </Tooltip>
    );
  }

  function renderSkillPart({
    type,
    title,
    emptyMessage,
    emptyButton,
    path,
  }: {
    type: string;
    title: string;
    emptyMessage: string;
    emptyButton: string;
    path: string;
  }) {
    const skills = parcours?.skills.filter((skill) => skill.theme.type === type) || [];

    return (
      <div className={classes.part}>
        <div className={classes.title}>{title}</div>
        {skills.length ? (
          <Grid className={classes.skillsContainer} container spacing={3}>
            {skills.map(renderSkill)}
          </Grid>
        ) : (
          <>
            <div className={classes.emptyMessage}>{emptyMessage}</div>
            <Link to={path}>
              <Button className={classes.emptyButton} variant="contained">
                {emptyButton}
              </Button>
            </Link>
          </>
        )}
      </div>
    );
  }

  function renderIcons() {
    return (
      <div className={classes.headerIcons}>
        <div className={classes.headerIcon}>
          <img className={classes.headerIconImage} src={download} alt="" />
          Télécharger
        </div>
        <div className={classes.headerIcon}>
          <img className={classes.headerIconImage} src={print} alt="" />
          Imprimer
        </div>
        <div className={classes.headerIcon}>
          <img className={classes.headerIconImage} src={partage} alt="" />
          Partager
        </div>
      </div>
    );
  }

  const globalCompetences = parcours?.globalCompetences.filter((comp) => comp.value > 0) || [];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Arrow />
        <div className={classes.headerTitle}>
          <img className={classes.headerImage} src={carte} alt="" />
          <span className={classes.title}>CARTE DE COMPÉTENCES</span>
        </div>
        {renderIcons()}
      </div>
      <Paper className={classes.card}>
        <div className={classes.cardHeader}>
          <div className={classes.userInfo}>
            <div className={classes.userName}>
              {user?.profile.firstName}
              {' '}
              {user?.profile.lastName}
            </div>
            {user?.location}
          </div>
          <div className={classes.appInfo}>
            <img className={classes.appLogo} height={65} src={logo} alt="logo" />
            <img height={55} src={betaGouv} alt="betaGov" />
          </div>
        </div>
        <div className={classes.part}>
          <div className={classes.competencesPart}>
            <div className={classes.title}>COMPÉTENCES TRANSVERSALES</div>
            <div className={classes.subTitle}>En relation avec les expériences personnelles et professionnelles</div>
            {globalCompetences.length ? (
              <Grid className={classes.competences} container spacing={3}>
                {globalCompetences.map((comp) => (
                  <Grid item lg={6} key={comp.id}>
                    <div className={classes.competenceTitle}>{comp.title}</div>
                    <CompetenceEchelon value={comp.value} />
                    <div className={classes.competenceNiveau}>{`${comp.niveau.title} ${comp.niveau.sub_title}`}</div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className={classes.emptyCompetences}>
                Pour évaluer tes compétences, tu dois d&lsquo;abord
                {' '}
                <span className={classes.emptyCompetencesBold}>
                  ajouter des expériences personnelles ou professionnelles
                </span>
              </div>
            )}
          </div>
        </div>
        {renderSkillPart({
          title: 'Expériences personnelles',
          type: 'personal',
          emptyMessage: "Tu n’as pas encore renseigné d'expérience personnelle",
          emptyButton: 'J’ajoute une expérience perso',
          path: `/experience/theme${encodeUri({ redirect: '/profil/card' })}`,
        })}
        {renderSkillPart({
          title: 'Expériences professionnelles',
          type: 'professional',
          emptyMessage: "Tu n’as pas encore renseigné d'expérience professionnelle",
          emptyButton: 'J’ajoute une expérience pro',
          path: `/experience/theme${encodeUri({ redirect: '/profil/card', type: 'professional' })}`,
        })}
      </Paper>
      <div className={classes.footerIcons}>{renderIcons()}</div>
    </div>
  );
};

export default CardContainer;
