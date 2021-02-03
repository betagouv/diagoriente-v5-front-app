import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Theme } from 'requests/types';
import TextField from '@material-ui/core/TextField/TextField';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import RestLogo from 'components/common/Rest/Rest';
import add from 'assets/svg/pictoadd.svg';

import blueline from 'assets/svg/blueline.svg';

import useStyles from './styles';
import QuestionList from './components/QuestionList/QuestionList';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  isCreate?: boolean;
  setOptionActivities: (optionsActivities: { id: string; title: string }[][]) => void;
  optionActivities: { id: string; title: string }[][];
  activity: string;
  setActivity: (activity: string) => void;
}

const EngagementActivities = ({
  history,
  match,
  theme,
  isCreate,
  location,
  setOptionActivities,
  optionActivities,
  activity,
  setActivity,
}: Props) => {
  const classes = useStyles();
  const [valid, setValid] = useState([] as boolean[]);

  const addActivityRow = () => {
    setOptionActivities([...optionActivities, []]);
  };

  const activityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 140) setActivity(e.target.value);
  };

  const handleValidate = (isValid: boolean, index: number) => {
    const nextValid = [...valid];
    nextValid[index] = isValid;
    setValid(nextValid);
  };

  const clearValid = (index: number) => {
    setValid(valid.filter((v, i) => i !== index));
  };


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
                {optionActivities.map((q, index) => (
                  <QuestionList
                    index={index}
                    optionActivities={optionActivities}
                    setOptionActivities={setOptionActivities}
                    handleValidate={handleValidate}
                    clearValid={clearValid}
                  />
                ))}

                <img src={add} alt="" height={28} className={classes.addIcon} onClick={addActivityRow} />
              </div>
            </div>
            <p className={classes.activityTitle}>Ou décris toi-même une activité:</p>

            <TextField
              name="activity"
              value={activity}
              placeholder="Ecrivez ici votre activité (140 caractères max)"
              onChange={activityChange}
              InputProps={{
                classes: {
                  input: classes.defaultValue,
                },
              }}
              classes={{ root: classes['MuiTextField-root'] }}
              rows={3}
              multiline
              className={classes.textArea}
              variant="outlined"
            />
            <p className={classes.activityCaracter}>{140 - activity.length} caractères restant</p>
          </div>
          <Link
            to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
            className={classes.hideLine}
          >
            <NextButton
              disabled={optionActivities[0].length === 0 ? !activity.length : valid.findIndex((e) => !e) !== -1}
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
