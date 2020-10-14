import React, { useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Theme } from 'requests/types';

import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import Recommendation from 'components/ui/RecommendationModal/RecommendationModal';

import Button from 'components/button/Button';

import ParcourContext from 'contexts/ParcourContext';
import check from 'assets/svg/check.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme, match, history, location }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { parcours } = useContext(ParcourContext);
  const isEdit = location.search;
  const skill = parcours?.skills.find((e) => e.theme?.id === match.params.themeId);
  const handleOpen = () => {
    setOpen(true);
  };
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
            Tu as ajouté une expérience {typeXp} à ton parcours, et tu as identifié de nouvelles compétences.
          </p>
        </div>
        {skill?.theme.type === 'professional' ? (
          <div>
            <span className={classes.titleThemeDone}>{theme.title}</span>
            <img src={check} alt="check" className={classes.checked} />
          </div>
        ) : (
          <Avatar
            title={theme.title}
            size={170}
            titleClassName={classes.classNameTitle}
            checked
            className={classes.imgContainer}
          >
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
        )}

        <div className={classes.textDescription}>
          <p className={classes.text}>
            Tu peux maintenant demander une recommandation pour cette expérience, elle donnera confiance à tes futurs
            recruteurs.
          </p>
        </div>
        <div className={classes.btnContainer}>
          <Button className={classes.btn} onClick={() => handleOpen()}>
            <div className={classes.btnLabel}>Je demande une recommandation</div>
          </Button>
        </div>
        <Link to={`/experience/skill/${theme.id}/done`} className={classes.info}>
          Passer cette étape
        </Link>
      </div>
      {skill && (
        <Recommendation
          // eslint-disable-next-line no-confusing-arrow
          onSuccess={() =>
            isEdit === '?edit' ||
            isEdit === '?add' ||
            isEdit === `?/profile/experience?type=${skill?.theme.type}` ||
            isEdit === '?/profile/experience'
              ? history.push(`/profile/experience?type=${skill?.theme.type}`)
              : history.push(`/experience/skill/${skill.theme.id}/done`)
          }
          skill={skill}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default ResultCompetences;
