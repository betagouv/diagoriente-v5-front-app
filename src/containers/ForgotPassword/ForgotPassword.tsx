import React from 'react';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import { validateEmail } from 'utils/validation';
import { useForgot } from 'requests/auth';

import { useForm } from 'hooks/useInputs';
import useStyles from './styles';

const ForgotPassword = () => {
  const classes = useStyles();
  const [forgotCall, forgotState] = useForgot();
  const [state, actions] = useForm({
    initialValues: { email: '' },
    validation: {
      email: validateEmail,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      forgotCall({ variables: { email: state.values.email } });
    } else {
      actions.setAllTouched(true);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>MOT DE PASSE OUBLIé</div>
        <div className={classes.subTitle}>
          Entre l’email que tu utilises pour te connecter afin de réinitialiser ton mot de passe :
        </div>
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
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Button className={classes.btn} type="submit" fetching={forgotState.loading}>
                  <div className={classes.btnLabel}>Envoyer</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
