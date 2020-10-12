import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDeleteSkill } from 'requests/skills';
import { UserParcour } from 'requests/types';
import { Unpacked } from 'utils/types';

import { decodeUri, encodeUri } from 'utils/url';
import { useWillUnmount } from 'hooks/useLifeCycle';
import useParcourSkills from 'hooks/useParcourSkills';
import parcoursContext from 'contexts/ParcourContext';
import classNames from 'utils/classNames';
import Grid from '@material-ui/core/Grid';
import Recommendation from 'components/ui/RecommendationModal/RecommendationModal';
import Popup from 'components/common/Popup/Popup';
import NotFoundPage from 'components/layout/NotFoundPage';
import Title from 'components/common/Title/Title';
import Button from 'components/button/Button';
import Spinner from 'components/SpinnerXp/Spinner';
import SecteurContext from 'contexts/SecteurContext';
import Card from '../Card/Card';
import Arrow from '../Arrow/Arrow';

import useStyles from './styles';

const ExperienceComponent = ({ location, history }: RouteComponentProps) => {
  const type = decodeUri(location.search).type || 'personal';

  const classes = useStyles();
  const skillState = useParcourSkills(type);
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState(null as Unpacked<UserParcour['skills']> | null);
  const [deleteId, setDeleteId] = useState('');
  const { data: secteurs } = useContext(SecteurContext);

  const { setParcours } = useContext(parcoursContext);
  const [rowSize, setRowSize] = useState(window.innerWidth < 1280 ? 2 : 3);

  const [deleteSkill, stateSkill] = useDeleteSkill();

  const skills = skillState.data?.skills.data;

  const showAddCard = !skills || skills.length % rowSize !== 0;

  useEffect(() => {
    if (stateSkill.data) {
      setParcours(stateSkill.data.deleteSkill);
      setDeleteId('');
    }
  }, [stateSkill.data, setParcours]);

  const onEdit = (id: string) => {
    const selectedSkill = skills?.find((s) => s.id === id);
    if (selectedSkill) history.push({ pathname: `/experience/skill/${selectedSkill.theme.id}`, search: 'edit' });
  };
  const handleRecommendation = (id: string) => {
    const selectedSkill = skills?.find((s) => s.id === id) || null;
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

  if (type !== 'personal' && type !== 'professional' && type !== 'engagement') {
    return <NotFoundPage />;
  }

  const getTitle = () => {
    switch (type) {
      case 'professional':
        return 'MES EXPÉRIENCES PROFESSIONNELLES';
      case 'engagement':
        return 'MES EXPÉRIENCES D’ENGAGEMENT';
      default:
        return 'MES EXPÉRIENCES PERSONNELLES';
    }
  };

  const getSubTitle = () => {
    switch (type) {
      case 'professional':
        return 'pro';
      case 'engagement':
        return 'd’engagement';
      default:
        return 'perso';
    }
  };

  const getUrl = () => {
    switch (type) {
      case 'professional':
        return `/experience/theme-pro${encodeUri({
          redirect: '/profile/experience?type=professional',
        })}`;
      case 'engagement':
        return `/experience/theme${encodeUri({ redirect: '/profile/experience?type=engagement', type: 'engagement' })}`;
      default:
        return `/experience/theme${encodeUri({ redirect: '/profile/experience' })}`;
    }
  };

  return (
    <div className={classes.profilContainer}>
      <div className={classes.titleContainer}>
        <Arrow />
        <Title title={getTitle()} color="#4D6EC5" size={42} className={classes.title} />
        <div className={classes.empty} />
      </div>
      <span className={classes.text}>Liste des expériences {getSubTitle()} que tu as renseignées</span>
      {skillState.loading ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.cardGridContainer}>
          <Grid container spacing={4}>
            {skills
              ?.filter((s) => s.theme?.type === type)
              .map((s) => (
                <Grid key={s.id} item xs={12} sm={12} md={6} lg={4} className={classes.cardGrid}>
                  <Card
                    edit={onEdit}
                    recommendation={handleRecommendation}
                    remove={handleDelete}
                    id={s.id}
                    competence={s.competences}
                    title={s.theme.title}
                    src={
                      type === 'professional'
                        ? secteurs?.themes.data.find((secteur) => secteur.id === s.theme.parentId)?.resources?.icon
                        : s.theme.resources?.icon
                    }
                    type={type}
                    icon={s?.engagement?.context?.icon}
                  />
                </Grid>
              ))}

            <Link to={getUrl()} className={classNames(!showAddCard ? classes.btnLink : classes.link)}>
              <Button className={classes.btn}>
                <span className={classes.textButton}>J’ajoute une expérience {getSubTitle()}</span>
              </Button>
            </Link>
          </Grid>
        </div>
      )}
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
