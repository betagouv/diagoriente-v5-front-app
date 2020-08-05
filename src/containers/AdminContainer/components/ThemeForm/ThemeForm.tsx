import React, { useEffect } from 'react';

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
  prevData: Theme | null;
}

const ThemeForm = ({ onSubmit, prevData }: ThemeFormProps) => {
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
  useEffect(() => {
    if (prevData) {
      setValues({
        ...prevData,
        activities: prevData.activities.map((activity) => ({
          label: activity.title,
          value: activity.id,
        })),
      });
    }
    // eslint-disable-next-line
  }, [prevData]);

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
          variant="outlined"
          color="primary"
          className={classes.title}
        />

        <AdminFileUpload
          defaultImage={prevData?.resources?.icon || undefined}
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
          variant="outlined"
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
        />
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ThemeForm;
