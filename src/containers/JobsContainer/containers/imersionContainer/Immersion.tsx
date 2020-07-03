import React, { useState, useEffect } from 'react';
import { useJob } from 'requests/jobs';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Arrow from 'assets/svg/arrow';
import ImageTitle from 'components/common/TitleImage/TitleImage';
import TraitJaune from 'assets/images/trait_jaune.svg';
import Edit from 'assets/svg/edit.svg';
import Select from 'components/inputs/Select/Select';
import { useImmersion } from 'requests/immersion';
import Loupe from 'assets/svg/loupe';
import Spinner from 'components/Spinner/Spinner';
import { Company } from 'requests/types';
import { useForm } from 'hooks/useInputs';
import classNames from 'utils/classNames';
import ModalConseil from '../Modals/ConseilModal/ConseilModal';
import ModalContact from '../Modals/ContactModal/ContactModal';
import CardImmersion from '../../components/CardImmersion/CardImmersion';
import CheckBox from '../../components/checkBox/ChexBox';
import Switch from '../../components/Switch/Switch';
import SwitchRayon from '../../components/SwitchRayon/SwitchRayon';
import useStyles from './styles';

const ImmersionContainer = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const [openContact, openContactState] = useState(false);
  const [openConseil, openConseilState] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<number[]>([]);
  const [immersionCall, immersionState] = useImmersion();
  const dataToSend = (location.state as any)?.detail;
  const param = location.pathname.substr(16);
  const [loadJob, { data, loading }] = useJob({ variables: { id: param } });
  useDidMount(() => {
    loadJob();
  });
  useEffect(() => {
    if (dataToSend) {
      const args = { ...dataToSend, page };
      immersionCall({ variables: args });
    }
  }, [dataToSend, immersionCall]);
  const handleClose = () => {
    openContactState(false);
    openConseilState(false);
  };
  const PAGES = immersionState.data?.immersions.companies_count / 6;
  useEffect(() => {
    if (PAGES) {
      const lengthItem = Math.round(PAGES);
      const a = Array.from(Array(lengthItem), (_, i) => i + 1);
      setItems(a);
    }
  }, [PAGES]);
  const getData = (pg: number) => {
    setPage(pg);
    const args = { ...dataToSend, page: pg };
    immersionCall({ variables: args });
  };
  const [state, actions] = useForm({
    initialValues: {
      tri: '',
      taille: '',
      rayon: '',
      distance: '',
      switch: true,
      switchRayon: '',
    },
  });
  const tri = [
    {
      label: 'Tri optimisé',
      value: 'Tri optimisé',
    },
    {
      label: 'Distance',
      value: 'Distance',
    },
    {
      label: 'Ordre alphabétique',
      value: 'Ordre alphabétique',
    },
  ];
  const taille = [
    {
      label: 'Toutes tailles',
      value: 'Toutes tailles',
    },
    {
      label: 'Moins de 50 salariés',
      value: 'Moins de 50 salariés',
    },
    {
      label: 'Plus de 50 salariés',
      value: 'Plus de 50 salariés',
    },
  ];
  const distance = [
    {
      label: '5 km',
      value: 5,
    },
    {
      label: '10 km',
      value: 10,
    },
    {
      label: '30 km',
      value: 30,
    },
    {
      label: '50 km',
      value: 50,
    },
    {
      label: '100 km',
      value: 100,
    },
    {
      label: '+ de 100 km',
      value: '+ de 100 km',
    },
  ];
  const onChangeTri = (label: string) => {
    if (state.values.tri === label) {
      actions.setValues({ tri: label });
    } else {
      actions.setValues({ tri: label });
    }
  };
  const onChangeTaille = (label: string) => {
    if (state.values.taille === label) {
      actions.setValues({ taille: label });
    } else {
      actions.setValues({ taille: label });
    }
  };
  const onChangeRayon = (s: string) => {
    if (state.values.switchRayon === s) {
      actions.setValues({ switchRayon: '' });
    } else {
      actions.setValues({ switchRayon: s });
    }
  };
  const onChangeDistance = (s: string) => {
    const str = Number(s.substring(0, s.length - 2));

    if (state.values.distance === s) {
      actions.setValues({ distance: '' });
    } else {
      actions.setValues({ distance: s });
      const args = { ...dataToSend, page, distance: str };
      immersionCall({ variables: args });
    }
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
        </div>

        <div className={classes.wrapper}>
          <div className={classes.filtersContainer}>
            <div className={classes.boxSearch}>
              <div className={classes.textTitleContainer}>
                <Loupe color="#FFA600" width="32" height="32" />
                <div className={classes.textTitle}>MA RECHERCHE</div>
              </div>
              <div>
                Je recherche une <strong>immersion</strong> pour le métier de
                <b> {data?.job.title} </b>à Lyon.
              </div>
              <div className={classes.edit}>
                <img src={Edit} alt="" />
                <div className={classes.textEdit}>Modifier</div>
              </div>
            </div>
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
                  <CheckBox
                    key={el.label}
                    label={el.label}
                    onClick={() => onChangeTri(el.label)}
                    value={state.values.tri}
                  />
                ))}
              </div>
              <hr className={classes.bar} />
              <div className={classes.filterMainTitle}>Affiner la rechercher</div>
              <div className={classes.filterTitle}>Secteurs d’activité</div>
              <Select />
              <div className={classes.tailleContainer}>
                <div className={classes.filterTitle}>Taille de l’entreprise</div>
                {taille.map((el) => (
                  <CheckBox
                    key={el.label}
                    label={el.label}
                    value={state.values.taille}
                    onClick={() => onChangeTaille(el.label)}
                  />
                ))}
              </div>

              <div className={classes.filterTitle}>Rayon de recherche</div>
              <SwitchRayon checked={state.values.switchRayon} onClick={onChangeRayon} />
              <div className={classes.distanceContainer}>
                <div className={classes.filterTitle}>Distance</div>
                {distance.map((el) => (
                  <CheckBox
                    key={el.label}
                    label={el.label}
                    value={state.values.distance}
                    onClick={() => onChangeDistance(el.label)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={classes.results}>
            <div className={classes.resultTitle}>35 résultats</div>
            <div>{immersionState.loading && <Spinner />}</div>
            <div>{immersionState.data?.immersions.companies.length === 0 && 'Aucun resultat trouvé'}</div>
            {immersionState.data?.immersions.companies?.map((e: Company) => (
              <CardImmersion
                data={e}
                key={e.siret}
                onClickContact={() => openContactState(true)}
                onClickConseil={() => openConseilState(true)}
              />
            ))}
            {immersionState.data?.immersions.companies.length !== 0 && (
              <div className={classes.paginationContainer}>
                {items.map((el) => (
                  <div
                    key={el}
                    className={classNames(classes.itemPage, el === page ? classes.boldItem : null)}
                    onClick={() => getData(el)}
                  >
                    {el}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalContainer
        open={openContact || openConseil}
        handleClose={handleClose}
        backdropColor="#011A5E"
        colorIcon="#DB8F00"
        size={70}
      >
        {openConseil ? <ModalConseil handleClose={handleClose} /> : <ModalContact />}
      </ModalContainer>
    </div>
  );
};

export default ImmersionContainer;
