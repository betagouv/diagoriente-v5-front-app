import React, { useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ParcoursContext from 'contexts/ParcourContext';

import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';

import { Theme } from 'requests/types';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme }: Props) => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.title}>BRAVO !</div>
        </div>
        <div className={classes.description}>
          <p className={classes.text}>
            Tu as ajouté une expérience personnelle à ton parcours, et tu as identifié de nouvelles compétences.
          </p>
        </div>
        <Avatar title={theme.title} size={170} className={classes.avatar}>
          <img src={theme.resources?.icon} alt="" />
        </Avatar>

        {!parcours?.completed ? (
          <div className={classes.btnskillContainer}>
            <div className={classes.btnContainer}>
              <Link to="/experience">
                <Button className={classes.btn}>
                  <div className={classes.btnLabel}>Ajouter une nouvelle expérience</div>
                </Button>
              </Link>
            </div>
            <div className={classes.btnSkillCardContainer}>
              <Button className={classes.btnSkillCard}>
                <div className={classes.btnLabel}>Voir ma carte de compétences</div>
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.btnskillFirstUser}>
            <Link to="/">
              <Button className={classes.btnFirstUse}>
                <div className={classes.btnLabelFirstUse}>Continuer à découvrir Diagoriente</div>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCompetences;
