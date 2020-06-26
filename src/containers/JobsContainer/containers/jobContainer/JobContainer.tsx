import React, { useContext, useState, useRef, useEffect } from 'react';
import { useJob } from 'requests/jobs';
import Title from 'components/common/Title/Title';
import { useDidMount } from 'hooks/useLifeCycle';
import { RouteComponentProps, Link } from 'react-router-dom';
import Arrow from 'assets/svg/arrow';
import TestImage from 'assets/svg/test.svg';
import Spinner from 'components/Spinner/Spinner';
import useOnclickOutside from 'hooks/useOnclickOutside';
import HeartOutLine from 'assets/svg/outlineHeart.svg';
import fullHeart from 'assets/svg/fullHeart.svg';
import userContext from 'contexts/UserContext';
import parcoursContext from 'contexts/ParcourContext';
import Loupe from 'assets/svg/loupe';
import Button from 'components/button/Button';
import ModalContainer from 'components/common/Modal/ModalContainer';
import defaultAvatar from 'assets/svg/defaultAvatar.svg';
import { useAddFavoris } from 'requests/favoris';
import { isEmpty } from 'lodash';
import ModalContainerInfo from '../Modals/JobInfo';
import ModalQuestion from '../Modals/ModalQuestion/ModalQuestion';
import Graph from '../../components/GraphCompetence/GraphCompetence';
import AutoComplete from '../../components/Autocomplete/AutoCompleteJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

const JobContainer = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const divRef = useRef<HTMLDivElement>(null);
  const [openTest, setOpenTest] = useState(false);
  const [openInfo, setInfo] = useState(false);
  const param = location.pathname.substr(6);
  const [addFavCall, addFavState] = useAddFavoris();

  const [loadJob, { data, loading, refetch }] = useJob({ variables: { id: param } });
  useDidMount(() => {
    loadJob();
  });

  const { user } = useContext(userContext);
  const { parcours } = useContext(parcoursContext);
  const competences = parcours?.globalCompetences;
  const d: any = [];
  useOnclickOutside(divRef, () => {});

  if (data?.job && parcours?.families) {
    parcours?.families.map((item) => {
      data?.job.interests.map((el) => {
        if (el._id.nom === item.nom) {
          d.push(item);
        }
      });
    });
  }
  const handleClose = () => {
    setInfo(false);
    setOpenTest(false);
  };
  const addToFav = () => {
    const dataFav = {
      interested: true,
      job: param,
      parcour: parcours?.id,
    };
    addFavCall({ variables: dataFav });
  };
  useEffect(() => {
    if (addFavState.data) {
      const fn = data ? refetch : loadJob;
      fn();
    }
  }, [addFavState.data, loadJob, data, refetch]);
  return (
    <div className={classes.root}>
      <div className={classes.bandeau}>
        {loading ? <Spinner /> : <Title color="#fff" title={data?.job.title || ''} size={42} />}
      </div>
      <div className={classes.contentInfo}>
        <div className={classes.headerInfo}>
          <Link to="/jobs">
            <div className={classes.back}>
              <Arrow color="#DB8F00" height="15" width="9.5" className={classes.arrow} />
              <div className={classes.textBack}>Retour à Mon Top métiers</div>
            </div>
          </Link>
          <div className={classes.favoris} onClick={addToFav}>
            <img src={data?.job.favorite ? fullHeart : HeartOutLine} alt="" />
            <div className={classes.textFavoris}>Ajouter à mes favoris</div>
          </div>
        </div>
        <div className={classes.JobInfo}>
          <div className={classes.jobDescription}>
            <div className={classes.titleDescription}>{data?.job.title}</div>
            <div>{data?.job.description}</div>
            <div className={classes.footerDescription}>
              <div className={classes.textTest} onClick={() => setInfo(true)}>
                En savoir plus
              </div>
              <div className={classes.testContainer}>
                <img src={TestImage} alt="" className={classes.testLogo} />
                <div className={classes.textTest} onClick={() => setOpenTest(true)}>
                  Ce métier est-il fait pour toi ? Fais le test !
                </div>
              </div>
            </div>
          </div>
          <div className={classes.immersion}>
            <div className={classes.logoContainer}>
              <Loupe color="#FFA600" width="42" height="42" />
            </div>
            <div className={classes.titleImersion}>Trouver une immersion ou une formation</div>
            <div>Je recherche :</div>
            <Select
              onChange={() => {}}
              name="imersion"
              value={[]}
              onClick={() => {}}
              onSelectText={() => {}}
              options={[]}
              reference={divRef}
            />
            <AutoComplete
              onChange={() => {}}
              name="imersion"
              value=""
              onSelectText={() => {}}
              options={[]}
              placeholder="à Paris, Dijon, Lille..."
            />
            <div className={classes.btnImersionContainer}>
              <Link to={`/jobs/immersion/${param}`}>
                <Button className={classes.btnImersion}>
                  <div className={classes.btnLabel}>Chercher</div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.interestInfo}>
        <div className={classes.wrapInterest}>
          <div className={classes.interestTitleContainer}>
            <span className={classes.interestTitle}>Centres d’intérêts</span>
            <span className={classes.descriptionTitle}>Voici les centres d’intérêts associés à ce métier :</span>
          </div>
          <div className={classes.interestContainer}>
            <div className={classes.interests}>
              {data?.job.interests.map((el) => {
                const { nom } = el._id;
                const res = nom && nom.replace(/\//g, '');
                return (
                  <div className={classes.infoInterstDescription} key={el._id.id}>
                    <div className={classes.gifInterest} />
                    <div className={classes.titleInterest}>{res}</div>
                  </div>
                );
              })}
            </div>
            <div className={classes.infoInterst}>
              <div className={classes.logo}>
                <img src={user?.logo || defaultAvatar} alt="" width={69} height={61} />
              </div>
              <div>
                <span className={classes.infoInterestPurpleText}>
                  {`${d.length} intérêts sur ${data?.job.interests.length}`}
                </span>{' '}
                en commun avec les tiens.
              </div>
              <div> Ce métier semble plutôt bien te correspondre ! </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.competenceInfo}>
        <div className={classes.competenceContainer}>
          <div className={classes.interestTitleContainer}>
            <span className={classes.interestTitle}>Compétences</span>
            <span className={classes.descriptionTitle}>Voici les compétences associées à ce métier :</span>
          </div>
          <Graph competencesrequises={data?.job.competences} competenceUser={competences} />
          <div className={classes.headerInfo}>
            <Link to="/jobs">
              <div className={classes.back}>
                <Arrow color="#DB8F00" height="15" width="9.5" className={classes.arrow} />
                <div className={classes.textBack}>Retour à Mon Top métiers</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ModalContainer
        open={openTest || openInfo}
        handleClose={handleClose}
        backdropColor="#011A5E"
        colorIcon="#DB8F00"
        size={70}
      >
        {openInfo ? <ModalContainerInfo job={data?.job} /> : <ModalQuestion job={data?.job} />}
      </ModalContainer>
    </div>
  );
};

export default JobContainer;
