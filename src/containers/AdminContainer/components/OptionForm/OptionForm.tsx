import React, { useEffect } from 'react';

import { useForm } from 'hooks/useInputs';
import { Option } from 'requests/types';
import { useLazyOptions } from 'requests/options';
import { useQuestions } from 'requests/questions';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';
import AdminCheckBox from 'components/inputs/AdminCheckbox/AdminCheckbox';
import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';

import DeleteIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/AddCircle';

import Label from 'components/inputs/Label/Label';
import useStyles from './styles';

interface OptionFormValues {
  title: string;
  parent?: string[][];
  question: string;
}

interface OptionFormProps {
  onSubmit: (values: OptionFormValues) => void;
  option?: Option;
}

const OptionForm = ({ onSubmit, option }: OptionFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      title: '',
      parent: [[]] as { label: string; value: string }[][],
      question: null as null | { label: string; value: string },
      verified: true,
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;

  useEffect(() => {
    if (option) {
      setValues({
        ...option,
        parent:
          option.parent.length > 0
            ? option.parent.map((parentList) =>
                parentList.path.map((parent) => ({ label: parent.title, value: parent.id })))
            : [[]],
        question: { label: option.question.title, value: option.question.id },
      });
    }
    // eslint-disable-next-line
  }, [option]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (values.question) {
      const data = {
        ...values,
        parent: values.parent
          .filter((parentList) => parentList.length)
          .map((parentList) => parentList.map((parent) => parent.value)),
        question: values.question.value,
      };
      onSubmit(data);
    }
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
          handleOptions={(question) => ({
            label: `${question.title} ${question.parent ? `(${question.parent.title})` : ''}`,
            value: question.id,
          })}
          value={values.question}
          onChange={(e, value) => setValues({ question: value })}
          multiple={false}
          label="Question"
          className={classes.question}
        />
        <div className={classes.parent}>
          <Label>Parent</Label>
          {values.parent.map((parentList, index) => (
            // eslint-disable-next-line
            <div key={index} className={classes.parentContainer}>
              <AdminAutocomplete
                list={useLazyOptions}
                handleOptions={(o) => ({
                  label: o.title,
                  value: o.id,
                })}
                value={parentList}
                onChange={(e, value) => setValues({ parent: values.parent.map((p, i) => (index === i ? value : p)) })}
                variables={{ parent: parentList.map(({ value }) => value).join(',') }}
                multiple
                className={classes.parentInput}
                lazy
              />

              {values.parent.length > 1 && (
                <DeleteIcon
                  onClick={() => setValues({ parent: values.parent.filter((p, i) => i !== index) })}
                  className={classes.parentDelete}
                />
              )}
              {index === values.parent.length - 1 && (
                <AddIcon onClick={() => setValues({ parent: [...values.parent, []] })} className={classes.parentAdd} />
              )}
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

export default OptionForm;
