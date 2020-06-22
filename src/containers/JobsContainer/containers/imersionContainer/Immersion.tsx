import React from 'react';
import { useJob } from 'requests/jobs';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import Arrow from 'assets/svg/arrow';
import ImageTitle from 'components/common/TitleImage/TitleImage';
import TraitJaune from 'assets/images/trait_jaune.svg';
import Edit from 'assets/svg/edit.svg';
import Loupe from 'assets/svg/loupe';
import CardImmersion from '../../components/CardImmersion/CardImmersion';
import CheckBox from '../../components/checkBox/ChexBox';
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
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.titleContainer}>
          <Link to={`/jobs/${param}`}>
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
              <div>
                <div>Masquer la carte</div>
              </div>
              <div>
                <div className={classes.filterMainTitle}>Trier</div>
                <div>
                  <CheckBox label="Tri optimisé" checked={false} onClick={() => {}} />
                </div>
                <div>
                  <CheckBox label="Distance" checked={false} onClick={() => {}} />
                </div>
                <div>
                  <CheckBox label="Ordre alphabétique" checked={false} onClick={() => {}} />
                </div>
              </div>
              <hr className={classes.bar} />
              <div className={classes.filterMainTitle}>Affiner la rechercher</div>
            </div>
          </div>
          <div className={classes.results}>
            <div className={classes.resultTitle}>35 résultats</div>
            {array.map((e) => (
              <CardImmersion data={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersionContainer;
