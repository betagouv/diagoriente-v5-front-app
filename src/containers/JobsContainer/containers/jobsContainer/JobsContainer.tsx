import React, {
 useContext, useState, useEffect, useRef, useMemo, useLayoutEffect,
} from 'react';
import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/TitleImage/TitleImage';
import ParcoursContext from 'contexts/ParcourContext';
import localForage from 'localforage';
import { Link } from 'react-router-dom';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useAccessibility } from 'requests/accessibility';
import { useTypeJob } from 'requests/environment';
import { useJobs } from 'requests/jobs';
import { Jobs } from 'requests/types';
import { useSecteurs } from 'requests/themes';
import Trait from 'assets/images/trait_jaune.svg';
import Reset from 'components/common/Rest/Rest';
import Spinner from 'components/Spinner/Spinner';
import Autocomplete from '../../components/Autocomplete/AutoCompleteJob';
import JobCard from '../../components/Card/CardJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

const JobsContainer = () => {
  const classes = useStyles();

  const [renderedJobs, setRenderedJobs] = useState(0);
  const [domaine, setDomaine] = useState<string[] | undefined>([]);
  const [search, setSearch] = useState<string | undefined>('');
  const [environments, setJob] = useState<string[] | undefined>([]);
  const [accessibility, setAccessibility] = useState<string[] | undefined>([]);
  const [openType, setOpenType] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);

  const divDomaine = useRef<HTMLDivElement>(null);
  const divType = useRef<HTMLDivElement>(null);
  const divAcc = useRef<HTMLDivElement>(null);

  const { parcours } = useContext(ParcoursContext);

  const [clearMessage, setClearMessage] = useState<null | boolean>(null);
  const variables: { search?: string; niveau?: string[]; environments?: string[]; secteur?: string[] } = {};
  if (accessibility?.length !== 0) variables.niveau = accessibility;
  if (environments?.length !== 0) variables.environments = environments;
  if (domaine?.length !== 0) variables.secteur = domaine;
  if (domaine) variables.search = search;
  const [loadJobs, { data, loading, refetch }] = useJobs({ variables });
  const { data: listAccData, loading: listAccLoading } = useAccessibility();
  const { data: listTypeData, loading: listTypeLoading } = useTypeJob();
  const { data: listSecteurData, loading: listSecteurLoading } = useSecteurs({ variables: { type: 'secteur' } });

  useEffect(() => {
    if (parcours?.completed) {
      const fn = data ? refetch : loadJobs;
      fn();
    }

    // eslint-disable-next-line
  }, [parcours, accessibility, environments, domaine, domaine]);

  useEffect(() => {
    async function c() {
      const res = await localForage.getItem('messages');
      if (res === null) {
        setClearMessage(true);
      }
    }
    c();
  }, []);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      const length = Number(data?.myJobs.length);
      if (renderedJobs < length) {
        setRenderedJobs(Math.min(renderedJobs + 10, length));
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [renderedJobs, data]);

  useEffect(() => {
    if (data) setRenderedJobs(10);
  }, [data]);

  const jobs = useMemo(() => data?.myJobs.slice(0, renderedJobs) || [], [data, renderedJobs]);

  useOnclickOutside(divDomaine, () => {
    if (openDomain) {
      setOpenDomain(false);
    }
  });
  useOnclickOutside(divType, () => setOpenType(false));
  useOnclickOutside(divAcc, () => setOpenAcc(false));

  const setMessage = async () => {
    setClearMessage(false);
    await localForage.setItem('messages', false);
  };

  const onSelect = (label?: string) => {
    setSearch(label);
    // setOpen(false);
  };

  const onChangeSelect = (e: any) => {
    const v = e.target.value;
    setSearch(v);
    setFiltredArray(data?.myJobs.filter((el: any) => el.title.toLowerCase().indexOf(v.toLowerCase()) !== -1));
    // setOpen(true);
  };
  const onSelectDomaine = (label?: string) => {
    if (label) {
      const array = [...domaine];
      if (array.includes(label)) {
        const index = array.indexOf(label);
        array.splice(index, 1);
      } else {
        array.push(label);
      }
      setDomaine(array);
    }
  };
  const onSelectAcc = (label?: string) => {
    if (label) {
      const array = [...accessibility];
      if (array.includes(label)) {
        const index = array.indexOf(label);
        array.splice(index, 1);
      } else {
        array.push(label);
      }
      setAccessibility(array);
    }
  };
  const onSelectType = (label?: string) => {
    if (label) {
      const array = [...environments];
      if (array.includes(label)) {
        const index = array.indexOf(label);
        array.splice(index, 1);
      } else {
        array.push(label);
      }
      setJob(array);
    }
  };

  return (
    <div>
      {clearMessage && (
        <div className={classes.messages}>
          <div className={classes.contentMessage}>
            <div className={classes.text}>
              <div>Pour voir une sélection personnalisée de métiers qui pourraient te plaire,</div>
              <div>
                commence à remplir ton profil en ajoutant tes
                {' '}
                <Link to="/experience">
                  {' '}
                  <span className={classes.clearTextBold}>expériences</span>
                </Link>
                {' '}
                et tes
                {' '}
                <Link to="/interet">
                  <span className={classes.clearTextBold}>centres d'intérêts</span>
                </Link>
                {' '}
              </div>
            </div>
            <div>
              <div onClick={() => setMessage()} className={classes.clearMessage}>
                <div className={classes.clearText}>Ok, masquer ce message</div>
                <Reset color="#D60051" size={32} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.titleContainer}>
            <div className={classes.logoContainer}>
              <img src={Logo} alt="log" />
            </div>
            <Title
              title={parcours?.completed ? 'MON TOP METIERS' : 'TOUS LES MÉTIERS'}
              font="ocean"
              size={42}
              width={225}
              color="#DB8F00"
              image={Trait}
            />
          </div>
          <div className={classes.subTitle}>Sélectionné en fonction de tes réponses</div>
          <div className={classes.filtersContainer}>
            <div className={classes.filterTitleContainer}>
              <div className={classes.titleFilter}>FILTRER :</div>
            </div>
            <Autocomplete
              options={filteredArray}
              onChange={onChangeSelect}
              onSelectText={onSelect}
              value={search || ''}
              name="search"
              placeholder="Rechercher"
              className={classes.containerAutoComp}
              /* open={open} */
            />
            <Select
              options={listSecteurData?.themes.data}
              onSelectText={onSelectDomaine}
              name="domaine"
              value={domaine}
              placeholder="Domaine d’activité"
              className={classes.containerAutoComp}
              open={openDomain}
              fullSelect
              onClick={() => setOpenDomain(!openDomain)}
              loading={listSecteurLoading}
              reference={divDomaine}
            />
            <Select
              options={listTypeData?.environments.data}
              onSelectText={onSelectType}
              name="job"
              value={environments}
              placeholder="Type de métier"
              className={classes.containerAutoComp}
              open={openType}
              onClick={() => setOpenType(!openType)}
              loading={listTypeLoading}
              reference={divType}
            />
            <Select
              options={listAccData?.accessibilities.data}
              onSelectText={onSelectAcc}
              name="accessibility"
              placeholder="Niveau d’accès"
              value={accessibility}
              className={classes.containerAutoComp}
              open={openAcc}
              onClick={() => setOpenAcc(!openAcc)}
              loading={listAccLoading}
              reference={divAcc}
            />
          </div>
          {loading ? (
            <div className={classes.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <div className={classes.boxsContainer}>
              {!parcours?.completed && <Spinner />}
              {data?.myJobs?.length === 0
                ? 'Aucun resultat trouvé !'
                : jobs.map((el) => (
                  <JobCard
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    description={el.description}
                    accessibility={el.accessibility}
                    favoris={el.favorite}
                  />
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsContainer;
