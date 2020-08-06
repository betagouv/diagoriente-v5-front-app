import React, { useContext } from 'react';
import ParcourContext from 'contexts/ParcourContext';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';

import CardPart from '../CardPart/CardPart';
import CardSkill from '../CardSkill/CardSkill';
import useStyles from './styles';

interface CardSkillsProps {
  type: string;
  title: string;
  emptyMessage: string;
  emptyButton: string;
  path: string;
}

const CardSkills = ({
 type, title, path, emptyButton, emptyMessage,
}: CardSkillsProps) => {
  const { parcours } = useContext(ParcourContext);
  const classes = useStyles();
  const skills = parcours?.skills.filter((skill) => skill.theme?.type === type) || [];

  return (
    <CardPart title={title}>
      {skills.length ? (
        <Grid className={classes.skillsContainer} container spacing={3}>
          {skills.map((skill) => (
            <CardSkill key={skill.id} {...skill} />
          ))}
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
    </CardPart>
  );
};

export default CardSkills;
