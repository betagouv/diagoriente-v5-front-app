import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Theme, Question } from 'requests/types';
import classNames from 'utils/classNames';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import { useQuestions } from 'requests/questions';
import RestLogo from 'components/common/Rest/Rest';
import add from 'assets/svg/pictoadd.svg';

import blueline from 'assets/svg/blueline.svg';
import Remove from '@material-ui/icons/RemoveCircle';
import Select from './components/ActvitySelect/ActivitySelect';
import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  isCreate?: boolean;
  setOptionActivities: (optionsActivities: string[][]) => void;
  optionActivities: string[][];
}

const EngagementActivities = ({
  history,
  match,
  theme,
  isCreate,
  location,
  setOptionActivities,
  optionActivities,
}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [questions, setQuestions] = useState([] as Question[][]);

  const { data } = useQuestions();
  const openActivity = () => {
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<any>, index: number, i: number) => {
    if (e.target.value && setOptionActivities && optionActivities) {
      const nextOptionsActivities = [...optionActivities];
      const newValuesRow = nextOptionsActivities[index];
      const newOptionsValues = newValuesRow.slice(0, i);
      newOptionsValues[i] = e.target.value;
      nextOptionsActivities[index] = newOptionsValues;
      setOptionActivities(nextOptionsActivities);
    }
  };

  const addActivityRow = () => {
    setQuestions([...questions, questions[0]]);
    setOptionActivities([...optionActivities, []]);
  };

  const deleteActivity = (index: number) => {
    setQuestions(questions.filter((act, i) => i !== index));
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
      setQuestions(optionActivities.map(() => question));
    }

    // eslint-disable-next-line
  }, [data?.questions.data]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title="MES EXPÉRIENCES D’ENGAGEMENT" color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              const path = '/experience';
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="2." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Peux-tu nous en dire un peu plus sur
            <br />
            <strong>les activités </strong>
            que tu pratiques ?
            <br />
          </p>
          <div className={classes.selectRoot}>
            <div className={classes.rowActivityWidth}>
              <span>Choisis en déroulant les menus ou ajoute tes propre activités</span>
              <div className={classes.selectGrid}>
                {questions.map((q, index) => (
                  <div className={classes.questionRow}>
                    {q
                      .filter((q, i) => optionActivities[index].length >= i)
                      .map((question, i) => (
                        <div key={question.id} className={classNames(classes.rowActivity)}>
                          <div className={classes.selectContainer}>
                            <Select
                              openActivity={openActivity}
                              onChange={(e) => handleChange(e, index, i)}
                              value={optionActivities && optionActivities[index][i] ? optionActivities[index][i] : ''}
                              setOpen={setOpen}
                              open={open}
                              question={question}
                              parent={optionActivities[index].slice(0, i).join(',')}
                            />
                          </div>
                        </div>
                      ))}
                    {questions.length !== 1 && (
                      <Remove className={classes.deleteIcon} onClick={() => deleteActivity(index)} />
                    )}
                  </div>
                ))}

                <img src={add} alt="" height={28} className={classes.addIcon} onClick={addActivityRow} />
              </div>
            </div>
          </div>
          <Link
            to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
            className={classes.hideLine}
          >
            <NextButton
              disabled={!!optionActivities.find((o, i) => o.length !== (questions[i] && questions[i].length))}
            />
          </Link>
        </div>
        {isCreate && (
          <Link
            to={{
              pathname: '/experience/theme',
              search: location.search ? `${location.search}&type=${theme.type}` : `?type=${theme.type}`,
            }}
            className={classes.btnpreced}
          >
            <CancelButton />
            Précedent
          </Link>
        )}
      </div>
    </div>
  );
};
export default EngagementActivities;
