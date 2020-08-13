import React, { useEffect, useRef } from 'react';

import { THEME_TYPES_OPTIONS } from 'utils/generic';

import { useForm } from 'hooks/useInputs';
import { useActivities } from 'requests/activities';
import { Theme } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import AdminCheckBox from 'components/inputs/AdminCheckbox/AdminCheckbox';
import Button from '@material-ui/core/Button/Button';
import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';
import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';
import AdminFileUpload from 'components/inputs/AdminFileUpload/AdminFileUpload';

import useStyles from './styles';

interface ThemeFormValues {
  title: string;
  description: string;
  type: string;
  verified: boolean;
  activities: string[];
  icon?: File;
}

interface ThemeFormProps {
  onSubmit: (values: ThemeFormValues) => void;
  theme?: Theme;
}

const ThemeForm = ({ onSubmit, theme }: ThemeFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      description: '',
      type: '',
      verified: false,
      activities: [] as { label: string; value: string }[],
      icon: undefined as File | undefined,
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;
  const activitiesCapture = useRef(false);

  useEffect(() => {
    if (!activitiesCapture.current) {
      setValues({ activities: [] });
    } else {
      activitiesCapture.current = false;
    }
    // eslint-disable-next-line
  }, [values.type]);

  useEffect(() => {
    if (theme) {
      activitiesCapture.current = true;
      setValues({
        ...theme,
        activities: theme.activities.map((activity) => ({
          label: activity.title,
          value: activity.id,
        })),
      });
    }
    // eslint-disable-next-line
  }, [theme]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values };
    if (!data.icon) delete data.icon;
    onSubmit({ ...data, activities: values.activities.map((act) => act.value) });
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

        <AdminFileUpload
          defaultImage={theme?.resources?.icon || undefined}
          onChange={handleChange}
          name="icon"
          className={classes.icons}
          label="Icon"
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
        <AdminCheckBox
          name="verified"
          checked={values.verified}
          onChange={handleChange}
          className={classes.verified}
          label="Verified"
        />
        <AdminSelect
          name="type"
          value={values.type}
          onChange={handleChange}
          label="Type"
          options={THEME_TYPES_OPTIONS}
          className={classes.type}
        />
        <AdminAutocomplete
          handleOptions={(activity) => ({ label: activity.title, value: activity.id })}
          value={values.activities}
          label="Activités"
          multiple
          list={useActivities}
          onChange={(e, value) => setValues({ activities: value })}
          className={classes.activities}
          variables={{ type: values.type }}
        />
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ThemeForm;
