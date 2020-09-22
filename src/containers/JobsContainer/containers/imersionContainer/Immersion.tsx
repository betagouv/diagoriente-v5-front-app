import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useJob } from 'requests/jobs';
import { useImmersion } from 'requests/immersion';
import { Company, Jobs } from 'requests/types';

import { useForm } from 'hooks/useInputs';
import { useDidMount } from 'hooks/useLifeCycle';
import classNames from 'utils/classNames';
import ModalContainer from 'components/common/Modal/ModalContainer';
import ImageTitle from 'components/common/TitleImage/TitleImage';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/nextButton/nextButton';

import Arrow from 'assets/svg/arrow';
import TraitJaune from 'assets/images/trait_jaune.svg';
import Edit from 'assets/svg/edit.svg';
import LogoLocation from 'assets/form/location.png';
import msg from 'assets/svg/msgorange.svg';
import attention from 'assets/svg/attentionpink.svg';
import { decodeUri } from 'utils/url';

import Loupe from 'assets/svg/loupe';

import ImmersionForm from '../../components/Immersion/ImmersionForm';
import ModalConseil from '../Modals/ConseilModal/ConseilModal';
import ModalContact from '../Modals/ContactModal/ContactModal';
import CardImmersion from '../../components/CardImmersion/CardImmersion';
import CheckBox from '../../components/checkBox/ChexBox';
import Switch from '../../components/Switch/Switch';
// import SwitchRayon from '../../components/SwitchRayon/SwitchRayon';
import useStyles from './styles';

interface IProps extends RouteComponentProps<{ id: string }> {
  jobs: Jobs[];
  locationCall: (i: any) => any;
  listLocation?: { label: string; coordinates: string[] }[];
  setSelectedLocation: (i: string) => void;
  selectedLocation: string;
}

