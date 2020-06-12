import React, { useContext } from 'react';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import UserContext from 'contexts/UserContext';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { validatePassword } from 'utils/validation';
import { useReset } from 'requests/auth';
import { useForm } from 'hooks/useInputs';

import useAuth from 'hooks/useAuth';
import { decodeUri } from 'utils/url';
import useStyles from '../ForgotPassword/styles';

const RenewPassword = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const { token } = decodeUri(location.search);
  const [resetCall, resetState] = useAuth(useReset);
  const { user } = useContext(UserContext);
  const [state, actions] = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validation: {
      password: validatePassword,
      confirmPassword: validatePassword,
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      if (state.values.password === state.values.confirmPassword) {
        resetCall({ variables: { password: state.values.password, token } });
      }
    } else {
      actions.setAllTouched(true);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>MOT DE PASSE OUBLIÉ</div>
        <div className={classes.subTitle}>Entre votre nouvelle password :</div>
        <form className={classes.container} onSubmit={onSubmit}>
          <Input
            label="Nouvelle mot de passe"
            name="password"
            type="password"
            required
            placeholder="exmaple@gmail.com"
            value={state.values.password}
            onChange={actions.handleChange}
            errorText={state.touched.password && state.errors.password}
          />
          <Input
            label="Confirmer votre mot de passe"
            name="confirmPassword"
            required
            type="password"
            placeholder="exmaple@gmail.com"
            value={state.values.confirmPassword}
            onChange={actions.handleChange}
            errorText={state.touched.confirmPassword && state.errors.confirmPassword}
          />
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Button className={classes.btn} type="submit" fetching={resetState.loading}>
                  <div className={classes.btnLabel}>Confirmer</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenewPassword;
