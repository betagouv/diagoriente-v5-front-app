import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Input from 'components/inputs/Select/input/input';
import Button from 'components/button/Button';
import CheckBox from 'components/inputs/Select/checkBox/checkBox';
import { useForm } from 'hooks/useInputs';
import { useRegister } from 'requests/auth';
import {
  validateEmail,
  validatePassword,
  isStringEmpty,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecial,
} from 'utils/validation';
import classNames from 'utils/classNames';
import useStyles from './style';

const Register = ({ history }: RouteComponentProps) => {
  const [error, setError] = useState('');
  const checkBoxRef = useRef(null);
  const [errorForm, setErrorForm] = useState<string>('');
  const [errorFormObject, setErrorFormObject] = useState<{ key: string; value: string }>({ key: '', value: '' });

  const classes = useStyles();
  const [state, actions] = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      logo: '',
      email: '',
      password: '',
      location: '',
      institution: '',
      codeGroupe: '',
      acceptCondition: false,
    },
    validation: {
      firstName: isStringEmpty,
      lastName: isStringEmpty,
      email: validateEmail,
      password: validatePassword,
      logo: isStringEmpty,
      location: isStringEmpty,
    },
    required: ['firstName', 'lastName', 'email', 'password', 'logo', 'location'],
  });
  const { values, errors, touched } = state;
  const [registerCall, registerState] = useRegister();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (actions.validateForm()) {
      if (values.acceptCondition) {
        registerCall({
          variables: values,
        });
      } else {
        setError("Veuillez accepter les conditions générales d'utilisation");
      }
    } else {
      actions.setAllTouched(true);
    }
  };
  useEffect(() => {
    if (registerState.data && !registerState.error) {
      history.push('/');
    } else {
      if (typeof registerState.error?.graphQLErrors[0].message === 'string') {
        setErrorForm(registerState.error?.graphQLErrors[0].message);
      }
      if (typeof registerState.error?.graphQLErrors[0].message === 'object') {
        const t = registerState.error?.graphQLErrors[0].message;
        const key = Object.keys((t as any).originalError)[0];
        const value: any = Object.values((t as any).originalError)[0];
        setErrorFormObject({ key, value });
      }
    }
  }, [registerState.data, registerState.error, history]);
  useEffect(() => {
    if (values.acceptCondition) {
      setError('');
    }
  }, [values.acceptCondition]);
  const onClickCondition = () => {
    if (checkBoxRef.current) {
      console.log(checkBoxRef.current);
      //(checkBoxRef.current as any)?.onclick();
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.registerContainer}>
        <div className={classes.descriptionContainer}>
          <div className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id malesuada erat. Proin vel ipsum non
            dolor interdum laoreet sit amet nec massa.
          </div>
        </div>
        <div className={classes.form}>
          <div className={classes.errorCondition}>{errorForm}</div>
          <form onSubmit={onSubmit}>
            <Input
              name="firstName"
              label="Ton prénom* : "
              onChange={actions.handleChange}
              value={values.firstName}
              placeholder="prénom"
              error={touched.firstName && errors.firstName !== ''}
              errorText={touched.firstName ? errors.firstName : ''}
            />
            <Input
              label="Ton nom de famille* :"
              onChange={actions.handleChange}
              value={values.lastName}
              name="lastName"
              placeholder="nom"
              error={touched.lastName && (errors.lastName !== '' || errorFormObject.key === 'lastName')}
              errorText={touched.lastName ? errors.lastName : ''}
            />
            <Input
              label="Ton image de profil : "
              subTitle="Choisis un avatar"
              onChange={actions.handleChange}
              value={values.logo}
              name="logo"
            />
            <Input
              label="Ton email* : "
              onChange={actions.handleChange}
              value={values.email}
              name="email"
              placeholder="exmaple@gmail.com"
              error={touched.email && (errors.email !== '' || errorFormObject.key === 'email')}
              errorText={touched.email ? errors.email : ''}
              errorForm={errorFormObject.key === 'email' ? errorFormObject.value : ''}
            />
            <Input
              label="Ton mot de passe* : "
              onChange={actions.handleChange}
              value={values.password}
              name="password"
              type="password"
              placeholder="*******"
              autoComplete="off"
              error={
                touched.password
                && errors.password !== ''
                && hasUppercase(values.password)
                && hasLowercase(values.password)
                && hasNumber(values.password)
                && hasSpecial(values.password)
              }
              errorText={touched.password ? errors.password : ''}
            />
            <div>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <div>
                    <div className={classes.optionItem}>
                      Ton mot de passe doit avoir 6 caractères minimum, dont au moins:
                    </div>
                    <div className={classes.option}>
                      <div className={classes.optionWrapper}>
                        <div
                          className={classNames(
                            classes.optionItem,
                            hasUppercase(values.password) && classes.checkOption,
                          )}
                        >
                          • 1 majuscule
                        </div>
                        <div
                          className={classNames(
                            classes.optionItem,
                            hasLowercase(values.password) && classes.checkOption,
                          )}
                        >
                          • 1 minuscule
                        </div>
                      </div>
                      <div className={classes.optionWrapper}>
                        <div
                          className={classNames(classes.optionItem, hasNumber(values.password) && classes.checkOption)}
                        >
                          • 1 chiffre
                        </div>
                        <div
                          className={classNames(classes.optionItem, hasSpecial(values.password) && classes.checkOption)}
                        >
                          • 1 caractère spécial
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Input
              label="Ton emplacement géographique : "
              onChange={actions.handleChange}
              value={values.location}
              name="location"
              placeholder="paris"
              error={touched.location && errors.location !== ''}
              errorText={touched.location ? errors.location : ''}
            />
            <Input
              label="Instituation : "
              onChange={actions.handleChange}
              value={values.institution}
              name="institution"
              error={touched.institution && errors.institution !== ''}
              errorText={touched.institution ? errors.institution : ''}
            />
            <Input
              label="Code groupe : "
              onChange={actions.handleChange}
              value={values.codeGroupe}
              name="codeGroupe"
              placeholder="ex: codeGroupe1"
              error={touched.codeGroupe && errors.codeGroupe !== ''}
              errorText={touched.codeGroupe ? errors.codeGroupe : ''}
            />
            <div className={classes.groupTextContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <div className={classes.groupText}>
                    Si tu es dans un groupe, renseigne ici le code qui t&lsquo;a été remis.
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.groupTextContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <div className={classes.containerCheckbox}>
                    <CheckBox
                      ref={checkBoxRef}
                      onChange={actions.handleChange}
                      checked={values.acceptCondition}
                      name="acceptCondition"
                    />
                    <div className={classes.conditionText} onClick={onClickCondition}>
                      J&lsquo;accepte les
                      {' '}
                      <span className={classes.conditionColorText}>conditions d&lsquo;utilisation</span>
                      {' '}
                      de Diagoriente*
                    </div>
                  </div>
                  <div className={classes.errorCondition}>{error}</div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.btnContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <Button className={classes.btn} type="submit">
                    <div className={classes.btnLabel}>Je m’inscris</div>
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={classes.btnContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <div className={classes.conditionText}>* Champs obligatoires</div>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
