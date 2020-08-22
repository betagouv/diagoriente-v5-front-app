import React, { useEffect } from 'react';

import { useForm } from 'hooks/useInputs';
import { Context } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';
import AdminFileUpload from 'components/inputs/AdminFileUpload/AdminFileUpload';

import useStyles from './styles';

interface ContextFormValues {
  title: string;
  description: string;
}

interface ContextFormProps {
  onSubmit: (values: ContextFormValues) => void;
  context?: Context;
}

const ContextForm = ({ onSubmit, context }: ContextFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      description: '',
      icon: undefined as File | undefined,
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (context) {
      setValues({ ...context, icon: undefined });
    }
    // eslint-disable-next-line
  }, [context]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values };
    if (!data.icon) delete data.icon;
    onSubmit(data);
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
          defaultImage={context?.icon}
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
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ContextForm;
