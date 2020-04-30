import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import localforage from 'localforage';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import { decodeUri } from 'utils/url';
import { validateEmail, validatePassword } from 'utils/validation';

import { useForm } from 'hooks/useInputs';

import { setAuthorizationBearer } from 'requests/client';
import { useLogin } from 'requests/auth';

import useStyles from './styles';

const Login = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [loginCall, loginState] = useLogin();

  const [state, actions] = useForm({
    initialValues: { email: '', password: '' },
    validation: {
      email: validateEmail,
      password: validatePassword,
    },
  });

  useEffect(() => {
    if (loginState.data) {
      setAuthorizationBearer(loginState.data.login.token.accessToken);
      localforage.setItem('auth', JSON.stringify(loginState.data.login));
      setUser(loginState.data.login.user);
    }
  }, [loginState.data, setUser]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      loginCall({ variables: state.values });
    } else {
      actions.setAllTouched(true);
    }
  };

  if (user) {
    const { from } = decodeUri(location.search);
    return <Redirect to={from || '/'} />;
  }

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <TextField
        className={classes.field}
        variant="outlined"
        name="email"
        value={state.values.email}
        onChange={actions.handleChange}
      />
      <span className={classes.errorText}>{state.touched.email && state.errors.email}</span>

      <TextField
        className={classes.field}
        variant="outlined"
        name="password"
        value={state.values.password}
        onChange={actions.handleChange}
      />
      <span className={classes.errorText}>{state.touched.password && state.errors.password}</span>
      <Button>Connecter</Button>
    </form>
  );
};

export default Login;
