import React, { useEffect } from 'react';

import { useForm } from 'hooks/useInputs';
import { Question } from 'requests/types';
import { useQuestions } from 'requests/questions';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';

import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';
import useStyles from './styles';

interface QuestionFormValues {
  title: string;
  parent?: string;
}

interface QuestionFormProps {
  onSubmit: (values: QuestionFormValues) => void;
  question?: Question;
}

const QuestionForm = ({ onSubmit, question }: QuestionFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      parent: null as null | { label: string; value: string },
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (question) {
      setValues({
        ...question,
        parent: question.parent ? { label: question.parent.title, value: question.parent.id } : null,
      });
    }
    // eslint-disable-next-line
  }, [question]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values, parent: values.parent?.value };

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
        <AdminAutocomplete
          list={useQuestions}
          handleOptions={(option) => ({
            label: `${option.title} ${option.parent ? `(${option.parent.title})` : ''}`,
            value: option.id,
          })}
          value={values.parent}
          onChange={(e, value) => setValues({ parent: value })}
          multiple={false}
          label="Parent"
        />
      </div>
      <Button type="submit" className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default QuestionForm;
