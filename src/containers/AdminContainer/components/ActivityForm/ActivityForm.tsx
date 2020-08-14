import React, { useEffect, useState } from 'react';

import { THEME_TYPES_OPTIONS } from 'utils/generic';

import { useForm } from 'hooks/useInputs';
import { useInterests } from 'requests/interests';
import { Activity } from 'requests/types';

import Paper from '@material-ui/core/Paper/Paper';
import Fab from '@material-ui/core/Fab/Fab';
import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import AdminCheckBox from 'components/inputs/AdminCheckbox/AdminCheckbox';
import Button from '@material-ui/core/Button/Button';
import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';
import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';

import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import { Tooltip } from '@material-ui/core';
import useStyles from './styles';

interface ActivityFormValues {
  title: string;
  description: string;
  type: string;
  verified: boolean;
  interests: string[];
  options?: { value: string; verified: boolean }[];
}

interface ThemeFormProps {
  onSubmit: (values: ActivityFormValues) => void;
  activity?: Activity;
}

const ActivityForm = ({ onSubmit, activity }: ThemeFormProps) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      description: '',
      type: '',
      verified: false,
      interests: [] as { label: string; value: string }[],
      options: [] as { value: string; verified: boolean }[],
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (activity) {
      setValues({
        ...activity,
        options: activity.options.map((opt) => ({ value: opt.value, verified: opt.verified })),
        interests: activity.interests.map((interest) => ({
          label: interest.nom,
          value: interest.id,
        })),
      });
    }
    // eslint-disable-next-line
  }, [activity]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values };
    if (data.type !== 'engagement') delete data.options;
    onSubmit({ ...data, interests: values.interests.map((interest) => interest.value) });
  }

  function addOption() {
    setValues({ options: [...values.options, { value, verified: true }] });
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className={classes.wrapper}>
      <div className={classes.container}>
        <AdminTextField
          name="title"
          value={values.title}
          onChange={handleChange}
          label="Titre"
          color="primary"
          className={classes.title}
        />

        <AdminSelect
          name="type"
          value={values.type}
          onChange={handleChange}
          label="Type"
          options={THEME_TYPES_OPTIONS}
          className={classes.type}
        />

        <AdminTextField
          name="description"
          value={values.description}
          onChange={handleChange}
          className={classes.description}
          multiline
          rows={6}
          label="Description"
          color="primary"
        />

        <AdminAutocomplete
          handleOptions={(interest) => ({ label: interest.nom, value: interest.id })}
          value={values.interests}
          label="Intérêts"
          multiple
          list={useInterests}
          onChange={(e, v) => setValues({ interests: v })}
          className={classes.interests}
        />
        <div className={classes.options}>
          <AdminTextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && value.length > 2) {
                e.preventDefault();
                addOption();
              }
            }}
            InputProps={{
              className: classes.optionsInput,
              endAdornment: (
                <Fab onClick={addOption} size="small" className={classes.add} disabled={value.length < 3}>
                  <Add />
                </Fab>
              ),
            }}
            label="Options"
          />
          {values.options.map((option, index) => (
            // eslint-disable-next-line
            <div key={index} className={classes.option}>
              <Paper className={classes.optionValue}>{option.value}</Paper>
              <Tooltip title={option.verified ? 'Vérifié' : 'Non vérifié'}>
                <Fab
                  onClick={() => {
                    const nextOptions = [...values.options];
                    nextOptions[index] = { ...values.options[index], verified: !option.verified };
                    setValues({ options: nextOptions });
                  }}
                  size="small"
                  className={option.verified ? classes.optionVerify : classes.optionClear}
                >
                  {option.verified ? <Done /> : <Clear />}
                </Fab>
              </Tooltip>
              <Tooltip title="Supprimer">
                <Fab
                  onClick={() => setValues({ options: values.options.filter((o, i) => index !== i) })}
                  size="small"
                  className={classes.optionRemove}
                >
                  <Remove />
                </Fab>
              </Tooltip>
            </div>
          ))}
        </div>

        <AdminCheckBox
          name="verified"
          checked={values.verified}
          onChange={handleChange}
          className={classes.verified}
          label="Verified"
        />
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ActivityForm;
