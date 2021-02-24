import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from 'components/inputs/Input/Input';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import { decodeUri } from 'utils/url';
import { validateEmail } from 'utils/validation';
import { useForm } from 'hooks/useInputs';

import { useLogin } from 'requests/auth';

import useAuth from 'hooks/useAuth';
import useStyles from './styles';

const Login = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const [showPasswordState, setShowPassword] = useState(false);
  const [state, actions] = useForm({
    initialValues: { email: '', password: '', stayConnected: false, isCampus: true },
    validation: {
      email: validateEmail,
    },
  });

  const [loginCall, loginState] = useAuth(useLogin, state.values.stayConnected);
  const [errorCount, setErrorCount] = useState(0);

  const [errorForm, setErrorForm] = useState<string>('');
  const checkBoxRef = useRef(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (loginState.error?.graphQLErrors.length !== 0) {
      if (
        loginState.error?.graphQLErrors[0].message &&
        typeof loginState.error?.graphQLErrors[0].message === 'object'
      ) {
        setErrorForm((loginState.error?.graphQLErrors[0].message as any).message);
      } else if (
        loginState.error?.graphQLErrors[0].message &&
        typeof loginState.error?.graphQLErrors[0].message === 'string'
      ) {
        setErrorCount(errorCount + 1);

        setErrorForm(loginState.error?.graphQLErrors[0].message);
      }
    }
    if (loginState.error?.message && loginState.error?.graphQLErrors.length === 0) {
      setErrorForm(loginState.error?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.error]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      loginCall({ variables: state.values });
    } else {
      actions.setAllTouched(true);
    }
  };

  const onClickCondition = () => {
    if (checkBoxRef.current) {
      // (checkBoxRef.current as any)?.onclick();
    }
  };
  const onShowPassword = () => {
    setShowPassword(!showPasswordState);
  };
  if (user) {
    const { from } = decodeUri(location.search);

    return <Redirect to={from || '/'} />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>CONNEXION</div>
        <div className={classes.errorCondition}>{errorForm}</div>
        <form className={classes.container} onSubmit={onSubmit}>
          <Input
            label="Ton adresse e-mail"
            name="email"
            required
            placeholder="email@gmail.com"
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
                  <div className={classes.forgotText}>Mot de passe oublié ?</div>
                </Link>
              </Grid>
            </Grid>
          </div>
          {/* {openVerif && (
            <div className={classes.groupTextContainer}>
              <Recaptcha />
            </div>
          )} */}
          <div className={classes.groupTextContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <div className={classes.containerCheckbox}>
                  <CheckBox
                    onChange={actions.handleChange}
                    checked={state.values.stayConnected}
                    name="stayConnected"
                    color="#00B2DB"
                  />
                  <div className={classes.conditionText} onClick={onClickCondition}>
                    Garder ma session active
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
                <Button className={classes.btn} type="submit" fetching={loginState.loading}>
                  <div className={classes.btnLabel}>Je me connecte</div>
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Link to="/register">
                  <div className={classes.registerLabel}>Je n’ai pas encore de compte</div>
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
