import React from 'react';
import timeLogo from 'assets/svg/time.svg';
import reseauLogo from 'assets/svg/reseau.svg';
import Chart from 'components/Graph/PieChart';
import { useHistory } from 'react-router-dom';
import { useDidMount } from 'hooks/useLifeCycle';
import { useJobs } from 'requests/jobs';
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
    variables: { secteur: job.secteur[0].id },
  });
  useDidMount(() => {
    loadJobs();
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
          Niveau d’accès : <span className={classes.textAccessibility}>{job.accessibility}</span>
        </div>
        <div className={classes.TextTitle}>L&lsquo;offre et la demande :</div>
        <div className={classes.offreContainer}>
          <div className={classes.offreConatinerItems}>
            <div>
              <img src={timeLogo} alt="" />
              <span className={classes.offresTitle}>La semaine dernière</span>
            </div>
            <div>
              <b>22</b> offres pour <b>550</b> demandeurs d&lsquo;emploi
            </div>
          </div>
          <div className={classes.offreConatinerItems}>
            <div>
              <img src={reseauLogo} alt="" />
              <span className={classes.offresTitle}>Sur les 12 derniers mois, en moyenne :</span>
            </div>
            <div>
              <b>4</b> offres pour <b>10</b> demandeurs d&lsquo;emploi
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
          <div className={classes.graph}>
            <div className={classes.TextTitle}>Types de contrat :</div>
            <div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobInfo;
