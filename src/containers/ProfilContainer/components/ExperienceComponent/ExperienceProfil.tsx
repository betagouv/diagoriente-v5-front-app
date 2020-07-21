import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDeleteSkill } from 'requests/skills';
import { UserParcour } from 'requests/types';

import { decodeUri, encodeUri } from 'utils/url';
import { useWillUnmount } from 'hooks/useLifeCycle';
import parcoursContext from 'contexts/ParcourContext';
import classNames from 'utils/classNames';
import Grid from '@material-ui/core/Grid';
import Recommendation from 'components/ui/RecommendationModal/RecommendationModal';
import Popup from 'components/common/Popup/Popup';
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
  const [deleteId, setDeleteId] = useState('');

  const { parcours, setParcours } = useContext(parcoursContext);
  const [rowSize, setRowSize] = useState(window.innerWidth < 1280 ? 2 : 3);
  const type = decodeUri(location.search).type || 'personal';
  const [deleteSkill, stateSkill] = useDeleteSkill();
  const showAddCard = parcours?.skills && parcours?.skills.filter((p) => p.theme.type === type).length % rowSize === 0;

  useEffect(() => {
    if (stateSkill.data) {
      setParcours(stateSkill.data.deleteSkill);
      setDeleteId('');
    }
  }, [stateSkill.data, setParcours]);

  const onEdit = (id: string) => {
    const selectedSkill = parcours?.skills.find((s) => s.id === id);
    if (selectedSkill) history.push(`/experience/skill/${selectedSkill.theme.id}`);
  };
  const handleRecommendation = (id: string) => {
    const selectedSkill = parcours?.skills.find((s) => s.id === id) || null;
    setSkill(selectedSkill);
    setOpen(true);
  };

  const onDelete = () => {
    deleteSkill({ variables: { id: deleteId } });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const onWindowResize = () => {
    setRowSize(window.innerWidth < 1280 ? 2 : 3);
  };
  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
  }, []);

  useWillUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
  });

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
            .filter((s) => s.theme.type === type)
            .map((s) => (
              <Grid key={s.id} item xs={12} sm={12} md={6} lg={4} className={classes.cardGrid}>
                <Card
                  edit={onEdit}
                  recommendation={handleRecommendation}
                  remove={handleDelete}
                  id={s.id}
                  competence={s.competences}
                  title={s.theme.title}
                  src={s.theme.resources?.icon}
                  type={type}
                />
              </Grid>
            ))}

          <Link
            to={
              type === 'professional'
                ? `/experience/theme-pro${encodeUri({
                    type: 'professional',
                    redirect: '/profile/experience?type=professional',
                  })}`
                : `/experience/theme${encodeUri({ redirect: '/profile/experience' })}`
            }
            className={classNames(showAddCard ? classes.btnLink : classes.link)}
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

      <Popup open={!!deleteId} handleClose={() => setDeleteId('')}>
        <div className={classes.popupContainer}>
          <p className={classes.popupDescription}>
            Veux-tu vraiment supprimer ?
            <br />
            Tes modifications seront enregistrées.
          </p>
          <Button className={classes.incluse} onClick={onDelete}>
            Oui, continuer
          </Button>
          <Button
            onClick={() => {
              setDeleteId('');
            }}
            className={classes.linkHome}
          >
            Non
          </Button>
        </div>
      </Popup>
    </div>
  );
};
export default ExperienceComponent;