import React, { useState, useEffect } from 'react';
import { Question } from 'requests/types';
import classNames from 'utils/classNames';

import { useQuestions } from 'requests/questions';

import Remove from '@material-ui/icons/RemoveCircle';
import Select from '../QuestionSelect/ActivitySelect';
import useStyles from './styles';

interface Props {
  setOptionActivities: (optionsActivities: string[][]) => void;
  optionActivities: string[][];
  index: number;
}

const QuestionList = ({ setOptionActivities, optionActivities, index }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [questions, setQuestions] = useState([] as Question[]);

  const { data } = useQuestions({ variables: { path: optionActivities[index] } });
  const openActivity = () => {
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<any>, i: number) => {
    if (e.target.value && setOptionActivities && optionActivities) {
      const nextOptionsActivities = [...optionActivities];
      const newValuesRow = nextOptionsActivities[index];
      const newOptionsValues = newValuesRow.slice(0, i);
      newOptionsValues[i] = e.target.value;
      nextOptionsActivities[index] = newOptionsValues;
      setOptionActivities(nextOptionsActivities);
    }
  };

  const deleteActivity = () => {
    setOptionActivities(optionActivities.filter((act, i) => i !== index));
  };

  useEffect(() => {
    if (data) {
      const question = data.questions.data.sort((a, b) => {
        if (!a.parent) return -1;
        if (!b.parent) return 1;
        if (a.id === b.parent.id) return -1;
        if (b.id === a.parent.id) return 1;
        return 0;
      });
      setQuestions(question);
    }

    // eslint-disable-next-line
  }, [data?.questions.data]);

  return (
    <div className={classes.questionRow}>
      {questions.map((question, i) => (
        <div key={question.id} className={classNames(classes.rowActivity)}>
          <div className={classes.selectContainer}>
            <Select
              openActivity={openActivity}
              onChange={(e) => handleChange(e, i)}
              value={optionActivities && optionActivities[index][i] ? optionActivities[index][i] : ''}
              setOpen={setOpen}
              open={open}
              question={question}
              parent={optionActivities[index].slice(0, i).join(',')}
            />
          </div>
        </div>
      ))}
      {optionActivities.length !== 1 && <Remove className={classes.deleteIcon} onClick={deleteActivity} />}
    </div>
  );
};
export default QuestionList;
