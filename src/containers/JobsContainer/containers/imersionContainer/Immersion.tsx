import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useJob, useJobsList } from 'requests/jobs';
import { useImmersion, useFormation, useFormationLabels } from 'requests/immersion';
import { Company, Jobs, Formation } from 'requests/types';
import { useUpdateStat } from 'requests/statistique';
import userContext from 'contexts/UserContext';

import { useForm } from 'hooks/useInputs';
import { useDidMount } from 'hooks/useLifeCycle';
import classNames from 'utils/classNames';
import ModalContainer from 'components/common/Modal/ModalContainer';
import ImageTitle from 'components/common/TitleImage/TitleImage';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/nextButton/nextButton';
import Map from 'components/Map/Map';

import Arrow from 'assets/svg/arrow';
import TraitJaune from 'assets/images/trait_jaune.svg';
import Edit from 'assets/svg/edit.svg';

import LogoLocation from 'assets/form/location.png';
import msg from 'assets/svg/msgorange.svg';
import attention from 'assets/svg/attentionpink.svg';
import { decodeUri } from 'utils/url';

import Loupe from 'assets/svg/loupe';
import LogoApprentissage from 'assets/svg/picto_apprentissage.svg';
import LogoFormation from 'assets/svg/picto_formation.svg';

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
  const { user } = useContext(userContext);
  const [openContact, openContactState] = useState(null as null | Company);
  const [openConseil, openConseilState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openImmersion, setOpenImmersion] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [update, setUpdate] = useState(false);

  const [selectedTaille, setSelectedTaille] = useState('Toutes tailles');
  const [selectedDistance, setSelectedDistance] = useState('30 km');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('formation');
  const [selectedTypeResFilter, setSelectedTypeResFilter] = useState('Tout');

  const [selectedTri, setSelectedTri] = useState('Toutes tailles');
  const [typeApiImmersion, setTypeApi] = useState('');
  const [checkedTypeApiImmersion, checkedSetTypeApi] = useState('');

  const [selectedImmersion, setSelectedImmersion] = useState<any | undefined>('');
  const [selectedImmersionCode, setSelectedImmersionCode] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [insee, setInsee] = useState(0);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);
  const [dataToRender, setDataToRender] = useState<{
    type: string;
    data: undefined | any[];
    count: undefined | number;
    fetching: boolean;
  }>({
    type: '',
    data: undefined,
    count: undefined,
    fetching: false,
  });

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<number[]>([]);

  const [state, actions] = useForm({
    initialValues: {
      tri: '',
      taille: 'all',
      rayon: '',
      distance: '30',
      switch: true,
      switchRayon: '',
      diplome: '',
    },
  });

  const [immersionCall, immersionState] = useImmersion();
  const [formationCall, formationState] = useFormation();
  const [updateStatCall] = useUpdateStat();
  const [jobsListCall, jobsListState] = useJobsList();
  const [labelsCall, labelsStats] = useFormationLabels();

  const { search } = location;
  const {
    romeCodes,
    latitude,
    longitude,
    pageSize,
    distances,
    selectedLoc,
    typeApi,
    caller,
    codePost,
    updated,
  } = decodeUri(search);
  const param = match.params.id;
  const [loadJob, { data, loading }] = useJob({ variables: { id: param } });
  useDidMount(() => {
    if (user && param) {
      loadJob();
      updateStatCall({ variables: { userId: user.id, jobId: param, type: typeApi } });
    }
    if (updated && typeApi === 'entreprise') {
      jobsListCall();
    }
  });
  useEffect(() => {
    setSelectedImmersion(data?.job.title);
    setSelectedLocation(selectedLoc);
    setSelectedImmersionCode(Array(romeCodes));
    setTypeApi(typeApi);
    checkedSetTypeApi(typeApi);
    setCoordinates([Number(longitude), Number(latitude)]);
    setInsee(Number(codePost));
    setUpdate(Boolean(updated));
  }, [latitude, longitude, selectedLoc, romeCodes, data, setSelectedLocation, typeApi, codePost, updated]);

  useEffect(() => {
    if (
      (romeCodes || selectedImmersionCode) &&
      (latitude || coordinates[1]) &&
      (longitude || coordinates[0]) &&
      typeApiImmersion
    ) {
      const argsImmersion = {
        rome_codes: romeCodes || selectedImmersionCode,
        latitude: Number(latitude) || coordinates[1],
        longitude: Number(longitude) || coordinates[0],
        page_size: Number(pageSize),
        page: Number(page),
        distance: Number(state.values.distance),
        headcount: state.values.taille,
      };
      const sArgsImmersion = state.values.tri ? { ...argsImmersion, sort: state.values.tri } : argsImmersion;
      const argsFormation: {
        romes: string;
        latitude: number;
        longitude: number;
        radius: number;
        caller: string;
        insee: number;
        filter?: string;
      } = {
        romes: JSON.stringify(selectedImmersionCode),
        latitude: Number(latitude) || coordinates[1],
        longitude: Number(longitude) || coordinates[0],
        radius: Number(state.values.distance),
        caller: caller || 'test',
        filter: selectedTypeResFilter,
        insee,
      };
      const dArgsFormation = state.values.diplome ? { ...argsFormation, diploma: state.values.diplome } : argsFormation;
      if (selectedTypeResFilter !== 'tout') dArgsFormation.filter = selectedTypeResFilter;
      if (checkedTypeApiImmersion === 'entreprise') {
        immersionCall({ variables: sArgsImmersion });
      } else if (checkedTypeApiImmersion === 'formation') {
        formationCall({ variables: dArgsFormation });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    romeCodes,
    latitude,
    longitude,
    pageSize,
    selectedTypeResFilter,
    state.values.diplome,
    distances,
    state.values.distance,
    state.values.taille,
    state.values.tri,
    immersionCall,
    formationCall,
    page,
    checkedTypeApiImmersion,
    // typeApiImmersion,
    // caller,
  ]);
  useEffect(() => {
    if (
      (immersionState.data && checkedTypeApiImmersion === 'entreprise') ||
      (formationState.data && checkedTypeApiImmersion === 'formation')
    ) {
      const result = checkedTypeApiImmersion === 'entreprise' ? immersionState.data : formationState.data;
      setDataToRender({
        type: checkedTypeApiImmersion,
        data:
          checkedTypeApiImmersion === 'entreprise'
            ? result.immersions?.companies
            : result.formation.filter((i: Formation) => i.place.latitude !== null && i.place.latitude !== null),
        count:
          checkedTypeApiImmersion === 'entreprise'
            ? result.immersions.companies_count
            : result.formation.filter((i: Formation) => i.place.latitude !== null && i.place.latitude !== null).length,
        fetching: false,
      });
    }
    if (
      (immersionState.loading && checkedTypeApiImmersion === 'entreprise') ||
      (formationState.loading && checkedTypeApiImmersion === 'formation')
    ) {
      setDataToRender({
        type: '',
        data: undefined,
        count: undefined,
        fetching: true,
      });
    }
  }, [
    formationState.loading,
    immersionState.loading,
    formationState.data,
    immersionState.data,
    checkedTypeApiImmersion,
  ]);
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
  const PAGES = dataToRender.count && dataToRender.count / 6;
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
    if (labelsStats.data) {
      const ae = labelsStats.data.formationLabel.labelsAndRomes.map((e: any) => ({
        label: e.label,
        rome_codes: e.romes,
      }));
      setFiltredArray(ae);
    }
  }, [labelsStats.data]);
  const getData = (pg: number) => {
    setPage(pg);
  };
  const onTypeFilterApi = (el: { label: string }) => {
    if (checkedTypeApiImmersion === el.label) {
      checkedSetTypeApi('');
    } else {
      checkedSetTypeApi(el.label);
    }
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
  ];
  const typeRes = [
    { label: 'Tout', value: 'tout' },
    { label: 'Formations', value: 'formation', logo: LogoFormation },
    { label: 'Entreprise', value: 'entreprise', logo: LogoApprentissage },
  ];
  const diplomeFilter = [
    { label: 'Cap', value: '3 (CAP...)' },
    { label: 'Bac', value: '4 (Bac...)' },
    { label: 'BTS, DUT', value: '5 (BTS, DUT...)' },
    { label: 'Licence', value: '6 (Licence...)' },
    { label: 'Master, titre ingénieur', value: '7 (Master, titre ingénieur...)' },
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
  const onTypeFilterDiplome = (el: { label: string; value: string }) => {
    if (selectedTypeFilter === el.label) {
      actions.setValues({ diplome: '' });
      setSelectedTypeFilter('');
    } else {
      setSelectedTypeFilter(el.label);
      actions.setValues({ diplome: el.value });
      setPage(1);
    }
  };
  const onTypeFilterRes = (el: { label: string; value: string }) => {
    if (selectedTypeResFilter === el.label) {
      setSelectedTypeResFilter('');
    } else {
      setSelectedTypeResFilter(el.label);
      setPage(1);
    }
  };
  const onChangeImmersion = (e: any) => {
    const { value } = e.target;
    setSelectedImmersion(value);
    setOpenImmersion(true);
    let filtredAllArray: Jobs[] | undefined = [];
    if (updated && typeApi === 'entreprise') {
      filtredAllArray = jobsListState.data?.jobs.data;
      setFiltredArray(filtredAllArray?.filter((el: any) => el.title.toLowerCase().indexOf(value.toLowerCase()) !== -1));
    }
    if (updated && typeApi === 'formation' && value) {
      labelsCall({ variables: { search: value } });
    } else {
      setFiltredArray(jobs?.filter((el: any) => el.title.toLowerCase().indexOf(value.toLowerCase()) !== -1));
    }
    if (!value) {
      setOpenImmersion(false);
    }
  };
  const onChangeLocation = (e: any) => {
    const { value } = e.target;
    setOpenLocation(true);
    if (!value) {
      setOpenLocation(false);
    }
    setSelectedLocation(value);
  };
  const onSelect = (e: any | undefined) => {
    if (e) {
      setSelectedLocation(e.label);
      setOpenLocation(false);
      const gps = [e.value.coordinates[0], e.value.coordinates[1]];
      setCoordinates(gps);
      setInsee(e.value.postcode);
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
    if (coordinates[1] && coordinates[0] && selectedImmersionCode) {
      const dataTo = {
        rome_codes: typeof selectedImmersionCode === 'string' ? selectedImmersionCode : selectedImmersionCode[0],
        latitude: coordinates[1],
        longitude: coordinates[0],
        page_size: 6,
        distance: 30,
      };
      const argsFormation = {
        romes: JSON.stringify(selectedImmersionCode),
        latitude: coordinates[1],
        longitude: coordinates[0],
        radius: Number(state.values.distance),
        caller: 'test',
        filter: selectedTypeResFilter,
        insee,
      };
      setTypeApi(checkedTypeApiImmersion);
      if (checkedTypeApiImmersion === 'entreprise') {
        immersionCall({ variables: dataTo });
      } else {
        formationCall({ variables: argsFormation });
      }
    }
  };
  const getDescription = () => {
    if (checkedTypeApiImmersion === 'entreprise') {
      return 'Trouve une entreprise pour réaliser une immersion professionnelle, un stage dans le métier qui t’intéresse.';
    }
    return 'Trouve un centre de formation et une entreprise pour t’accueillir durant ton apprentissage.';
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.titleContainer}>
          <Link to={`/jobs/job/${param}`}>
            <div className={classes.back}>
              {param && (
                <>
                  <Arrow color="#DB8F00" height="15" width="9.5" className={classes.arrow} />
                  {!loading && <div className={classes.textBack}>{`Retour à la page ${data?.job.title}`}</div>}
                </>
              )}
            </div>
          </Link>
          <ImageTitle
            title={`TROUVER UNE ${checkedTypeApiImmersion === 'entreprise' ? 'IMMERSION' : 'FORMATION'} `}
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
                  coordinates={coordinates}
                  filteredArray={filteredArray}
                  onChangeImmersion={onChangeImmersion}
                  onSelectImmersion={onSelectImmersion}
                  selectedImmersion={selectedImmersion}
                  openImmersion={openImmersion}
                  onChangeLocation={onChangeLocation}
                  onSelect={onSelect}
                  onChangeTypeApi={onTypeFilterApi}
                  typeApi={checkedTypeApiImmersion}
                  selectedLocation={selectedLocation}
                  listLocation={listLocation}
                  LogoLocation={LogoLocation}
                  openLocation={openLocation}
                  setOpenLocation={setOpenLocation}
                  onClickImmersion={onClickImmersion}
                  setCoordinates={setCoordinates}
                  updated={Boolean(updated)}
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
                  <b> {data?.job.title} </b>à{` ${selectedLoc}`}.
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
              {checkedTypeApiImmersion === 'entreprise' && (
                <div className={classes.switchMask}>
                  <Switch
                    checked={state.values.switch}
                    onClick={() => actions.setValues({ switch: !state.values.switch })}
                  />
                  <div className={classes.maskTitle}>Masquer la carte</div>
                </div>
              )}
              {checkedTypeApiImmersion === 'entreprise' && (
                <>
                  <div className={classes.TrierContainer}>
                    <div className={classes.filterMainTitle}>Trier</div>
                    {tri.map((el) => (
                      <CheckBox key={el.label} label={el.label} onClick={() => onChangeTri(el)} value={selectedTri} />
                    ))}
                  </div>
                  <hr className={classes.bar} />
                </>
              )}
              <div className={classes.filterMainTitle}>Affiner la recherche</div>

              {checkedTypeApiImmersion === 'entreprise' && (
                <div className={classes.tailleContainer}>
                  <div className={classes.filterTitle}>Taille de l’entreprise</div>
                  {taille.map((el) => (
                    <CheckBox
                      key={el.label}
                      label={el.label}
                      value={selectedTaille}
                      onClick={() => onChangeTaille(el)}
                    />
                  ))}
                </div>
              )}

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
              {checkedTypeApiImmersion !== 'entreprise' && (
                <div className={classes.distanceContainer}>
                  <div className={classes.filterTitle}>Niveau de diplôme souhaité :</div>
                  {diplomeFilter.map((el) => (
                    <CheckBox
                      key={el.label}
                      label={el.label}
                      value={selectedTypeFilter}
                      onClick={() => onTypeFilterDiplome(el)}
                    />
                  ))}
                </div>
              )}
              {checkedTypeApiImmersion !== 'entreprise' && (
                <div className={classes.distanceContainer}>
                  <div className={classes.filterTitle}>Afficher</div>
                  {typeRes.map((el) => (
                    <div className={classes.wrapperRes}>
                      <CheckBox
                        key={el.label}
                        label={el.label}
                        logo={el.logo}
                        value={selectedTypeResFilter}
                        onClick={() => onTypeFilterRes(el)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={classes.results}>
            {immersionState.loading && (
              <div className={classes.loadinContainer}>
                <div className={immersionState.loading ? classes.loadingContainer : ''}>
                  <Spinner />
                </div>
              </div>
            )}
            {dataToRender ? (
              <>
                <div className={classes.resultTitle}>
                  {!dataToRender.fetching && dataToRender?.count === undefined && getDescription()}
                </div>
                {dataToRender.fetching && <div className={classes.resultTitle}>chargement en cours...</div>}
                <div className={classes.resultTitle}>
                  {dataToRender?.count !== undefined && <div>{`${dataToRender?.count} résultats`}</div>}
                </div>
                <div>
                  {dataToRender?.count === 0 &&
                    !dataToRender.fetching &&
                    'Note: Augmente ta zone de recherche pour plus de résultats'}
                </div>

                <div>
                  {dataToRender.type === 'formation' && (
                    <>
                      <div>
                        <div>
                          <span className={classes.orangeText}>
                            {dataToRender.data?.filter((el) => el.ideaType === 'formation').length}
                          </span>
                          <span className={classes.orangeText}> Formations</span>
                          <span className={classes.grayText}> et </span>
                          <span className={classes.blueText}>
                            {dataToRender.data?.filter((el) => el.ideaType !== 'formation').length}
                          </span>
                          <span className={classes.blueText}> Entreprises </span>
                          <span className={classes.grayText}>correspondent à votre recherche</span>
                        </div>
                      </div>
                      <div className={classes.wrapperSwitchMap}>
                        <div className={classes.switchMask}>
                          <Switch
                            checked={state.values.switch}
                            onClick={() => actions.setValues({ switch: !state.values.switch })}
                          />
                          <div className={classes.maskTitle}>Masquer la carte</div>
                        </div>
                      </div>
                      {state.values.switch && (
                        <Map type="formation" dataList={dataToRender.data} className={classes.mapFormation} />
                      )}
                    </>
                  )}
                </div>
                {dataToRender.data?.map((e: Company) => (
                  <CardImmersion
                    data={e}
                    key={e.siret}
                    onClickContact={() => openContactState(e)}
                    onClickConseil={() => openConseilState(true)}
                    showMap={state.values.switch}
                    typeApiImmersion={typeApiImmersion}
                    lng={coordinates[0]}
                    lat={coordinates[1]}
                  />
                ))}
                {dataToRender.data?.length !== 0 && (
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
