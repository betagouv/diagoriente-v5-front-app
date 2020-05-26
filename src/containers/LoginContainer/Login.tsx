import React, {
 useContext, useEffect, useRef, useState,
} from 'react';
import Input from 'components/inputs/Input/Input';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import localforage from 'localforage';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import ParcourContext from 'contexts/ParcourContext';
import { decodeUri } from 'utils/url';
import { validateEmail } from 'utils/validation';

import { useForm } from 'hooks/useInputs';

import { setAuthorizationBearer } from 'requests/client';
import { useLogin } from 'requests/auth';
import { useGetUserParcour } from 'requests/parcours';

import useStyles from './styles';

const Login = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const [showPasswordState, setShowPassword] = useState(false);
  const [getUserParcour, getUserParcourState] = useGetUserParcour();
  const [errorForm, setErrorForm] = useState<string>('');
  const checkBoxRef = useRef(null);

  const { user, setUser } = useContext(UserContext);
  const { setParcours } = useContext(ParcourContext);

  const [loginCall, loginState] = useLogin();

  const [state, actions] = useForm({
    initialValues: { email: '', password: '', stayConnected: false },
    validation: {
      email: validateEmail,
    },
  });

  useEffect(() => {
    if (loginState.data && !getUserParcourState.data) {
      setAuthorizationBearer(loginState.data.login.token.accessToken);
      getUserParcour();
    } else if (loginState.data && getUserParcourState.data) {
      setParcours(getUserParcourState.data.getUserParcour);
      if (state.values.stayConnected) {
        localforage.setItem('auth', JSON.stringify(loginState.data.login));
      }
      setUser(loginState.data.login.user);
    }
  }, [loginState.data, getUserParcourState.data, setParcours, getUserParcour, setUser, state.values.stayConnected]);

  useEffect(() => {
    if (loginState.error?.graphQLErrors.length !== 0) {
      if (loginState.error?.graphQLErrors[0].message) {
        setErrorForm(loginState.error?.graphQLErrors[0].message);
      }
    }

    if (getUserParcourState.error && getUserParcourState.error.graphQLErrors.length) {
      if (getUserParcourState.error.graphQLErrors[0].message) {
        setErrorForm(getUserParcourState.error.graphQLErrors[0].message);
      }
    }
  }, [loginState.error, getUserParcourState.error]);

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

  const onClickCondition = () => {
    if (checkBoxRef.current) {
      // (checkBoxRef.current as any)?.onclick();
    }
  };
  const onShowPassword = () => {
    setShowPassword(!showPasswordState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>CONNEXION</div>
        <div className={classes.errorCondition}>{errorForm}</div>
        <form className={classes.container} onSubmit={onSubmit}>
          <Input
            label="Ton email"
            name="email"
            required
            placeholder="exmaple@gmail.com"
            value={state.values.email}
            onChange={actions.handleChange}
            errorText={state.touched.email && state.errors.email}
          />
          <Input
            label="Ton mot de passe"
            name="password"
            required
            placeholder="*******"
            type={!showPasswordState ? 'password' : ''}
            showPassword={() => onShowPassword()}
            value={state.values.password}
            onChange={actions.handleChange}
            errorText={state.touched.password && state.errors.password}
          />
          <div className={classes.groupTextContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Link to="/forgotPassword">
                  <div className={classes.forgotText}>J’ai oublié mon mot de passe</div>
                </Link>
              </Grid>
            </Grid>
          </div>
          <div className={classes.groupTextContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <div className={classes.containerCheckbox}>
                  <CheckBox onChange={actions.handleChange} checked={state.values.stayConnected} name="stayConnected" />
                  <div className={classes.conditionText} onClick={onClickCondition}>
                    Rester connectée
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
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
