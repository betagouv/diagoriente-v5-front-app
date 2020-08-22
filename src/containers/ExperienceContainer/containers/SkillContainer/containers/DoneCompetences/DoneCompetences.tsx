import React, { useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ParcoursContext from 'contexts/ParcourContext';

import Button from 'components/button/Button';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import check from 'assets/svg/check.svg';

import { Theme } from 'requests/types';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme, match }: Props) => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);
  const skill = parcours?.skills.find((e) => e.theme?.id === match.params.themeId);

  let typeXp = '';

  switch (skill?.theme.type) {
    case 'engagement':
      typeXp = 'engagement';
      break;
    case 'personal':
      typeXp = 'personnelle';
      break;
    case 'professional':
      typeXp = 'professionnelle';
      break;
    default:
      typeXp = 'personnelle';
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.title}>BRAVO !</div>
        </div>
        <div className={classes.description}>
          <p className={classes.text}>
            Tu as ajouté une expérience
            {typeXp}à ton parcours, et tu as identifié de nouvelles compétences.
          </p>
        </div>
        {skill?.theme.type === 'professional' ? (
          <div>
            <span className={classes.titleThemeDone}>{theme.title}</span>
            <img src={check} alt="check" className={classes.checked} />
          </div>
        ) : (
          <Avatar titleClassName={classes.size} title={theme.title} size={170} className={classes.avatar} checked>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
        )}

        <div className={classes.btnskillContainer}>
          <div className={classes.btnContainer}>
            <Link to="/experience">
              <Button className={classes.btn}>
                <div className={classes.btnLabel}>Ajouter une nouvelle expérience</div>
              </Button>
            </Link>
          </div>
          <div className={classes.btnSkillCardContainer}>
            <Link to="/profile/card">
              <Button className={classes.btnSkillCard}>Voir ma carte de compétences</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCompetences;
