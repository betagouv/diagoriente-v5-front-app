import React, { useContext, useState, useRef, useEffect } from 'react';
import { useJob } from 'requests/jobs';
import Title from 'components/common/Title/Title';
import { useDidMount, useWillUnmount } from 'hooks/useLifeCycle';
import { RouteComponentProps, Link } from 'react-router-dom';
import Arrow from 'assets/svg/arrow';
import TestImage from 'assets/svg/test.svg';
import LogoLocation from 'assets/form/location.png';
import Spinner from 'components/Spinner/Spinner';
import useOnclickOutside from 'hooks/useOnclickOutside';
import HeartOutLine from 'assets/svg/outlineHeart.svg';
import fullHeart from 'assets/svg/fullHeart.svg';
import userContext from 'contexts/UserContext';
import parcoursContext from 'contexts/ParcourContext';
import ModalContainer from 'components/common/Modal/ModalContainer';
import defaultAvatar from 'assets/svg/defaultAvatar.svg';
import { Jobs } from 'requests/types';
import { useFamilies } from 'requests/familles';
import { useAddFavoris, useDeleteFavoris, useListFavoris } from 'requests/favoris';
import ImmersionForm from '../../components/Immersion/ImmersionForm';
import ModalContainerInfo from '../Modals/JobInfo';
import ModalQuestion from '../Modals/ModalQuestion/ModalQuestion';
import Graph from '../../components/GraphCompetence/GraphCompetence';
import useStyles from './styles';

interface IProps extends RouteComponentProps<{ id: string }> {
  jobs?: Jobs[];
  locationCall: (i: any) => any;
  listLocation?: { label: string; coordinates: string[] }[];
  setSelectedLocation: (i: string) => void;
  selectedLocation: string;
}

