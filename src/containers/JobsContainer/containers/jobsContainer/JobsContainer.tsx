import React, { useContext, useState, useEffect, useRef } from 'react';
import Logo from 'assets/svg/Frame.svg';
import Title from 'components/common/TitleImage/TitleImage';
import localForage from 'localforage';
import { Link } from 'react-router-dom';
import useOnclickOutside from 'hooks/useOnclickOutside';
import ParcoursContext from 'contexts/ParcourContext';

import { Jobs } from 'requests/types';
import Trait from 'assets/images/trait_jaune.svg';
import Reset from 'components/common/Rest/Rest';
import Spinner from 'components/Spinner/Spinner';
import Autocomplete from '../../components/Autocomplete/AutoCompleteJob';
import JobCard from '../../components/Card/CardJob';
import Select from '../../components/Select/Select';
import useStyles from './styles';

interface IProps {
  jobs?: Jobs[];
  domaine?: string[];
  search?: string;
  environments?: string[];
  accessibility?: string[];
  loading: boolean;
  setDomaine: (d: string[]) => void;
  setSearch: (s?: string) => void;
  setJob: (d: string[]) => void;
  setAccessibility: (d: string[]) => void;
  listAccData?: { id: string; name: string }[];
  listTypeData?: { id: string; title: string }[];
  listSecteurData?: {
    activities: string[];
    id: string;
    title: string;
    resources: { backgroundColor: string; icon: string };
  }[];
}

const JobsContainer = ({
  jobs,
  domaine,
  search,
  environments,
  accessibility,
  loading,
  setDomaine,
  setSearch,
  setJob,
  setAccessibility,
  listAccData,
  listTypeData,
  listSecteurData,
}: IProps) => {
  const classes = useStyles();
  const { parcours } = useContext(ParcoursContext);

  const [openType, setOpenType] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [filteredArray, setFiltredArray] = useState<Jobs[] | undefined>([]);

  const divDomaine = useRef<HTMLDivElement>(null);
  const divType = useRef<HTMLDivElement>(null);
  const divAcc = useRef<HTMLDivElement>(null);

  const [clearMessage, setClearMessage] = useState<null | boolean>(null);

  useEffect(() => {
    async function c() {
      const res = await localForage.getItem('messages');
      if (res === null) {
        setClearMessage(true);
      }
    }
    c();
  }, []);

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
    setFiltredArray(jobs?.filter((el: any) => el.title.toLowerCase().indexOf(v.toLowerCase()) !== -1));
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
                commence à remplir ton profil en ajoutant tes{' '}
                <Link to="/experience">
                  {' '}
                  <span className={classes.clearTextBold}>expériences</span>
                </Link>{' '}
                et tes{' '}
                <Link to="/interet">
                  <span className={classes.clearTextBold}>centres d'intérêts</span>
                </Link>{' '}
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
              options={listSecteurData}
              onSelectText={onSelectDomaine}
              name="domaine"
              value={domaine}
              placeholder="Domaine d’activité"
              className={classes.containerAutoComp}
              open={openDomain}
              fullSelect
              onClick={() => setOpenDomain(!openDomain)}
              reference={divDomaine}
            />
            <Select
              options={listTypeData}
              onSelectText={onSelectType}
              name="job"
              value={environments}
              placeholder="Type de métier"
              className={classes.containerAutoComp}
              open={openType}
              onClick={() => setOpenType(!openType)}
              reference={divType}
            />
            <Select
              options={listAccData}
              onSelectText={onSelectAcc}
              name="accessibility"
              placeholder="Niveau d’accès"
              value={accessibility}
              className={classes.containerAutoComp}
              open={openAcc}
              onClick={() => setOpenAcc(!openAcc)}
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
              {jobs?.length === 0
                ? 'Aucun resultat trouvé !'
                : jobs?.map((el) => (
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
