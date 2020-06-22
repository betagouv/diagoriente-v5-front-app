import React, { useState } from 'react';
import Slider from '../../../components/SliderQuestion/Slider';
import useStyles from './styles';

interface IProps {
  job: any;
}
const Question = [
  { id: '1', question: 'Tu aimes le contact client, aider, renseigner, conseiller…' },
  { id: '2', question: 'Tu aimes le contact client, aider, renseigner, conseiller…' },
  { id: '3', question: 'Tu aimes le contact client, aider, renseigner, conseiller…' },
  { id: '4', question: 'Tu aimes le contact client, aider, renseigner, conseiller…' },
];

const ModalQuestion = ({ job }: IProps) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{job?.title}</div>
      </div>
      <div className={classes.description}>CE METIER EST-IL FAIT POUR TOI ? FAIS LE TEST !</div>

      <div className={classes.questionContainer}>{`QUESTION ${currentIndex + 1}/${Question.length}`}</div>

      <div className={classes.sliderContainer}>
        <Slider data={Question} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};

export default ModalQuestion;
