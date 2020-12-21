import React, { useEffect, useState } from 'react';
import { useForm } from 'hooks/useInputs';
import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Button from '@material-ui/core/Button/Button';
import { useAffectUserCode, useUsersLazy } from 'requests/user';
import Snackbar from 'components/SnackBar/SnackBar';
import useStyles from './styles';

interface IProps {
  email: string;
  setOpenUpdate: (e: boolean) => void;
}

const UpdateCodeForm = ({ email, setOpenUpdate }: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [updateCall, updateState] = useAffectUserCode();
  const [usersCall, userCallState] = useUsersLazy({ fetchPolicy: 'network-only' });

  const [state, actions] = useForm({
    initialValues: {
      email: '',
      code: '',
    },
  });
  const { values } = state;
  const { handleChange, setValues } = actions;
  const handleSubmit = () => {
    if (values.email && values.code) {
      updateCall({ variables: { email: values.email, code: values.code } });
    } else {
      setError('inputs');
    }
  };
  useEffect(() => {
    if (email) {
      setValues({ email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  useEffect(() => {
    if (updateState.data) {
      setOpenUpdate(false);
      usersCall();
    } else {
      setError((updateState.error as any)?.graphQLErrors[0].message);
    }
  }, [updateState.data, updateState.error, setOpenUpdate, usersCall]);
  return (
    <div className={classes.wrapper}>
      <AdminTextField
        name="email"
        value={values.email}
        onChange={handleChange}
        label="Email"
        color="primary"
        className={classes.title}
        disabled
      />
      <AdminTextField
        name="code"
        value={values.code}
        onChange={handleChange}
        label="Code groupe"
        color="primary"
        className={classes.title}
      />
      <Button onClick={handleSubmit} className={classes.button} variant="contained" color="primary">
        Submit
      </Button>
      <Snackbar variant="error" open={Boolean(error)} message={error} handleClose={() => setError('')} />
    </div>
  );
};

export default UpdateCodeForm;
