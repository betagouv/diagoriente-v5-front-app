import React, { useState, useContext, useEffect, useRef } from 'react';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import Input from 'components/inputs/Input/Input';
import Select from 'containers/JobsContainer/components/Select/Select';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import UserContext from 'contexts/UserContext';
import { useForm } from 'hooks/useInputs';
import LogoLocation from 'assets/form/location.png';
import { useLocation } from 'requests/location';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useUpdateUser } from 'requests/user';
interface IProps {
  handleClose: () => void;
}
const ModalValideteForm = ({ handleClose }: IProps) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ isCampus });
  const listAccData = [
    { id: 'bac+1', title: 'Bac + 1' },
    { id: 'bac+3', title: 'Bac + 3' },
    { is: 'bac+5', title: 'Bac+5' },
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
  const [coordinates, setCoordinates] = useState<{ lattitude: number; longitude: number }>({
    lattitude: 0,
    longitude: 0,
  });

  const [locationCall, { data, loading }] = useLocation({ variables: { search } });
  const [updateUserCall, updateUsersState] = useUpdateUser();

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
      state.values.location !== ''
    ) {
      setIsValidForm(true);
    }
  }, [
    state.values.firstName,
    state.values.lastName,
    state.values.formation,
    state.values.accessibility,
    state.values.location,
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
      });
    }
  }, [user?.location]);
  useEffect(() => {
    if (updateUsersState.data) {
      history.push('/');
      handleClose();
    }
  }, [updateUsersState.data]);
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
  const onUpadetUser = () => {
    const dataToSend = {
      firstName: state.values.firstName,
      lastName: state.values.lastName,
      location: state.values.location,
      wc2023: {
        degree: state.values.accessibility[0] || user?.wc2023.degree,
        formation: state.values.formation[0],
        birthdate: user?.wc2023.birthdate,
        perimeter: user?.wc2023.perimeter,
      },
      completed: true,
    };
    updateUserCall({ variables: { ...dataToSend } });
  };
  const divAcc = useRef<HTMLDivElement>(null);
  useOnclickOutside(divAcc, () => setOpenAcc(false));
  const divForm = useRef<HTMLDivElement>(null);
  useOnclickOutside(divForm, () => setOpenFormation(false));
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>BRAVO !</div>
        <div className={classes.subTitle}>Merci d’avoir utiliser Diagoriente x Campus2023 !</div>
        <div className={classes.subTitle}>Tes données ont été envoyées à ton conseiller Pôle Emploi.</div>
        <div className={classes.subTitle}>
          Pense à vérifier que tes informations ci-dessous sont exactes avant de continuer !
        </div>
        <div className={classes.forms}>
          <div className={classes.subTitle}>Avant de commencer, renseigne les informations ci-dessous.</div>
          <Input
            name="firstName"
            label="Ton prénom"
            onChange={actions.handleChange}
            value={state.values.firstName}
            placeholder="prénom"
            error={state.touched.firstName && state.errors.firstName !== ''}
            errorText={state.touched.firstName ? state.errors.firstName : ''}
          />
          <Input
            label="Ton nom de famille"
            onChange={actions.handleChange}
            value={state.values.lastName}
            name="lastName"
            placeholder="nom"
            error={state.touched.lastName && (state.errors.lastName !== '' || errorFormObject.key === 'lastName')}
            errorText={state.touched.lastName ? state.errors.lastName : ''}
          />
          <div className={classes.selectwrapper}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} md={5} lg={5}>
                <div className={classes.labelContainer}>
                  <label className={classes.labelSelect}>Ton niveau de diplôme</label>
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
                  <label className={classes.labelSelect}>Ton niveau de diplôme</label>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={7} lg={7}>
                <div className={classes.containerAutoComp}>
                  <Select
                    options={listAccData}
                    onSelectText={onSelectAcc}
                    name="accessibility"
                    placeholder="Niveau d’accès"
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
                  <label className={classes.labelSelect}>Formation choisie</label>
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
        </div>
        <div className={classes.container}>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} disabled={isDisabled} onClick={onUpadetUser}>
              <div className={classes.btnLabel}>Commencer à designer mon avenir !</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalValideteForm;
