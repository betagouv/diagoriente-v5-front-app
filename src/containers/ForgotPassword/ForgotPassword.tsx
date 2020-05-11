import React from 'react';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import { validateEmail } from 'utils/validation';

import { useForm } from 'hooks/useInputs';
import useStyles from './styles';

const Login = () => {
  const classes = useStyles();

  const [state, actions] = useForm({
    initialValues: { email: '' },
    validation: {
      email: validateEmail,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      // call api
    } else {
      actions.setAllTouched(true);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>MOT DE PASSE OUBLIé</div>
        <div className={classes.subTitle}>Entre l’email que tu utilises pour te connecter afin de réinitialiser ton mot de passe :</div>
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
              <Grid item xs={12} sm={5} md={4}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <Button className={classes.btn} type="submit">
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

export default Login;
