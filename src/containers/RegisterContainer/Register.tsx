import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Input from 'components/inputs/Input/Input';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import Button from 'components/button/Button';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Spinner from 'components/Spinner/Spinner';
import { useForm } from 'hooks/useInputs';
import { useRegister, useAvatars } from 'requests/auth';
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
      setSelectedAvatar(url);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.registerContainer}>
        <div className={classes.title}>Inscription</div>
        <div className={classes.descriptionContainer}>
          <div className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id malesuada erat. Proin vel ipsum non
            dolor interdum laoreet sit amet nec massa.
          </div>
        </div>
        <div className={classes.form}>
          <div className={classes.errorCondition}>{errorForm}</div>
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
              label="Ton email*"
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
            />
            <Input
              label="Instituation"
              onChange={actions.handleChange}
              value={values.institution}
              name="institution"
              error={touched.institution && errors.institution !== ''}
              errorText={touched.institution ? errors.institution : ''}
            />
            <Input
              label="Code groupe"
              onChange={actions.handleChange}
              value={values.codeGroupe}
              name="codeGroupe"
              placeholder="ex: codeGroupe1"
              error={touched.codeGroupe && errors.codeGroupe !== ''}
              errorText={touched.codeGroupe ? errors.codeGroupe : ''}
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
                    <CheckBox onChange={actions.handleChange} checked={values.acceptCondition} name="acceptCondition" />
                    <div className={classes.conditionText} onClick={onClickCondition}>
                      J&lsquo;accepte les
                      {' '}
                      <span className={classes.conditionColorText}>conditions d&lsquo;utilisation</span>
                      {' '}
                      de Diagoriente*
                    </div>
                  </div>
                  <div className={classes.errorCondition}>{errorCondition}</div>
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
                    <div className={classes.btnLabel}>Je m’inscris</div>
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
