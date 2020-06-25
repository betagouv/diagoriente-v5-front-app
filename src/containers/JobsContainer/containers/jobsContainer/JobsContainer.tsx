import React, { useContext, useState, useEffect, useRef } from 'react';
import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/TitleImage/TitleImage';
import ParcoursContext from 'contexts/ParcourContext';
import { useDidMount } from 'hooks/useLifeCycle';
import { useUpdateParcour } from 'requests/parcours';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useAccessibility } from 'requests/accessibility';
import { useTypeJob } from 'requests/environment';
import { useJobs } from 'requests/jobs';
import { Jobs } from 'requests/types';
import { useSecteurs } from 'requests/themes';
import Trait from 'assets/images/trait_jaune.svg';
import Reset from 'components/common/Rest/Rest';
import Spinner from 'components/Spinner/Spinner';
import ClearMessageContext from 'contexts/messageContext';
import { isEmpty } from 'lodash';
import Autocomplete from '../../components/Autocomplete/AutoCompleteJob';
import JobCard from '../../components/Card/CardJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

const JobsContainer = () => {
  const classes = useStyles();
  const divDomaine = useRef<HTMLDivElement>(null);
  const divType = useRef<HTMLDivElement>(null);
  const divAcc = useRef<HTMLDivElement>(null);

  const { parcours, setParcours } = useContext(ParcoursContext);
  const { clearMessage, setClearMessage } = useContext(ClearMessageContext);

  const [updateCompleteCall, updateCompeteState] = useUpdateParcour();
  const [domaine, setDomaine] = useState<string[] | undefined>([]);
  const [search, setSearch] = useState<string | undefined>('');
  const [environments, setJob] = useState<string[] | undefined>([]);
  const [accessibility, setAccessibility] = useState<string[] | undefined>([]);

  const variables: { search?: string; niveau?: string[]; environments?: string[]; secteur?: string[] } = {};
  if (accessibility?.length !== 0) variables.niveau = accessibility;
  if (environments?.length !== 0) variables.environments = environments;
  if (domaine?.length !== 0) variables.secteur = domaine;
  if (search) variables.search = search;
  const [loadJobs, { data, loading, refetch }] = useJobs({
    variables: isEmpty(variables) ? {} : variables,
  });
  const { data: listAccData, loading: listAccLoading } = useAccessibility();
  const { data: listTypeData, loading: listTypeLoading } = useTypeJob();
  const { data: listSecteurData, loading: listSecteurLoading } = useSecteurs({ variables: { type: 'secteur' } });

  // const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [filtredJob, setFiltredJobs] = useState<Jobs[] | undefined>([]);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);

  useOnclickOutside(divDomaine, () => {
    if (openDomain) {
      setOpenDomain(false);
    }
  });
  useOnclickOutside(divType, () => setOpenType(false));
  useOnclickOutside(divAcc, () => setOpenAcc(false));

  useEffect(() => {
    if (data?.myJobs) {
      setFiltredJobs(data?.myJobs);
    }
  }, [data]);

  useEffect(() => {
    const fn = data ? refetch : loadJobs;
    fn();
  }, [loadJobs, data, refetch]);

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
  useDidMount(() => {
    if (!parcours?.completed) {
      updateCompleteCall({ variables: { completed: true } });
    }
    loadJobs();
  });
  useEffect(() => {
    if (updateCompeteState.data) {
      setParcours(updateCompeteState.data.updateParcour);
    }
  }, [updateCompeteState.data, setParcours]);
  return (
    <div>
      {clearMessage && (
        <div className={classes.messages}>
          <div className={classes.contentMessage}>
            <div className={classes.text}>
              <div>Pour voir une sélection personnalisée de métiers qui pourraient te plaire,</div>
              <div>
                commence à remplir ton profil en ajoutant tes <span className={classes.clearTextBold}>expériences</span>{' '}
                et tes <span className={classes.clearTextBold}>centres d'intérêts</span>{' '}
              </div>
            </div>
            <div>
              <div onClick={() => setClearMessage(false)} className={classes.clearMessage}>
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
            <Title title="MON TOP METIERS" font="ocean" size={42} width={225} color="#DB8F00" image={Trait} />
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
              {(filteredArray?.length ? filteredArray : filtredJob)?.map((el) => (
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
