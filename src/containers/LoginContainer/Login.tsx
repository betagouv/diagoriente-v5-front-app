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
import { decodeUri } from 'utils/url';
import { validateEmail } from 'utils/validation';

import { useForm } from 'hooks/useInputs';

import { setAuthorizationBearer } from 'requests/client';
import { useLogin } from 'requests/auth';
import useStyles from './styles';

const Login = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const [showPasswordState, setShowPasswoed] = useState(false);
  const checkBoxRef = useRef(null);

  const { user, setUser } = useContext(UserContext);
  const [loginCall, loginState] = useLogin();

  const [state, actions] = useForm({
    initialValues: { email: '', password: '', stayConnected: false },
    validation: {
      email: validateEmail,
    },
  });

  useEffect(() => {
    if (loginState.data) {
      setAuthorizationBearer(loginState.data.login.token.accessToken);
      if (state.values.stayConnected) {
        localforage.setItem('auth', JSON.stringify(loginState.data.login));
      }
      setUser(loginState.data.login.user);
    }
  }, [loginState.data, setUser, state.values.stayConnected]);

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
    setShowPasswoed(!showPasswordState);
  };
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>connexion</div>
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
                  <CheckBox
                    ref={checkBoxRef}
                    onChange={actions.handleChange}
                    checked={state.values.stayConnected}
                    name="stayConnected"
                  />
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
