import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import Input from 'components/inputs/Input/Input';
import Select from 'containers/JobsContainer/components/Select/Select';
import { useHistory } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import ParcoursContext from 'contexts/ParcourContext';
import localforage from 'localforage';

import { useForm } from 'hooks/useInputs';
import LogoLocation from 'assets/form/location.png';
import { useLocation } from 'requests/location';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useUpdateUser } from 'requests/user';
import useStyles from './style';
import ModalCampusConfirm from './ModalCampusEnvoyee2023';
import ModalContainer from '../common/Modal/ModalContainer';
interface IProps {
  handleClose: () => void;
}
const ModalValideteForm = ({ handleClose }: IProps) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { parcours } = useContext(ParcoursContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ isCampus });
  const listAccData = [
    { id: 'niveaubac', title: 'Niveau Bac' },
    { id: 'bac', title: 'Bac' },
    { id: 'bac+1', title: 'Bac + 1' },
    { id: 'bac+2', title: 'Bac + 2' },
    { id: 'bac+3', title: 'Bac + 3' },
    { id: 'bac+4', title: 'Bac + 4' },
    { id: 'bac+5', title: 'Bac + 5' },
  ];
  const listFormData = [
    { id: 'bac+1', title: 'BAC : Chef de projet junior d’un club sportif' },
    { id: 'bac+3', title: 'BAC+3 : Administrateur d’une structure sportive' },
    { id: 'bac+5', title: 'BAC+5 : Manager d’une structure sportive' },
  ];

  const [state, actions] = useForm({
    initialValues: {
      lastName: '',
      firstName: '',
      location: '',
      perimeter: '',
      accessibility: [] as string[],
      formation: [] as string[],
    },
  });
  const [errorFormObject, setErrorFormObject] = useState<{ key: string; value: string }>({ key: '', value: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [openFormation, setOpenFormation] = useState(false);
  const [search, setSearch] = useState('');
  const [openLocation, setOpenLocation] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lattitude: number; longitude: number }>({
    lattitude: 0,
    longitude: 0,
  });

  const [locationCall, { data, loading }] = useLocation({ variables: { search } });
  const [updateUserCall, updateUserState] = useUpdateUser();
  const [textError, setTextError] = useState('');
  const updateUserdata = async () => {
    const data: string | null = await localforage.getItem('auth');
    let res = {};
    if (data) {
      const parsedData = JSON.parse(data);
      let newObj = {};
      const objUser = parsedData.user;
      const updatedUser = { ...objUser, validateCampus: true };
      res = updatedUser;
      newObj = {
        token: parsedData.token,
        user: updatedUser,
      };
      await localforage.setItem('auth', JSON.stringify(newObj));
      setUser(updatedUser);
    }
    return res;
  };

  useEffect(() => {
    if (state.values.location.length > 0) {
      locationCall();
    }
  }, [state.values.location]);
  useEffect(() => {
    if (isCampus) {
      setIsDisabled(true);
    }
  }, [isCampus]);
  useEffect(() => {
    if (isValidForm) {
      setIsDisabled(false);
    }
  }, [isValidForm]);
  useEffect(() => {
    if (
      state.values.firstName !== '' &&
      state.values.lastName !== '' &&
      state.values.formation.length !== 0 &&
      state.values.accessibility.length !== 0 &&
      state.values.location !== '' &&
      state.values.perimeter !== ''
    ) {
      setIsValidForm(true);
    }
  }, [
    state.values.firstName,
    state.values.lastName,
    state.values.formation,
    state.values.accessibility,
    state.values.location,
    state.values.perimeter,
  ]);
  useEffect(() => {
    if (user) {
      const acc: any = [];
      acc.push(user.wc2023.degree);
      const form: any = [];
      form.push(user.wc2023.formation);
      actions.setValues({
        location: user.location,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        formation: form,
        accessibility: acc,
        perimeter: user.wc2023?.perimeter?.toString() || '',
      });
      setCoordinates({ lattitude: user.coordinates.lattitude, longitude: user.coordinates.longitude });
    }
  }, [user?.location]);

  useEffect(() => {
    if (updateUserState.data) {
      updateUserdata();
      setUser(updateUserState.data.updateUser);
      setShowConfirmationModal(true);
    } else if (updateUserState.error?.message) {
    }
  }, [updateUserState.data, updateUserState.error]);
  const onSelect = (location: string | undefined) => {
    if (location) actions.setValues({ location });
    setOpenLocation(false);
  };
  const onSelectAcc = (label?: string) => {
    if (label) {
      const array = [...state.values.accessibility];
      array[0] = label;
      actions.setValues({ accessibility: array });
      setOpenAcc(false);
    }
  };
  const onSelectForm = (label?: string) => {
    if (label) {
      const array = [...state.values.formation];
      array[0] = label;
      actions.setValues({ formation: array });
      setOpenFormation(false);
    }
  };
  const hasCompletedParcours = parcours?.skills.length !== 0;
  const onUpadetUser = () => {
    if (
      state.values.firstName === '' ||
      state.values.lastName === '' ||
      state.values.location === '' ||
      state.values.perimeter === ''
    ) {
      setTextError('Veuillez renseigner tous les champs obligatoires');
    } else {
      if (!user?.validateCampus) {
        const hasGoodGPS = coordinates.lattitude !== 0 && coordinates.longitude !== 0;
        if (!hasGoodGPS) setTextError('Ville invalide, sélectionner dans la liste lors de la saisie');
        else {
          const dataToSend = {
            firstName: state.values.firstName,
            lastName: state.values.lastName,
            location: state.values.location,
            coordinates,
            wc2023: {
              degree: state.values.accessibility[0] || user?.wc2023.degree,
              formation: state.values.formation[0],
              perimeter: Number(state.values.perimeter),
              birthdate: user?.wc2023.birthdate,
            },
            validateCampus: hasCompletedParcours,
          };
          updateUserCall({ variables: { ...dataToSend } });
        }
      }
    }
  };
  useEffect(() => {
    if (
      textError &&
      state.values.firstName !== '' &&
      state.values.lastName !== '' &&
      state.values.location !== '' &&
      state.values.perimeter !== ''
    ) {
      setTextError('');
    }
  }, [state.values.firstName, state.values.lastName, state.values.location]);
  useEffect(() => {
    if (openLocation) {
      // Reset gps to 0 before user selects a new one
      setCoordinates({ lattitude: 0, longitude: 0 });
    }
  }, [openLocation]);
  const divAcc = useRef<HTMLDivElement>(null);
  useOnclickOutside(divAcc, () => setOpenAcc(false));
  const divForm = useRef<HTMLDivElement>(null);
  useOnclickOutside(divForm, () => setOpenFormation(false));
  return (
    <>
      <div className={classes.root}>
        <div className={classes.loginContainer}>
          <div className={classes.title}>ATTENTION !</div>
          <div className={classes.subTitle}>
            Tu es sur le point d&apos;envoyer définitivement ta candidature à ton conseiller, il pourra alors visualiser
            ta carte de compétences en l&apos;état. Es-tu sûr(e) de vouloir valider définitivement ta candidature ?
          </div>
          <div className={classes.subTitle}>
            Pense à vérifier que tes informations ci-dessous sont exactes avant de valider :
          </div>
          <div className={classes.forms}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.labelContainer}>
                  <label className={classes.labelSelect}>
                    Prénom <span className={classes.requiredInput}>*</span>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Input
                  name="firstName"
                  label=""
                  type="text"
                  onChange={actions.handleChange}
                  value={state.values.firstName}
                  placeholder="prénom"
                  error={state.touched.firstName && state.errors.firstName !== ''}
                  errorText={state.touched.firstName ? state.errors.firstName : ''}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.labelContainer}>
                  <label className={classes.labelSelect}>
                    Nom de famille <span className={classes.requiredInput}>*</span>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <Input
                  label=""
                  onChange={actions.handleChange}
                  value={state.values.lastName}
                  name="lastName"
                  type="text"
                  placeholder="nom"
                  error={state.touched.lastName && (state.errors.lastName !== '' || errorFormObject.key === 'lastName')}
                  errorText={state.touched.lastName ? state.errors.lastName : ''}
                />
              </Grid>
            </Grid>
            <div className={classes.selectwrapper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.labelContainer}>
                    <label className={classes.labelSelect}>
                      Ville de résidence <span className={classes.requiredInput}>*</span>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <AutoComplete
                    onChange={(e) => {
                      setSearch(e.target.value);
                      actions.handleChange(e);
                      setOpenLocation(true);
                    }}
                    onSelectText={onSelect}
                    value={state.values.location}
                    name="location"
                    placeholder="paris"
                    options={data?.location}
                    icon={LogoLocation}
                    type="location"
                    open={openLocation}
                    setOpen={setOpenLocation}
                    setCoordinates={setCoordinates}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.selectwrapper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.labelContainer}>
                    <label className={classes.labelSelect}>
                      Niveau du dernier diplôme obtenu <span className={classes.requiredInput}>*</span>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div className={classes.containerAutoComp}>
                    <Select
                      options={listAccData}
                      onSelectText={onSelectAcc}
                      name="accessibility"
                      placeholder="Niveau"
                      className={classes.containerSelect}
                      value={state.values.accessibility}
                      open={openAcc}
                      onClick={() => setOpenAcc(!openAcc)}
                      reference={divAcc}
                      isCampusDiplome={isCampus}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.selectwrapper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.labelContainer}>
                    <label className={classes.labelSelect}>
                      Formation visée <span className={classes.requiredInput}>*</span>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div className={classes.containerAutoComp}>
                    <Select
                      options={listFormData}
                      onSelectText={onSelectForm}
                      name="formation"
                      placeholder="Formation"
                      className={classes.containerSelect}
                      value={state.values.formation}
                      open={openFormation}
                      onClick={() => setOpenFormation(!openFormation)}
                      reference={divForm}
                      isCampus={isCampus}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.selectwrapper}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <div className={classes.labelContainer}>
                    <label className={classes.labelSelect}>
                      Mobilité souhaitée (en kilomètres)
                      <span className={classes.requiredInput}>*</span>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                  <div className={classes.containerAutoComp}>
                    <Input
                      label=""
                      type="number"
                      onChange={actions.handleChange}
                      value={state.values.perimeter}
                      name="perimeter"
                      placeholder="km maximum"
                      step={10}
                      min={1}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.textError}>{textError}</div>
          <div className={classes.infoFields}>
            <span className={classes.requiredInput}>*</span>
            <span>Champs obligatoires</span>
          </div>
          <div className={classes.container}>
            <div className={classes.btnContainer}>
              <Button className={classes.btn} disabled={isDisabled} onClick={onUpadetUser}>
                <div className={classes.btnLabel}>Oui, je valide définitivement l&apos;envoi de ma candidature</div>
              </Button>
            </div>
            <div className={classes.btnContainer}>
              <Button className={classes.btn} onClick={() => history.push('/profile/card')}>
                <div className={classes.btnLabel}>Non, je continue d&apos;enrichir ma carte de compétences</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalContainer
        open={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        backdropColor="#011A5E"
        colorIcon="rgb(255, 77, 0)"
        size={70}
      >
        <div>
          <div>
            <ModalCampusConfirm handleClose={() => handleClose()} />
          </div>
        </div>
      </ModalContainer>
    </>
  );
};
export default ModalValideteForm;
