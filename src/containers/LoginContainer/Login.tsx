import React, { useContext, useEffect } from 'react';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import localforage from 'localforage';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import { decodeUri } from 'utils/url';
import {
 validateEmail, validatePassword, hasLowercase, hasNumber, hasSpecial, hasUppercase,
} from 'utils/validation';

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
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <form className={classes.container} onSubmit={onSubmit}>
          <Input
            label="Ton email* : "
            name="email"
            placeholder="exmaple@gmail.com"
            value={state.values.email}
            onChange={actions.handleChange}
            errorText={state.touched.email && state.errors.email}
          />
          <Input
            label="Ton mot de passe* : "
            name="password"
            placeholder="*******"
            type="password"
            value={state.values.password}
            onChange={actions.handleChange}
            errorText={state.touched.password && state.errors.password}
          />
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={5} md={4}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <Button className={classes.btn} type="submit">
                  <div className={classes.btnLabel}>Je me connecte</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
