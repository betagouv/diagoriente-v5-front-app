import React, { useContext, useState } from 'react';
import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/Title/Title';
import { useForm } from 'hooks/useInputs';
import ParcoursContext from 'contexts/ParcourContext';
import { useDidMount } from 'hooks/useLifeCycle';
import { useUpdateCompletedParcour } from 'requests/parcours';
import { useAccessibility } from 'requests/accessibility';
import { useTypeJob } from 'requests/environment';
import { useJobs } from 'requests/jobs';
import Autocomplete from '../../components/Autocomplete/AutoCompleteJob';
import JobCard from '../../components/Card/CardJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

const options = [{ label: 'tesr' }];
const JobsContainer = () => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);

  const [state, actions] = useForm({
    initialValues: { search: '', domaine: '', job: '', accessibility: '' },
  });
  const { values } = state;

  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [selectedJob, setSelectJob] = useState('');

  const [updateCompleteCall] = useUpdateCompletedParcour();
  const { data } = useJobs();
  const { data: listAccData, loading: listAccLoading } = useAccessibility();
  const { data: listTypeData, loading: listTypeLoading } = useTypeJob();

  const onSelect = (label?: string) => {
    actions.setValues({
      search: label,
    });
  };
  const onSelectDomaine = (label?: string) => {
    actions.setValues({
      domaine: label,
    });
  };
  const onSelectAcc = (label?: string) => {
    actions.setValues({
      accessibility: label,
    });
  };
  const onSelectType = (label?: string) => {
    actions.setValues({
      job: label,
    });
  };
  useDidMount(() => {
    if (!parcours?.completed) {
      updateCompleteCall({ variables: { completed: true } });
    }
  });
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.titleContainer}>
          <div className={classes.logoContainer}>
            <img src={Logo} alt="log" />
          </div>
          <Title title="MON TOP METIER" font="ocean" size={42} color="#DB8F00" />
        </div>
        <div className={classes.subTitle}>Sélectionnés en fonction de tes réponses</div>
        <div className={classes.filtersContainer}>
          <div className={classes.filterTitleContainer}>
            <div className={classes.titleFilter}>Filter :</div>
          </div>
          <Autocomplete
            options={options}
            onChange={actions.handleChange}
            onSelectText={onSelect}
            value={values.search}
            name="search"
            placeholder="Rechercher"
            className={classes.containerAutoComp}
            open={open}
          />
          <Select
            options={options}
            onChange={actions.handleChange}
            onSelectText={onSelectDomaine}
            value={values.domaine}
            name="domaine"
            placeholder="Domaine d’activité"
            className={classes.containerAutoComp}
            open={openDomain}
            fullSelect
            onClick={() => setOpenDomain(!openDomain)}
          />
          <Select
            options={listTypeData?.environments.data}
            onChange={actions.handleChange}
            onSelectText={onSelectType}
            value={values.job}
            name="job"
            placeholder="Type de métier"
            className={classes.containerAutoComp}
            open={openType}
            onClick={() => setOpenType(!openType)}
            loading={listTypeLoading}
          />
          <Select
            options={listAccData?.accessibilities.data}
            onChange={actions.handleChange}
            onSelectText={onSelectAcc}
            value={values.accessibility}
            name="accessibility"
            placeholder="Niveau d’accès"
            className={classes.containerAutoComp}
            open={openAcc}
            onClick={() => setOpenAcc(!openAcc)}
            loading={listAccLoading}
          />
        </div>
        <div className={classes.boxsContainer}>
          {data?.jobs.data.map((el) => (
            <JobCard
              key={el.id}
              title={el.title}
              description={el.description}
              accessibility={el.accessibility}
              selected={selectedJob === el.id ? selectedJob : ''}
              onClick={() => setSelectJob(el.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsContainer;