const ImmersionContainer = ({
  location,
  match,
  jobs,
  locationCall,
  listLocation,
  setSelectedLocation,
  selectedLocation,
}: IProps) => {
  const classes = useStyles();
  const [openContact, openContactState] = useState(null as null | Company);
  const [openConseil, openConseilState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openImmersion, setOpenImmersion] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [update, setUpdate] = useState(false);

  const [selectedTaille, setSelectedTaille] = useState('Toutes tailles');
  const [selectedDistance, setSelectedDistance] = useState('5 km');

  const [selectedTri, setSelectedTri] = useState('Toutes tailles');

  const [selectedImmersion, setSelectedImmersion] = useState<string | undefined>('');
  const [selectedImmersionCode, setSelectedImmersionCode] = useState('');
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<number[]>([]);

  const [state, actions] = useForm({
    initialValues: {
      tri: '',
      taille: 'all',
      rayon: '',
      distance: '5',
      switch: true,
      switchRayon: '',
    },
  });

  const [immersionCall, immersionState] = useImmersion();
  const { search } = location;
  const {
    romeCodes, latitude, longitude, pageSize, distances, selectedLoc,
  } = decodeUri(search);
  const param = match.params.id;
  const [loadJob, { data, loading }] = useJob({ variables: { id: param } });
  useDidMount(() => {
    loadJob();
  });
  useEffect(() => {
    setSelectedImmersion(data?.job.title);
    setSelectedLocation(selectedLoc);
    setSelectedImmersionCode(romeCodes);
    setCoordinates([Number(longitude), Number(latitude)]);
  }, [latitude, longitude, selectedLoc, romeCodes, data, setSelectedLocation]);

  const handleClose = () => {
    openContactState(null);
    openConseilState(false);
  };

  const handleCloseContact = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
  };
  const PAGES = immersionState.data?.immersions.companies_count / 6;
  useEffect(() => {
    if (selectedLocation !== '') {
      locationCall(selectedLocation);
    }
  }, [selectedLocation, locationCall]);
  useEffect(() => {
    if (PAGES) {
      const lengthItem = Math.round(PAGES);
      const a = Array.from(Array(lengthItem), (_, i) => i + 1);
      setItems(a);
    }
  }, [PAGES]);

  useEffect(() => {
    if (open === true) {
      openContactState(null);
    }
  }, [open, openContact]);
  useEffect(() => {
    if (romeCodes && latitude && longitude && pageSize && distances) {
      const args = {
        rome_codes: romeCodes,
        latitude: Number(latitude),
        longitude: Number(longitude),
        page_size: Number(pageSize),
        page: Number(page),
        distance: Number(state.values.distance),
        headcount: state.values.taille,
      };
      const dataToSend = state.values.tri ? { ...args, sort: state.values.tri } : args;
      immersionCall({ variables: dataToSend });
    }
  }, [
    romeCodes,
    latitude,
    longitude,
    pageSize,
    distances,
    state.values.distance,
    state.values.taille,
    state.values.tri,
    immersionCall,
    page,
  ]);

  const getData = (pg: number) => {
    setPage(pg);
  };

  const tri = [
    {
      label: 'Distance',
      value: 'distance',
    },
  ];
  const taille = [
    {
      label: 'Toutes tailles',
      value: 'all',
    },
    {
      label: 'Moins de 50 salariés',
      value: 'small',
    },
    {
      label: 'Plus de 50 salariés',
      value: 'big',
    },
  ];
  const distance = [
    {
      label: '5 km',
      value: '5',
    },
    {
      label: '10 km',
      value: '10',
    },
    {
      label: '30 km',
      value: '30',
    },
    {
      label: '50 km',
      value: '50',
    },
    {
      label: '100 km',
      value: '100',
    },
    {
      label: '+ de 100 km',
      value: '+ de 100 km',
    },
  ];
  const onChangeTri = (el: { label: string; value: string }) => {
    if (selectedTri === el.label) {
      actions.setValues({ tri: '' });
      setSelectedTri('');
    } else {
      setSelectedTri(el.label);
      actions.setValues({ tri: el.value });
    }
  };
  const onChangeTaille = (el: { label: string; value: string }) => {
    if (selectedTaille === el.label) {
      actions.setValues({ taille: '' });
      setSelectedTaille('');
    } else {
      setSelectedTaille(el.label);
      actions.setValues({ taille: el.value });
    }
  };

 /*  const onChangeRayon = (s: string) => {
    if (state.values.switchRayon === s) {
      actions.setValues({ switchRayon: '' });
    } else {
      actions.setValues({ switchRayon: s });
    }
  }; */
  const onChangeDistance = (el: { label: string; value: string }) => {
    if (selectedDistance === el.label) {
      actions.setValues({ distance: '' });
      setSelectedDistance('');
    } else {
      setSelectedDistance(el.label);
      actions.setValues({ distance: el.value });
      setPage(1);
    }
  };
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
  const onClickImmersion = () => {
    const dataTo = {
      rome_codes: selectedImmersionCode,
      latitude: coordinates[1],
      longitude: coordinates[0],
      page_size: 6,
      distance: 5,
    };
    immersionCall({ variables: dataTo });
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.titleContainer}>
          <Link to={`/jobs/job/${param}`}>
            <div className={classes.back}>
              <Arrow color="#DB8F00" height="15" width="9.5" className={classes.arrow} />
              {!loading && <div className={classes.textBack}>{`Retour à la page ${data?.job.title}`}</div>}
            </div>
          </Link>
          <ImageTitle
            title="TROUVER UNE IMMERSION"
            color="#DB8F00"
            image={TraitJaune}
            size={42}
            className={classes.titleImmersion}
          />
          <div className={classes.empty} />
        </div>

        <div className={classes.wrapper}>
          <div className={classes.filtersContainer}>
            {update ? (
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
                  setOpenLocation={setOpenLocation}
                  onClickImmersion={onClickImmersion}
                />
              </div>
            ) : (
              <div className={classes.boxSearch}>
                <div className={classes.textTitleContainer}>
                  <Loupe color="#FFA600" width="32" height="32" />
                  <div className={classes.textTitle}>MA RECHERCHE</div>
                </div>
                <div>
                  Je recherche une <strong>immersion</strong> pour le métier de
                  <b> {data?.job.title} </b>à {selectedLoc}.
                </div>
                <div className={classes.edit}>
                  <img src={Edit} alt="" />
                  <div className={classes.textEdit} onClick={() => setUpdate(!update)}>
                    Modifier
                  </div>
                </div>
              </div>
            )}
            <div className={classes.filters}>
              <div className={classes.switchMask}>
                <Switch
                  checked={state.values.switch}
                  onClick={() => actions.setValues({ switch: !state.values.switch })}
                />
                <div className={classes.maskTitle}>Masquer la carte</div>
              </div>
              <div className={classes.TrierContainer}>
                <div className={classes.filterMainTitle}>Trier</div>
                {tri.map((el) => (
                  <CheckBox key={el.label} label={el.label} onClick={() => onChangeTri(el)} value={selectedTri} />
                ))}
              </div>
              <hr className={classes.bar} />
              <div className={classes.filterMainTitle}>Affiner la rechercher</div>

              <div className={classes.tailleContainer}>
                <div className={classes.filterTitle}>Taille de l’entreprise</div>
                {taille.map((el) => (
                  <CheckBox key={el.label} label={el.label} value={selectedTaille} onClick={() => onChangeTaille(el)} />
                ))}
              </div>

              {/*  <div className={classes.filterTitle}>Rayon de recherche</div>
              <SwitchRayon checked={state.values.switchRayon} onClick={onChangeRayon} /> */}
              <div className={classes.distanceContainer}>
                <div className={classes.filterTitle}>Distance</div>
                {distance.map((el) => (
                  <CheckBox
                    key={el.label}
                    label={el.label}
                    value={selectedDistance}
                    onClick={() => onChangeDistance(el)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={classes.results}>
            {immersionState.loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className={immersionState.loading ? classes.loadingContainer : ''}>
                  <Spinner />
                </div>
              </div>
            )}
            {immersionState.data ? (
              <>
                <div className={classes.resultTitle}>
                  {`${immersionState.data?.immersions.companies_count} résultats`}
                </div>
                <div>{immersionState.data?.immersions.companies.length === 0 && 'Augmente ta zone de recherche pour plus de résultats'}</div>
                {immersionState.data?.immersions.companies?.map((e: Company) => (
                  <CardImmersion
                    data={e}
                    key={e.siret}
                    onClickContact={() => openContactState(e)}
                    onClickConseil={() => openConseilState(true)}
                    showMap={state.values.switch}
                  />
                ))}
                {immersionState.data?.immersions.companies.length !== 0 && (
                  <div className={classes.paginationContainer}>
                    {page >= 3 && (
                      <div className={classNames(classes.itemPage)}>
                        <span onClick={() => getData(1)}>1</span>
                        {page !== 2 && <span> ...</span>}
                      </div>
                    )}
                    {items
                      .filter((el) => el === page || el === page + 1 || el === page - 1)
                      .map((el) => (
                        <div
                          key={el}
                          className={classNames(classes.itemPage, el === page && classes.boldItem)}
                          onClick={() => getData(el)}
                        >
                          {el}
                        </div>
                      ))}
                    {page <= items.length - 2 && (
                      <div className={classNames(classes.itemPage)}>
                        {page !== items.length - 2 && <span>... </span>}
                        <span onClick={() => getData(items.length - 1)}>{items.length}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <ModalContainer
        open={!!openContact || openConseil}
        handleClose={handleClose}
        backdropColor="#011A5E"
        colorIcon="#DB8F00"
      >
        {!openContact ? (
          <ModalConseil handleClose={handleClose} />
        ) : (
          <ModalContact setOpen={setOpen} openContact={openContact} />
        )}
      </ModalContainer>
      <ModalContainer open={open} handleClose={handleCloseContact} backdropColor="#011A5E" colorIcon="#DB8F00">
        <div className={classes.modalContainer}>
          <div className={classes.titleContainerContact}>CONTACTER LA BOUCHERIE DU MARAIS</div>

          <img src={msg} height={90} className={classes.iconBackground} alt=" " />

          <div className={classes.descriptionModalContainer}>
            Ton message a bien été envoyé ! Tu seras averti.e dans la partie
            <br />
            “Mes démarches” de ton profil lorsque l’entreprise t’aura répondu.
          </div>
          <div className={classes.message}>
            <img src={attention} height={29} width={29} className={classes.iconAttention} alt=" " />
            Attention : l&rsquo;immersion est un dispositif bien encadré, ne commence jamais sans avoir au préalable
            rempli une convention avec ta structure d’accueil!{' '}
          </div>
          <Button ArrowColor="#011A5E" classNameTitle={classes.btnLabel} className={classes.btn} onClick={handleOk}>
            <div className={classes.okButton}>
              <span className={classes.okText}>OK</span> <span>!</span>
            </div>
          </Button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ImmersionContainer;
