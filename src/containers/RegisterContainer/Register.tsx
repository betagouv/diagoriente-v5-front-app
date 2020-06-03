import React, { useEffect, useState, useRef, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { setAuthorizationBearer } from 'requests/client';
import Grid from '@material-ui/core/Grid';
import Input from 'components/inputs/Input/Input';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import Button from 'components/button/Button';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Spinner from 'components/Spinner/Spinner';
import { useForm } from 'hooks/useInputs';
import UserContext from 'contexts/UserContext';
import { useGetUserParcour } from 'requests/parcours';
import { useRegister, useAvatars } from 'requests/auth';
import ParcourContext from 'contexts/ParcourContext';
import localforage from 'localforage';

import { useLocation } from 'requests/location';
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
import useStyles from './styles';

const Register = ({ history }: RouteComponentProps) => {
  const [errorCondition, setErrorCondition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [showPasswordState, setShowPasswoed] = useState(false);
  const { setParcours } = useContext(ParcourContext);
  const { setUser } = useContext(UserContext);
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
  const [getUserParcour, getUserParcourState] = useGetUserParcour();
  const { loading: loadingAvatar, data: avatarData } = useAvatars();
  const { data, loading } = useLocation({ variables: { search: values.location } });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (actions.validateForm()) {
      if (values.acceptCondition) {
        const res = { ...values, location: selectedLocation };
        registerCall({
          variables: res,
        });
      } else {
        setErrorCondition("Veuillez accepter les conditions générales d'utilisation");
      }
    } else {
      if (selectedAvatar === '') {
        setErrorForm('Choisir un avatar');
      }
      actions.setAllTouched(true);
    }
  };
  useEffect(() => {
    if (registerState.data && !registerState.error) {
      setAuthorizationBearer(registerState.data.register.token.accessToken);
      getUserParcour();
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
  }, [registerState.data, registerState.error, values.email, values.password, registerState, getUserParcour, setUser]);

  useEffect(() => {
    if (getUserParcourState.data) {
      setParcours(getUserParcourState?.data?.getUserParcour);
      setUser(registerState.data?.register.user || null);
      localforage.setItem('auth', JSON.stringify(registerState.data?.register));
      history.push('/confirmation');
    }
  }, [setParcours, getUserParcourState, registerState, history, setUser]);

  useEffect(() => {
    if (values.acceptCondition) {
      setErrorCondition('');
    }
  }, [values.acceptCondition]);
  const onClickCondition = () => {
    if (checkBoxRef.current) {
      // (checkBoxRef.current as any)?.onclick();
    }
  };
  const onShowPassword = () => {
    setShowPasswoed(!showPasswordState);
  };
  const onSelect = (e: string | null) => {
    if (e) setSelectedLocation(e);
  };
  const onAvatarClick = (url: string) => {
    if (selectedAvatar === url) {
      actions.setValues({
        logo: '',
      });
      setSelectedAvatar('');
    } else {
      actions.setValues({
        logo: url,
      });
      setErrorForm('');
      setSelectedAvatar(url);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.registerContainer}>
        <div className={classes.title}>INSCRIPTION</div>
        <div className={classes.form}>
          <div className={classes.btnContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.emptyDiv} />
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <div className={classes.errorCondition}>{errorForm}</div>
              </Grid>
            </Grid>
          </div>
          <form onSubmit={onSubmit} className={classes.formContainer}>
            <Input
              name="firstName"
              label="Ton prénom"
              onChange={actions.handleChange}
              value={values.firstName}
              placeholder="prénom"
              required
              error={touched.firstName && errors.firstName !== ''}
              errorText={touched.firstName ? errors.firstName : ''}
            />
            <Input
              label="Ton nom de famille"
              onChange={actions.handleChange}
              value={values.lastName}
              name="lastName"
              required
              placeholder="nom"
              error={touched.lastName && (errors.lastName !== '' || errorFormObject.key === 'lastName')}
              errorText={touched.lastName ? errors.lastName : ''}
            />
            <div className={classes.avatarsWrapper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.labelConatiner}>
                    <div className={classes.label}>Ton image de profil </div>
                    <div className={classes.subLabel}>Choisis un avatar</div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div className={classes.avatarsContainer}>
                    {loadingAvatar && <Spinner />}
                    {avatarData?.avatars.data.map((el) => (
                      <div key={el.id} style={{ margin: '0px 7px' }} onClick={() => onAvatarClick(el.url)}>
                        <img
                          src={el.url}
                          alt=""
                          className={classNames(classes.avatar, selectedAvatar === el.url && classes.selectedAvatar)}
                        />
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
            <Input
              label="Ton e-mail*"
              onChange={actions.handleChange}
              value={values.email}
              name="email"
              required
              placeholder="exmaple@gmail.com"
              error={touched.email && (errors.email !== '' || errorFormObject.key === 'email')}
              errorText={touched.email ? errors.email : ''}
              errorForm={errorFormObject.key === 'email' ? errorFormObject.value : ''}
            />
            <Input
              label="Ton mot de passe"
              onChange={actions.handleChange}
              value={values.password}
              name="password"
              required
              type={!showPasswordState ? 'password' : ''}
              showPassword={() => onShowPassword()}
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
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div>
                    <div className={classes.optionItem}>
                      Ton mot de passe doit comporter 6 caractères minimum, dont au moins :
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
            <AutoComplete
              label="Ton emplacement géographique"
              onChange={actions.handleChange}
              onSelectText={onSelect}
              value={values.location}
              name="location"
              placeholder="paris"
              options={!loading && data ? data.location : []}
              error={touched.location && errors.location !== ''}
              errorText={touched.location ? errors.location : ''}
              errorForm={errorFormObject.key === 'location' ? errorFormObject.value : ''}

            />
            <Input
              label="Code groupe"
              onChange={actions.handleChange}
              value={values.codeGroupe}
              name="codeGroupe"
              placeholder="ex: codeGroupe1"
              error={touched.codeGroupe && (errors.codeGroupe !== '' || errorFormObject.key === 'codeGroupe')}
              errorText={touched.codeGroupe ? errors.codeGroupe : ''}
              errorForm={errorFormObject.key === 'codeGroupe' ? errorFormObject.value : ''}
            />
            <div className={classes.groupTextContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div className={classes.groupText}>
                    Si tu es dans un groupe, renseigne ici le code qui t&lsquo;a été remis.
                  </div>
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
                      onChange={actions.handleChange}
                      checked={values.acceptCondition}
                      name="acceptCondition"
                      color="#011A5E"
                    />
                    <div className={classes.conditionText} onClick={onClickCondition}>
                      J&lsquo;accepte les
                      {' '}
                      <span className={classes.conditionColorText}>conditions d&lsquo;utilisation</span>
                      {' '}
                      de Diagoriente
                      <span className={classes.start}>*</span>
                    </div>
                  </div>
                  <div className={classes.errorCondition}>{errorCondition}</div>
                </Grid>
              </Grid>
            </div>
            <div className={classNames(classes.btnContainer, classes.paddingBtn)}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <Button className={classes.btn} type="submit">
                    <div className={classes.btnLabel}>Je m’inscris</div>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
          <div className={classes.btnContainer}>
            <div className={classes.required}>
              <span className={classes.start}>*</span>
              Champs obligatoires
            </div>
          </div>
          <div className={classes.btnContainer}>
            <Link to="/login">
              <div className={classes.registerLabel}>J’ai déjà un compte</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
