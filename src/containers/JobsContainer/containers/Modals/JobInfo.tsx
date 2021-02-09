import React from 'react';
import timeLogo from 'assets/svg/time.svg';
import reseauLogo from 'assets/svg/reseau.svg';
import Chart from 'components/Graph/PieChart';
import { useHistory } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import { useJobs, useInfoJob } from 'requests/jobs';
import Spinner from 'components/Spinner/Spinner';

import useStyles from './styles';

interface IProps {
  job: any;
  handleClose: () => void;
}

const JobInfo = ({ job, handleClose }: IProps) => {
  const history = useHistory();
  const classes = useStyles();
  const [loadJobs, { data: JobsList, loading: loadingList }] = useJobs({
    variables: { secteur: job.secteur[0] ? job.secteur[0].id : 0 },
  });
  const [getInfoJobCall, getInfoJobState] = useInfoJob();
  useDidMount(() => {
    loadJobs();
    getInfoJobCall({ variables: { code: job.rome_codes } });
  });
  const onNavigate = (id: string) => {
    history.push(`/jobs/job/${id}`);
    handleClose();
  };
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{job?.title}</div>
      </div>
      <div className={classes.contentModal}>
        <div className={classes.TextTitle}>
          Niveau d’accès : 
{' '}
<span className={classes.textAccessibility}>{job.accessibility}</span>
        </div>
        <div className={classes.TextTitle}>L&lsquo;offre et la demande :</div>
        <div className={classes.offreContainer}>
          <div className={classes.offreConatinerItems}>
            <div>
              <img src={timeLogo} alt="" />
              <span className={classes.offresTitle}>La semaine dernière</span>
            </div>
            <div>
              <b>{getInfoJobState.data?.referentiel.resultOffre.result.records[0].NB_OFFER_LAST_WEEK}</b>
{' '}
offres pour{' '}
              <b>{getInfoJobState.data?.referentiel.resultOffre.result.records[0].NB_APPLICATION_LAST_WEEK}</b>
{' '}
              demandeurs d&lsquo;emploi
            </div>
          </div>
          <div className={classes.offreConatinerItems}>
            <div>
              <img src={reseauLogo} alt="" />
              <span className={classes.offresTitle}>Sur le dernier mois, en moyenne :</span>
            </div>
            <div>
              <b>{getInfoJobState.data?.referentiel.resultOffre.result.records[0].NB_OFFER_END_MONTH}</b>
{' '}
offres pour{' '}
              <b>{getInfoJobState.data?.referentiel.resultOffre.result.records[0].NB_APPLICATION_END_MONTH}</b>
{' '}
              demandeurs d&lsquo;emploi
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <div className={classes.similaireJob}>
            <div className={classes.TextTitle}>Métiers similaires :</div>
            <div className={classes.metiersContainer}>
              <div>{loadingList && <Spinner />}</div>
              {JobsList?.myJobs.slice(0, 6).map((i) => (
                <div key={i.id} className={classes.metierItem} onClick={() => onNavigate(i.id)}>
                  {i.title}
                </div>
              ))}
            </div>
          </div>
          {/* <div className={classes.graph}>
            <div className={classes.TextTitle}>Types de contrat :</div>
            <div>
              <Chart />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default JobInfo;
