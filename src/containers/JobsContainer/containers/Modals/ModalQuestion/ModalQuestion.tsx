import React, { useState, useEffect, useRef } from 'react';
import { Jobs } from 'requests/types';
import { useLocation } from 'react-router-dom';
import { useResponseJob, useUpdateResponseJob, useGetResponseJob } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
import Button from 'components/button/Button';
import classNames from 'utils/classNames';
import Slider from '../../../components/SliderQuestion/Slider';
import useStyles from './styles';

interface IProps {
  job: Jobs | undefined;
  handleClose: () => void;
}

const ModalQuestion = ({ job, handleClose }: IProps) => {
  const classes = useStyles();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [last, setLast] = useState(false);
  const slideRef = useRef(null);
  const [responseCall, responseState] = useResponseJob();
  const [updateResponseCall, updateResponseState] = useUpdateResponseJob();
  const [getListResponses, { data, refetch }] = useGetResponseJob();

  const param = location.pathname.substr(10);

  useDidMount(() => {
    getListResponses({ variables: { JobId: param } });
  });
  const onUpdate = (rep: {
    response: boolean;
    questionId: string;
    isNew: string | undefined;
    responseId: string | undefined;
  }) => {
    const dataToSend = {
      questionJobId: rep.questionId,
      response: rep.response,
      jobId: job?.id,
    };
    if (!rep.isNew) {
      responseCall({ variables: dataToSend });
    } else {
      updateResponseCall({ variables: { id: rep.responseId, response: rep.response } });
    }
  };
  useEffect(() => {
    if (responseState.data || updateResponseState.data) {
      refetch({ variables: { JobId: param } });
      if (slideRef?.current) {
        (slideRef.current as any).nextSlide();
      }
      if ((slideRef?.current as any)?.state.currentSlide + 1 === job?.questionJobs.length) {
        setLast(true);
      }
    }
  }, [responseState.data, updateResponseState.data, getListResponses, param, refetch, job, handleClose]);
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{job?.title}</div>
      </div>
      <div className={classes.description}>CE METIER EST-IL FAIT POUR TOI ?</div>
      {last ? (
        <div className={classes.lastContainer}>
          <div className={classNames(classes.questionContainer, last && classes.titleQuestion)}>TERMINé !</div>
          <div className={classes.descriptionContainer}>
            <div className={classes.textDescription}>Ces questions t'ont donné un aperçu de la réalité</div>
            <div className={classes.textDescription}>du métier. Néanmoins Il n'y a rien de tel qu'une</div>
            <div className={classes.textDescription}>immersion sur le terrain !</div>
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} onClick={handleClose}>
              <div className={classes.btnLabel}>Je recherche mon immersion</div>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {job && job?.questionJobs.length > 0 ? (
            <div className={classes.questionContainer}>
              {`QUESTION ${currentIndex + 1}/${job?.questionJobs.length}`}
            </div>
          ) : (
            <div className={classes.errorQuestion}>Aucune question </div>
          )}

          <div className={classes.sliderContainer}>
            <Slider
              questions={job?.questionJobs}
              setCurrentIndex={setCurrentIndex}
              onClick={onUpdate}
              ref={slideRef}
              list={data?.responseJobs.data}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ModalQuestion;
