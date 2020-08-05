import React, { useState, useEffect, useRef } from 'react';
import { Jobs } from 'requests/types';
import { useLocation } from 'react-router-dom';
import { useResponseJob, useUpdateResponseJob, useGetResponseJob } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
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
      if ((slideRef?.current as any).state.currentSlide + 1 === job?.questionJobs.length) {
        handleClose();
      }
    }
  }, [responseState.data, updateResponseState.data, getListResponses, param, refetch, job, handleClose]);
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{job?.title}</div>
      </div>
      <div className={classes.description}>CE METIER EST-IL FAIT POUR TOI ? FAIS LE TEST !</div>

      <div className={classes.questionContainer}>{`QUESTION ${currentIndex + 1}/${job?.questionJobs.length}`}</div>

      <div className={classes.sliderContainer}>
        <Slider
          questions={job?.questionJobs}
          setCurrentIndex={setCurrentIndex}
          onClick={onUpdate}
          ref={slideRef}
          list={data?.responseJobs.data}
        />
      </div>
    </div>
  );
};

export default ModalQuestion;