const JobContainer = ({
  location,
  history,
  jobs,
  locationCall,
  listLocation,
  setSelectedLocation,
  selectedLocation,
}: IProps) => {
  const classes = useStyles();
  const divRef = useRef<HTMLDivElement>(null);
  const [openTest, setOpenTest] = useState(false);
  const [openInfo, setInfo] = useState(false);
  const [selectedImmersion, setSelectedImmersion] = useState<string | undefined>('');
  const [selectedImmersionCode, setSelectedImmersionCode] = useState('');
  const [coordinates, setCoordinates] = useState<string[]>([]);
  const [openImmersion, setOpenImmersion] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);
  const [errorLocation, setErrorLocation] = useState(false);
  const [isFav, setIsFav] = useState('');
  const param = location.pathname.substr(10);
  const [addFavCall, addFavState] = useAddFavoris();
  const [deleteFavCall, deleteFavState] = useDeleteFavoris();
  const [loadFav, { data: FavData, loading: loadingFav }] = useListFavoris();
  const [loadJob, { data, loading, refetch }] = useJob({ variables: { id: param } });
  const { data: loadFamille } = useFamilies();

  useDidMount(() => {
    loadJob();
    loadFav();
  });
  useEffect(() => {
    if (selectedLocation !== '') {
      locationCall(selectedLocation);
    }
  }, [selectedLocation, locationCall]);

  useEffect(() => {
    if (FavData) {
      const fav = FavData?.favorites.data.find((el) => el.job === param);
      if (fav?.id) {
        setIsFav(fav.id);
      }
    }
  }, [FavData, loadingFav, param]);

  useEffect(() => {
    if (data?.job) {
      setSelectedImmersion(data?.job.title);
      setSelectedImmersionCode(data.job.rome_codes);
    }
  }, [data, loadFamille]);

  useEffect(() => {
    if (addFavState.data) {
      const fn = data ? refetch : loadJob;
      fn();
    }
  }, [addFavState.data, loadJob, data, refetch]);

  useEffect(() => {
    if (deleteFavState.data) {
      const fn = FavData ? refetch : loadJob;
      fn();
    }
  }, [deleteFavState.data, loadJob, FavData, refetch]);

  useEffect(() => {
    if (!addFavState.loading && addFavState.data) {
      setIsFav(addFavState.data.createFavorite.id);
      loadFav();
    }
  }, [addFavState, loadFav]);
  useEffect(() => {
    if (listLocation) {
      const t = listLocation.find((el) => el.label === selectedLocation);
      if (t) {
        setCoordinates(t.coordinates);
      }
    }
  }, [listLocation, selectedLocation]);

  const onChangeImmersion = (e: any) => {
    const { value } = e.target;
    setSelectedImmersion(value);
    setOpenImmersion(true);
    setFiltredArray(jobs?.filter((el: any) => el.title.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  };

  const onChangeLocation = (e: any) => {
    const { value } = e.target;
    setOpenLocation(true);
    setSelectedLocation(value);
  };

  const { user } = useContext(userContext);
  const { parcours } = useContext(parcoursContext);
  const competences = parcours?.globalCompetences;
  const d: any = [];
  useOnclickOutside(divRef, () => {});

  parcours?.families.forEach((item) => {
    data?.job.interests.forEach((el) => {
      if (el._id.nom === item.nom) {
        d.push(item);
      }
    });
  });

  const handleClose = () => {
    setInfo(false);
    setOpenTest(false);
  };
  const onSelect = (e: any | undefined) => {
    if (e) {
      setSelectedLocation(e.label);
      setCoordinates(e.value.coordinates);
      setOpenLocation(false);
    }
  };
  const onSelectImmersion = (e: any | undefined) => {
    if (e) {
      setSelectedImmersion(e.label);
      setSelectedImmersionCode(e.value);
      setOpenImmersion(false);
    }
  };
  const addToFav = () => {
    const dataFav = {
      interested: true,
      job: param,
      parcour: parcours?.id,
    };
    addFavCall({ variables: dataFav });
  };

  const deleteFromFav = () => {
    setIsFav('');
    deleteFavCall({ variables: { id: isFav } });
  };
  const onClickImmersion = () => {
    setErrorLocation(true);
    if (selectedLocation) {
      history.push({
        pathname: `/jobs/immersion/${param}`,
        search: `?romeCodes=${selectedImmersionCode}&latitude=${coordinates[1]}&longitude=${
          coordinates[0]
        }&pageSize=${6}&distances=${5}&selectedLoc=${selectedLocation}`,
      });
    }
  };
  useWillUnmount(() => {
    setSelectedLocation('');
  });
  return (
    <div className={classes.root}>
      <div className={classes.bandeau}>
        {loading ? <Spinner /> : <Title color="#fff" title={data?.job.title || ''} size={42} />}
      </div>
      <div className={classes.contentInfo}>
        <div className={classes.JobInfo}>
          <div className={classes.jobDescription}>
            <Link to="/jobs">
              <div className={classes.back}>
                <Arrow color="#DB8F00" height="15" width="9.5" className={classes.arrow} />
                <div className={classes.textBack}>Retour à Mon Top métiers</div>
              </div>
            </Link>
            <div className={classes.titleDescription}>{data?.job.title}</div>
            <div>{data?.job.description}</div>
            <div className={classes.footerDescription}>
              <div className={classes.textTest} onClick={() => setInfo(true)}>
                En savoir plus
              </div>
              <div className={classes.testContainer}>
                <img src={TestImage} alt="" className={classes.testLogo} />
                <div className={classes.textTest} onClick={() => setOpenTest(true)}>
                  Ce métier est-il fait pour toi ?
                </div>
              </div>
            </div>
          </div>
          <div className={classes.favorisContainer}>
            <div className={classes.favoris} onClick={!data?.job.favorite ? addToFav : deleteFromFav}>
              <img src={data?.job.favorite ? fullHeart : HeartOutLine} alt="" />
              <div className={classes.textFavoris}>
                {!data?.job.favorite ? 'Ajouter à mes favoris' : 'Enlever de mes favoris'}
              </div>
            </div>
            <div className={classes.immersionFormContainer}>
              <ImmersionForm
                filteredArray={filteredArray}
                onChangeImmersion={onChangeImmersion}
                onSelectImmersion={onSelectImmersion}
                selectedImmersion={selectedImmersion}
                openImmersion={openImmersion}
                onChangeLocation={onChangeLocation}
                onSelect={onSelect}
                selectedLocation={selectedLocation}
                listLocation={listLocation}
                LogoLocation={LogoLocation}
                openLocation={openLocation}
                onClickImmersion={onClickImmersion}
                setOpenLocation={setOpenLocation}
                errorLocation={errorLocation}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.interestInfo}>
        <div className={classes.wrapInterest}>
          <div className={classes.interestTitleContainer}>
            <span className={classes.interestTitle}>Centres d’intérêt</span>
            <span className={classes.descriptionTitle}>Voici les centres d’intérêt associés à ce métier :</span>
          </div>
          <div className={classes.interestContainer}>
            <div className={classes.interests}>
              {data?.job.interests.map((el) => {
                const { nom } = el._id;
                const res = nom && nom.replace(/\//g, '');
                const f = loadFamille?.families.data.find((fm) => fm.nom === el._id.nom);
                return (
                  <div className={classes.infoInterstDescription} key={el._id.id}>
                    <div className={classes.gifInterest}>
                      <img src={f?.resources[2]} alt="" />
                    </div>
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
        {openInfo ? (
          <ModalContainerInfo job={data?.job} handleClose={handleClose} />
        ) : (
          <ModalQuestion job={data?.job} handleClose={handleClose} />
        )}
      </ModalContainer>
    </div>
  );
};

export default JobContainer;
