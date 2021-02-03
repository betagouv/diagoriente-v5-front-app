import React, { useEffect } from 'react';

import { ACTIVITY_TYPES_OPTIONS } from 'utils/generic';

import { useForm } from 'hooks/useInputs';
import { useInterests } from 'requests/interests';
import { Activity } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import AdminCheckBox from 'components/inputs/AdminCheckbox/AdminCheckbox';
import Button from '@material-ui/core/Button/Button';
import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';
import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';

import useStyles from './styles';

interface ActivityFormValues {
  title: string;
  description: string;
  type: string;
  verified: boolean;
  interests: string[];
}

interface ThemeFormProps {
  onSubmit: (values: ActivityFormValues) => void;
  activity?: Activity;
}

const ActivityForm = ({ onSubmit, activity }: ThemeFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      description: '',
      type: '',
      verified: false,
      interests: [] as { label: string; value: string }[],
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (activity) {
      setValues({
        ...activity,
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
    onSubmit({ ...data, interests: values.interests.map((interest) => interest.value) });
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
          options={ACTIVITY_TYPES_OPTIONS}
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
