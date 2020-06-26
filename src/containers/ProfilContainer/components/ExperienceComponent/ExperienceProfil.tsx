import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDeleteSkill } from 'requests/skills';
import { UserParcour } from 'requests/types';

import { decodeUri } from 'utils/url';

import parcoursContext from 'contexts/ParcourContext';
import classNames from 'utils/classNames';
import Grid from '@material-ui/core/Grid';
import Recommendation from 'components/ui/RecommendationModal/RecommendationModal';

import NotFoundPage from 'components/layout/NotFoundPage';
import Title from 'components/common/Title/Title';
import Button from 'components/button/Button';
import Card from '../Card/Card';
import Arrow from '../Arrow/Arrow';

import useStyles from './styles';

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

const ExperienceComponent = ({ location, history }: RouteComponentProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState(null as Unpacked<UserParcour['skills']> | null);

  const { parcours, setParcours } = useContext(parcoursContext);
  const type = decodeUri(location.search).type || 'personal';
  const [deleteSkill, stateSkill] = useDeleteSkill();
  const showAddCard = parcours?.skills && parcours?.skills.filter((p) => p.theme.type === type).length % 3 === 0;
  useEffect(() => {
    if (stateSkill.data) setParcours(stateSkill.data.deleteSkill);
  }, [stateSkill.data]);

  const onEdit = (id: string) => {
    const selectedSkill = parcours?.skills.find((s) => s.id === id);
    if (selectedSkill) history.push(`/experience/skill/${selectedSkill.theme.id}`);
  };

  const handleRecommendation = (id: string) => {
    const selectedSkill = parcours?.skills.find((s) => s.id === id) || null;
    setSkill(selectedSkill);
    setOpen(true);
  };

  const onDelete = (id: string) => {
    deleteSkill({ variables: { id } });
  };

  if (type !== 'personal' && type !== 'professional') {
    return <NotFoundPage />;
  }

  return (
    <div className={classes.profilContainer}>
      <div className={classes.titleContainer}>
        <Arrow />
        <Title
          title={type === 'professional' ? 'MES EXPÉRIENCES PROFESSIONNELLES' : 'MES EXPÉRIENCES PERSONNELLES'}
          color="#4D6EC5"
          size={42}
          className={classes.title}
        />
        <div className={classes.empty} />
      </div>
      <span className={classes.text}>
        Liste des expériences
        {type === 'professional' ? ' pro ' : ' perso '}
        que tu as renseignées
      </span>
      <div className={classes.cardGridContainer}>
        <Grid container spacing={4}>
          {parcours?.skills
            .filter((p) => p.theme.type === type)
            .map((skill) => (
              <Grid key={skill.id} item xs={12} sm={12} md={6} lg={4} className={classes.cardGrid}>
                <Card
                  edit={onEdit}
                  recommendation={handleRecommendation}
                  remove={onDelete}
                  id={skill.id}
                  competence={skill.competences}
                  title={skill.theme.title}
                />
              </Grid>
            ))}

          <Link
            to={type === 'professional' ? '/experience/theme?type=professional' : '/experience/theme'}
            className={classNames(!showAddCard ? classes.link : classes.btnLink)}
          >
            <Button className={classes.btn}>
              <span className={classes.textButton}>
                J’ajoute une expérience
                {' '}
                {type === 'professional' ? ' pro ' : ' perso '}
              </span>
            </Button>
          </Link>
        </Grid>
      </div>
      {skill && <Recommendation skill={skill} open={open} setOpen={setOpen} />}
    </div>
  );
};
export default ExperienceComponent;
