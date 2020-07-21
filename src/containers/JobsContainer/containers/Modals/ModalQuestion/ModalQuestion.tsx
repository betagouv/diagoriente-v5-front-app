import React, { useState, useEffect, useRef } from 'react';
import { Jobs } from 'requests/types';
import { useLocation } from 'react-router-dom';
import { useResponseJob, useUpdateResponseJob, useGetResponseJob } from 'requests/jobs';
import { useDidMount } from 'hooks/useLifeCycle';
import Slider from '../../../components/SliderQuestion/Slider';
import useStyles from './styles';

interface IProps {
  job: Jobs | undefined;
}

const ModalQuestion = ({ job }: IProps) => {
  const classes = useStyles();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const [responseCall, responseState] = useResponseJob();
  const [updateResponseCall, updateResponseState] = useUpdateResponseJob();
  const [getListResponses, getListState] = useGetResponseJob();
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
    getListResponses({ variables: { JobId: param } });
  };
  useEffect(() => {
    if (responseState.data || updateResponseState.data) {
      if (slideRef?.current) {
        (slideRef.current as any).nextSlide();
      }
    }
  }, [responseState.data, updateResponseState.data]);

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
          list={getListState.data?.responseJobs.data}
        />
      </div>
    </div>
  );
};

export default ModalQuestion;
