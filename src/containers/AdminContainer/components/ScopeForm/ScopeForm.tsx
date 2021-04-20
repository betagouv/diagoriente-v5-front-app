import React from 'react';
import { useForm } from 'hooks/useInputs';
import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';

interface ScopeFormValues {
  name: string;
}

interface ScopeFormProps {
  onSubmit: (values: ScopeFormValues) => void;
}

const ScopeForm = ({ onSubmit }: ScopeFormProps) => {
  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      name: '',
    },
  });
  const { values } = state;
  const { handleChange } = actions;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm = {
      name: values.name,
    };
    onSubmit(dataForm);
  };
  return (
    <Grid container>
      <Grid item lg={6} md={12} sm={12}>
        <form onSubmit={handleSubmit} className={classes.wrapper}>
          <AdminTextField
            name="name"
            value={values.name}
            onChange={handleChange}
            label="Nom de scope"
            color="primary"
            className={classes.title}
          />
          <Button type="submit" className={classes.button} variant="contained" color="primary">
            Submit
          </Button>{' '}
        </form>
      </Grid>
    </Grid>
  );
};

export default ScopeForm;
