import React, { useContext, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ParcoursContext from 'contexts/ParcourContext';
import userContext from 'contexts/UserContext';

import Button from 'components/button/Button';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import check from 'assets/svg/check.svg';

import ModalContainer from 'components/common/Modal/ModalContainer';
import CampusForm from 'components/Modals/ModalCampus2023';
import { Theme } from 'requests/types';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme, match }: Props) => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);
  const { user } = useContext(userContext);
  const [showModal, setShowModal] = useState(false);

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
    case 'sport':
      typeXp = 'sport';
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
          <Avatar titleClassName={classes.size} title={theme.title} size={170} className={classes.avatar} checked>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
        )}

        <div className={classes.btnskillContainer}>
          <div className={classes.btnSkillCardContainer}>
            <Link to="/profile/card">
              <Button className={classes.btnSkillCard}>
                J&apos;affiche et continue d&apos;enrichir ma carte de compétences
              </Button>
            </Link>
          </div>
          <div className={classes.btnContainer}>
            {user?.isCampus && !user?.validateCampus ? (
              <Button className={classes.btnValidate} onClick={() => setShowModal(true)}>
                Valider ma candidature définitivement
              </Button>
            ) : (
              <Link to="/experience">
                <Button className={classes.btn}>
                  <div className={classes.btnLabel}>Ajouter une nouvelle expérience</div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ModalContainer
        open={showModal}
        handleClose={() => setShowModal(false)}
        backdropColor="#011A5E"
        colorIcon="rgb(255, 77, 0)"
        size={90}
      >
        <div>
          <div>
            <CampusForm handleClose={() => setShowModal(false)} />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ResultCompetences;
