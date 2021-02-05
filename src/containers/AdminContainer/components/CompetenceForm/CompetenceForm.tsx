import React, { useEffect } from 'react';

import { useForm } from 'hooks/useInputs';
import { Competence } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';
import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';

import useStyles from './styles';

interface ContextFormValues {
  title: string;
  type: string;
}

interface ContextFormProps {
  onSubmit: (values: ContextFormValues) => void;
  competence?: Competence;
}

const CompetenceForm = ({ onSubmit, competence }: ContextFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      type: '',
      rank: 0,
      niveau: [...new Array(4)].map(() => ({ title: '', sub_title: '' })),
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (competence) {
      setValues({
        ...competence,
        type: competence.type || 'default',
        niveau: [...new Array(4)].map((c, i) =>
          (competence.niveau[i]
            ? { title: competence.niveau[i].title, sub_title: competence.niveau[i].sub_title }
            : { title: '', sub_title: '' })),
      });
    }
    // eslint-disable-next-line
  }, [competence]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values, rank: Number(values.rank)};

    if (!data.type || data.type === 'default') delete data.type;
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
        <AdminSelect
          name="type"
          value={values.type}
          onChange={handleChange}
          options={[
            { value: 'default', label: 'Défault' },
            { value: 'engagement', label: 'Engagement' },
          ]}
          label="Type"
          className={classes.type}
        />
        <AdminTextField className={classes.rank} name="rank" value={values.rank} onChange={handleChange} label="Rang" />
        <div className={classes.niveau}>
          {values.niveau.map((niveau, index) => (
            // eslint-disable-next-line
            <div key={index} className={classes.niveauItem}>
              <AdminTextField
                onChange={(e) =>
                  setValues({
                    niveau: values.niveau.map((n, i) => (index !== i ? n : { ...n, title: e.target.value })),
                  })}
                label={`Titre du niveau ${index + 1}`}
                value={niveau.title}
                className={classes.title}
              />
              <AdminTextField
                onChange={(e) =>
                  setValues({
                    niveau: values.niveau.map((n, i) => (index !== i ? n : { ...n, sub_title: e.target.value })),
                  })}
                label={`Sous-titre de niveau ${index + 1}`}
                value={niveau.sub_title}
                className={classes.subTitle}
              />
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CompetenceForm;
