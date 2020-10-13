import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Input from 'components/inputs/Input/Input';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import Button from 'components/button/Button';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Spinner from 'components/Spinner/Spinner';
import { useForm } from 'hooks/useInputs';
import { useRegister, useAvatars } from 'requests/auth';
import Attention from 'assets/svg/attention.svg';
import LogoLocation from 'assets/form/location.png';
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
import useAuth from 'hooks/useAuth';
import UserContext from 'contexts/UserContext';
import useStyles from './styles';

const Register = () => {
  const { user } = useContext(UserContext);
  const [errorCondition, setErrorCondition] = useState('');
  const [showPasswordState, setShowPasswoed] = useState(false);
  const [registerCall, registerState] = useAuth(useRegister);
  const [search, setSearch] = useState('');

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
  const [locationCall, { data, loading }] = useLocation({ variables: { search } });

  const { loading: loadingAvatar, data: avatarData } = useAvatars();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (actions.validateForm()) {
      if (values.acceptCondition) {
        const res = { ...values };
        registerCall({
          variables: res,
        });
      } else {
        setErrorCondition("Veuillez accepter les conditions générales d'utilisation");
      }
    } else {
      if (!values.logo) {
        setErrorForm('Choisir un avatar');
      }
      actions.setAllTouched(true);
    }
  };
  useEffect(() => {
    if (values.location.length > 0) {
      locationCall();
    }
  }, [values.location, locationCall]);
  useEffect(() => {
    if (registerState.error) {
      if (!registerState.error.graphQLErrors.length) {
        setErrorForm(registerState.error.message);
      } else if (typeof registerState.error.graphQLErrors[0].message === 'string') {
        setErrorForm(registerState.error.graphQLErrors[0].message);
      } else if (typeof registerState.error.graphQLErrors[0].message === 'object') {
        const t = registerState.error.graphQLErrors[0].message;
        const key = Object.keys((t as any).originalError)[0];
        const value: any = Object.values((t as any).originalError)[0];
        setErrorFormObject({ key, value });
      }
    }
  }, [registerState.error]);

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

  const onAvatarClick = (url: string) => {
    if (values.logo === url) {
      actions.setValues({
        logo: '',
      });
    } else {
      actions.setValues({
        logo: url,
      });
      setErrorForm('');
    }
  };

  if (user) {
    return <Redirect to={registerState.called ? '/confirmation' : '/'} />;
  }

  const onSelect = (location: string | null) => {
    if (location) actions.setValues({ location });
  };
  return (
    <div className={classes.root}>
      <div className={classes.registerContainer}>
        <div className={classes.title}>INSCRIPTION</div>
        <div className={classes.form}>
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
                  <div className={classes.labelContainer}>
                    <div className={classes.label}>
                      Ton image de profil
                      <span className={classes.requiredInput}>*</span>
                    </div>
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
                          className={classNames(classes.avatar, values.logo === el.url && classes.selectedAvatar)}
                        />
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
            <Input
              label="Ton e-mail"
              onChange={actions.handleChange}
              value={values.email}
              name="email"
              required
              placeholder="email@gmail.com"
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
                touched.password &&
                errors.password !== '' &&
                hasUppercase(values.password) &&
                hasLowercase(values.password) &&
                hasNumber(values.password) &&
                hasSpecial(values.password)
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
              label="Ta ville de résidence"
              onChange={(e) => {
                setSearch(e.target.value);
                actions.handleChange(e);
              }}
              onSelectText={onSelect}
              value={values.location}
              name="location"
              placeholder="paris"
              options={!loading && data ? data.location : []}
              error={touched.location && errors.location !== ''}
              errorText={touched.location ? errors.location : ''}
              errorForm={errorFormObject.key === 'location' ? errorFormObject.value : ''}
              icon={LogoLocation}
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
                      J&lsquo;accepte les{' '}
                      <span className={classes.conditionColorText}>conditions d&lsquo;utilisation</span> de Diagoriente
                      <span className={classes.start}>*</span>
                    </div>
                  </div>
                  <div className={classes.errorText}>{errorCondition}</div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.btnContainer}>
              <div className={classes.errorCondition}>
                {errorForm && <img src={Attention} alt="err" width="16" height="16" />}
                <div className={classes.errorTextForm}>{errorForm || errorFormObject.value}</div>
              </div>
            </div>
            <div className={classNames(classes.btnContainer, classes.paddingBtn)}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.emptyDiv} />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <Button
                    className={classes.btn}
                    type="submit"
                    disabled={registerState.loading}
                    fetching={registerState.loading}
                  >
                    <div className={classes.btnLabel}>Je m’inscris</div>
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={classes.btnContainer}>
              <div className={classes.required}>
                <span className={classes.start}>*</span>
                Champs obligatoires
              </div>
            </div>
          </form>

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
