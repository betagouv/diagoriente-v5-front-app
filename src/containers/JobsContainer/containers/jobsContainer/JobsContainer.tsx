import React, { useContext, useState, useEffect } from 'react';

import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/TitleImage/TitleImage';
import ParcoursContext from 'contexts/ParcourContext';
import { useDidMount } from 'hooks/useLifeCycle';
import { useUpdateCompletedParcour } from 'requests/parcours';
import { useAccessibility } from 'requests/accessibility';
import { useTypeJob } from 'requests/environment';
import Spinner from 'components/Spinner/Spinner';
import { useJobs } from 'requests/jobs';
import { Jobs } from 'requests/types';
import { useSecteurs } from 'requests/themes';
import Trait from 'assets/images/trait_jaune.svg';
import { isEmpty } from 'lodash';
import Autocomplete from '../../components/Autocomplete/AutoCompleteJob';
import JobCard from '../../components/Card/CardJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

const JobsContainer = () => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);

  const [updateCompleteCall] = useUpdateCompletedParcour();

  const [domaine, setDomaine] = useState<string[] | undefined>([]);
  const [search, setSearch] = useState<string | undefined>('');
  const [environments, setJob] = useState<string[] | undefined>([]);
  const [accessibility, setAccessibility] = useState<string[] | undefined>([]);

  const variables: { search?: string; accessibility?: string[]; environments?: string[]; secteur?: string[] } = {};
  if (accessibility?.length !== 0) variables.accessibility = accessibility;
  if (environments?.length !== 0) variables.environments = environments;
  if (domaine?.length !== 0) variables.secteur = domaine;
  if (search) variables.search = search;
  const [loadJobs, { data, loading, refetch }] = useJobs({
    variables: isEmpty(variables) ? {} : variables,
  });
  const { data: listAccData, loading: listAccLoading } = useAccessibility();
  const { data: listTypeData, loading: listTypeLoading } = useTypeJob();
  const { data: listSecteurData, loading: listSecteurLoading } = useSecteurs({ variables: { type: 'secteur' } });

  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [filtredJob, setFiltredJobs] = useState<Jobs[] | undefined>([]);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);

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
    setOpen(false);
  };

  const onChangeSelect = (e: any) => {
    const v = e.target.value;
    setSearch(v);
    setFiltredArray(data?.myJobs.filter((el: any) => el.title.toLowerCase().indexOf(v.toLowerCase()) !== -1));
    setOpen(true);
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
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.titleContainer}>
          <div className={classes.logoContainer}>
            <img src={Logo} alt="log" />
          </div>
          <Title title="MON TOP METIER" font="ocean" size={42} width={220} color="#DB8F00" image={Trait} />
        </div>
        <div className={classes.subTitle}>Sélectionnés en fonction de tes réponses</div>
        <div className={classes.filtersContainer}>
          <div className={classes.filterTitleContainer}>
            <div className={classes.titleFilter}>Filter :</div>
          </div>
          <Autocomplete
            options={filteredArray}
            onChange={onChangeSelect}
            onSelectText={onSelect}
            value={search || ''}
            name="search"
            placeholder="Rechercher"
            className={classes.containerAutoComp}
            open={open}
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
          />
        </div>
        <div className={classes.boxsContainer}>
          {loading && <Spinner />}
          {filtredJob?.map((el) => (
            <JobCard key={el.id} title={el.title} description={el.description} accessibility={el.accessibility} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsContainer;
