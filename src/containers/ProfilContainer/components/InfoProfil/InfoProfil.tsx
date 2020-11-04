import React, { useContext, useState, useEffect } from 'react';

import { useForm } from 'hooks/useInputs';
import classNames from 'utils/classNames';
import { useAvatars } from 'requests/auth';
import { useLocation } from 'requests/location';
import { useUpdateUser } from 'requests/user';
import _ from 'lodash';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import UserContext from 'contexts/UserContext';
import Input from 'components/inputs/Input/Input';
import Spinner from 'components/Spinner/Spinner';
import PasswordValidation from 'components/common/PasswordValidation/PasswordValidation';
import { validateEmail, validatePassword, isStringEmpty } from 'utils/validation';
import Button from 'components/button/Button';
import Title from 'components/common/Title/Title';
import LogoLocation from 'assets/svg/locationlogo.svg';
import edit from 'assets/svg/editIcon.svg';
import SnackBar from 'components/SnackBar/SnackBar';
import defaultAvatar from 'assets/svg/defaultAvatar.svg';
import InfoProfilRow from '../InfoProfilRow/InfoProfilRow';
import Arrow from '../Arrow/Arrow';

import useStyles from './styles';

const InfoProfil = () => {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updateUser, updateUserState] = useUpdateUser();
  const [state, actions] = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      logo: '',
      email: '',
      password: '',
      oldPassword: '',
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
      oldPassword: isStringEmpty,
      logo: isStringEmpty,
      location: isStringEmpty,
    },
    required: ['firstName', 'lastName', 'email', 'password', 'oldPassword', 'logo', 'location'],
  });
  const { values, errors, touched } = state;
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [search, setSearch] = useState('');

  const { loading: loadingAvatar, data: avatarData } = useAvatars();
  const [locationCall, { data, loading }] = useLocation({ variables: { search } });

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
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
    }
  };
  const onSelect = (location: string | null) => {
    if (location) actions.setValues({ location });
  };
  useEffect(() => {
    if (search.length > 0) {
      locationCall();
    }
  }, [search, locationCall]);

  useEffect(() => {
    if (error && !open) {
      setError('');
    }
  }, [error, open]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (updateUserState.error) {
      setError(updateUserState.error.graphQLErrors[0].message);
      timeout = setTimeout(() => {
        setError('');
      }, 5000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [updateUserState.error]);
  useEffect(() => {
    if (!open && user) {
      actions.setValues({
        firstName: user?.profile.firstName || '',
        lastName: user?.profile.lastName || '',
        logo: user?.logo,
        email: user?.email || '',
        password: '',
        oldPassword: '',
        location: user?.location || '',
        institution: '',
        codeGroupe: user.codeGroupe,
      });
      actions.setAllTouched(false);
    }
    // eslint-disable-next-line
  }, [open, user]);
  useEffect(() => {
    if (updateUserState.data) {
      setUser(updateUserState.data.updateUser);
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [updateUserState.data]);
  return (
    <>
      <SnackBar variant="error" message={error} open={!!error} />
      <div className={classes.InfoContainer}>
        <div className={classes.titleContainer}>
          <Arrow />
          <Title title="MES INFOS PERSONNELLES" color="#424242" size={42} className={classes.title} />
          <div className={classes.empty} />
        </div>
        {user && (
          <div className={classes.infoRowContainer}>
            <InfoProfilRow title="Ton prénom">
              {open ? (
                <Input
                  name="firstName"
                  onChange={actions.handleChange}
                  value={values.firstName}
                  placeholder="prénom"
                  required
                  error={touched.firstName && errors.firstName}
                  errorText={touched.firstName && errors.firstName}
                  inputBaseClassName={classes.baseClassName}
                />
              ) : (
                <span className={classes.userInfo}>{user.profile.firstName}</span>
              )}
            </InfoProfilRow>
            <InfoProfilRow title="Ton nom de famille">
              {open ? (
                <Input
                  onChange={actions.handleChange}
                  value={values.lastName}
                  name="lastName"
                  required
                  placeholder="nom"
                  error={touched.lastName && errors.lastName}
                  errorText={touched.lastName ? errors.lastName : ''}
                  inputBaseClassName={classes.baseClassName}
                />
              ) : (
                <span className={classes.userInfo}>{user.profile.lastName}</span>
              )}
            </InfoProfilRow>
            <InfoProfilRow title="Ton image de profil" className={classes.alignItems}>
              {open ? (
                <div className={classes.avatarsContainer}>
                  {loadingAvatar && <Spinner />}
                  {avatarData?.avatars.data.map((el) => (
                    <div key={el.id} style={{ margin: '0px 7px' }} onClick={() => onAvatarClick(el.url)}>
                      <img
                        height={65}
                        width={65}
                        src={el?.url || defaultAvatar}
                        alt=""
                        className={classNames(classes.avatar, values.logo === el.url && classes.selectedAvatar)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <img src={values.logo} alt="" height={65} width={65} />
              )}
            </InfoProfilRow>

            <InfoProfilRow title="Ton email">
              {open ? (
                <Input
                  onChange={actions.handleChange}
                  value={values.email}
                  name="email"
                  required
                  placeholder="email@gmail.com"
                  error={touched.email && errors.email}
                  errorText={touched.email ? errors.email : ''}
                  inputBaseClassName={classes.baseClassName}
                />
              ) : (
                <span className={classes.userInfo}>{user.email}</span>
              )}
            </InfoProfilRow>
            {open && (
              <InfoProfilRow title="Ancien mot de passe">
                <Input
                  onChange={actions.handleChange}
                  value={values.oldPassword}
                  name="oldPassword"
                  required
                  type={!showOldPassword ? 'password' : ''}
                  showPassword={() => onShowOldPassword()}
                  placeholder="*******"
                  autoComplete="off"
                  error={touched.oldPassword && errors.oldPassword}
                  errorText={touched.oldPassword && errors.oldPassword}
                />
              </InfoProfilRow>
            )}
            <InfoProfilRow
              title={open ? 'Nouveau mot de passe' : 'Ton mot de passe'}
              className={classes.paddingClassName}
            >
              {open ? (
                <div className={classes.passwordContainer}>
                  <Input
                    onChange={actions.handleChange}
                    value={values.password}
                    name="password"
                    required
                    type={!showPassword ? 'password' : ''}
                    showPassword={() => onShowPassword()}
                    placeholder="*******"
                    autoComplete="off"
                    error={touched.password && errors.password}
                  />
                </div>
              ) : (
                <span className={classNames(classes.userInfo, classes.infoClassName)}>***********</span>
              )}
            </InfoProfilRow>
            {open && (
              <div className={classes.passwordRoot}>
                <div className={classes.emptyDiv} />
                <PasswordValidation password={values.password} />
              </div>
            )}

            <InfoProfilRow title="Ta ville de résidence">
              {open ? (
                <AutoComplete
                  onChange={(e) => {
                    setSearch(e.target.value);
                    actions.setValues({ location: e.target.value });
                  }}
                  onSelectText={onSelect}
                  value={values.location}
                  name="location"
                  placeholder="paris"
                  options={!loading && data ? data.location : []}
                  error={touched.location && errors.location !== ''}
                  errorText={touched.location ? errors.location : ''}
                  icon={LogoLocation}
                />
              ) : (
                <div className={classes.location}>
                  <img className={classes.locationlogo} src={LogoLocation} alt="" height={19} width={19} />
                  <span className={classes.userInfo}>{user.location}</span>
                </div>
              )}
            </InfoProfilRow>

            <>
              <InfoProfilRow title=" Code groupe" className={classes.paddingClassName}>
                {open ? (
                  <div>
                    <Input
                      onChange={actions.handleChange}
                      value={values.codeGroupe}
                      name="codeGroupe"
                      placeholder="ex: codeGroupe1"
                      error={touched.codeGroupe && errors.codeGroupe}
                      errorText={touched.codeGroupe ? errors.codeGroupe : ''}
                    />
                  </div>
                ) : (
                  <span className={classes.userInfo}>{user.codeGroupe}</span>
                )}
              </InfoProfilRow>
              {open && (
                <div className={classes.passwordRoot}>
                  <div className={classes.emptyDiv} />
                  <span>Si tu es dans un groupe, renseigne ici le code qui t'a été remis.</span>
                </div>
              )}
            </>
          </div>
        )}
        <Button
          startIcon={open ? '' : <img src={edit} alt="" className={classes.editIcon} />}
          className={classes.btn}
          childrenClassName={open ? '' : classes.childrenClassName}
          onClick={() => {
            if (open) {
              updateUser({ variables: _.pickBy(values, (value) => value) });
            } else {
              setOpen(true);
            }
          }}
        >
          {open ? (
            <span className={classes.textButton}>J’enregistre les modifications</span>
          ) : (
            <span className={classes.textButton}>Je modifie</span>
          )}
        </Button>
        {open && (
          <span
            onClick={() => {
              setOpen(false);
            }}
            className={classes.cancelText}
          >
            Annuler
          </span>
        )}
      </div>
    </>
  );
};
export default InfoProfil;
