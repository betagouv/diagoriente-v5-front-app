import React from 'react';
import { useJob } from 'requests/jobs';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import Arrow from 'assets/svg/arrow';
import ImageTitle from 'components/common/TitleImage/TitleImage';
import TraitJaune from 'assets/images/trait_jaune.svg';
import Edit from 'assets/svg/edit.svg';
import Select from 'components/inputs/Select/Select';
import Loupe from 'assets/svg/loupe';
import { useForm } from 'hooks/useInputs';
import CardImmersion from '../../components/CardImmersion/CardImmersion';
import CheckBox from '../../components/checkBox/ChexBox';
import Switch from '../../components/Switch/Switch';
import SwitchRayon from '../../components/SwitchRayon/SwitchRayon';
import useStyles from './styles';

const array = [
  { title: 'title', description: 'description', salariés: 'salariés' },
  { title: 'title', description: 'description', salariés: 'salariés' },
];

const ImmersionContainer = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const param = location.pathname.substr(16);
  const [loadJob, { data, loading }] = useJob({ variables: { id: param } });
  useDidMount(() => {
    loadJob();
  });
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
      value: '5 km',
    },
    {
      label: '10 km',
      value: '10 km',
    },
    {
      label: '30 km',
      value: '30 km',
    },
    {
      label: '50 km',
      value: '50 km',
    },
    {
      label: '100 km',
      value: '100 km',
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
    if (state.values.distance === s) {
      actions.setValues({ distance: '' });
    } else {
      actions.setValues({ distance: s });
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
          <ImageTitle title="TROUVER UNE IMMERSION" color="#DB8F00" image={TraitJaune} size={42} />
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
              <Select  />
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
            {array.map((e) => (
              <CardImmersion key={e.title} data={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersionContainer;
