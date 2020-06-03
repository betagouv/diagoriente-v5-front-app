import React, { useState, useEffect } from 'react';
import Input from 'components/inputs/Input/Input';
import Button from 'components/button/Button';
import { validateEmail } from 'utils/validation';
import { Link } from 'react-router-dom';
import { useForgot } from 'requests/auth';

import { useForm } from 'hooks/useInputs';
import useStyles from './styles';

const ForgotPassword = () => {
  const classes = useStyles();
  const [sent, setSend] = useState(false);
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
  useEffect(() => {
    if (forgotState.data && !forgotState.error) {
      setSend(true);
    }
  }, [forgotState.data, forgotState.error]);
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>MOT DE PASSE OUBLIÉ</div>
        {sent ? (
          <>
            <div className={classes.subTitleSent}>Nous t’avons envoyé un mail pour réinitialiser ton mot de passe.</div>
            <div className={classes.subTitleSent}>Si tu n’as rien reçu, vérifie tes courriers indésirables.</div>
          </>
        ) : (
          <div className={classes.subTitle}>
            Tu as perdu ton mot de passe ? Rien de plus simple ! Entre ton adresse e-mail rattachée à ton compte :
          </div>
        )}
        <form className={classes.container} onSubmit={onSubmit}>
          {!sent && (
            <Input
              label="Ton adresse e-mail"
              name="email"
              required
              placeholder="exmaple@gmail.com"
              value={state.values.email}
              onChange={actions.handleChange}
              errorText={state.touched.email && state.errors.email}
            />
          )}
          <div className={classes.btnContainer}>
            {sent ? (
              <Link to="/login">
                {' '}
                <Button className={classes.btn} fetching={forgotState.loading}>
                  <div className={classes.btnLabel}>Retour à l’accueil</div>
                </Button>
              </Link>
            ) : (
              <Button className={classes.btn} type="submit" fetching={forgotState.loading}>
                <div className={classes.btnLabel}>Je réinitialise mon mot de passe</div>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
