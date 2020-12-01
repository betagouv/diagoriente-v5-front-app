import React, { useState, useContext, useEffect, useRef } from 'react';
import Button from 'components/button/Button';
import Grid from '@material-ui/core/Grid';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import Select from 'containers/JobsContainer/components/Select/Select';
import { useHistory } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import DatePicker from 'components/common/Pickers/DatePicker';
import { useForm } from 'hooks/useInputs';
import LogoLocation from 'assets/form/location.png';
import { useLocation } from 'requests/location';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useUpdateUser } from 'requests/user';
import useStyles from './style';

const Confirmation = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ isCampus });
  const listAccData = [
    { id: 'bac+1', title: 'Bac + 1' },
    { id: 'bac+3', title: 'Bac + 3' },
    { id: 'bac+5', title: 'Bac + 5' },
  ];
  const listFormData = [
    { id: 'bac+1', title: 'BAC : Chef de projet junior d’un club sportif' },
    { id: 'bac+3', title: 'BAC+3 : Administrateur d’une structure sportive' },
    { id: 'bac+5', title: 'BAC+5 : Manager d’une structure sportive' },
  ];

  const [state, actions] = useForm({
    initialValues: {
      date: '',
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
  }, [state.values.location, locationCall]);
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
      state.values.date !== '' &&
      state.values.formation.length !== 0 &&
      state.values.accessibility.length !== 0 &&
      state.values.location !== ''
    ) {
      setIsValidForm(true);
    }
  }, [state.values.date, state.values.formation, state.values.accessibility, state.values.location]);
  useEffect(() => {
    if (user?.location) {
      actions.setValues({ location: user.location });
    }
  }, [user?.location]);
  useEffect(() => {
    if (updateUsersState.data) {
      history.push('/');
    }
  }, [updateUsersState.data]);
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
  const onSelect = (location: string | undefined) => {
    if (location) actions.setValues({ location });
    setOpenLocation(false);
  };
  const onUpadetUser = () => {
    const dataToSend = {
      birthdate: state.values.date,
      degree: state.values.accessibility[0],
      perimeter: 30,
      formation: state.values.formation[0],
    };
    updateUserCall({ variables: { wc2023: dataToSend } });
  };
  const divAcc = useRef<HTMLDivElement>(null);
  useOnclickOutside(divAcc, () => setOpenAcc(false));
  const divForm = useRef<HTMLDivElement>(null);
  useOnclickOutside(divForm, () => setOpenFormation(false));
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        {!isCampus ? (
          <>
            <div className={classes.title}>BRAVO !</div>
            <div className={classes.subTitle}>Ton inscription a bien été prise en compte.</div>
            <div className={classes.subTitle}>Tu as reçu un mail de confirmation.</div>
            <div className={classes.subTitle}>Si tu n&lsquo;as rien reçu, vérifie ton courrier indésirable.</div>
          </>
        ) : (
          <div>
            <div className={classes.title}>BIENVENUE SUR</div>
            <div className={classes.titleDesc}>DIAGORIENTE x CAMPUS2023</div>
            <div className={classes.subTitle}>Merci d’utiliser Diagoriente x Campus2023 !</div>
            <div className={classes.subTitle}>
              Grâce à la plateforme Diagoriente, tu vas pouvoir créer ta carte de compétences, véritable passeport pour
              intégrer une des trois formations Campus 2023 autour des métiers du sport ! Tes expériences et multiples
              compétences que tu as développé au cours de ta vie seront transmis à ton conseiller Pôle Emploi afin
              d&apos;évaluer tes aptitudes et te guider vers des structures d&apos;accueil qui te correspondent et à qui
              tu correspondras !
            </div>
            <div className={classes.forms}>
              <div className={classes.subTitle}>Avant de commencer, renseigne les informations ci-dessous.</div>
              <DatePicker onChangeDate={actions.handleChange} date={state.values.date} label="Date de naissance" />
              <div className={classes.selectAutoComplete}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={5} lg={5}>
                    <div className={classes.labelContainer}>
                      <label className={classes.labelSelect}>Ville de résidence</label>
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
                        Niveau du dernier diplôme obtenu
                        <span className={classes.requiredInput}>*</span>
                      </label>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={8} md={7} lg={7}>
                    <div className={classes.containerAutoComp}>
                      <Select
                        options={listAccData}
                        onSelectText={onSelectAcc}
                        name="accessibility"
                        placeholder="Niveau d’accès"
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
                        Formation visée
                        <span className={classes.requiredInput}>*</span>
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
          </div>
        )}
        <div className={classes.container}>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} disabled={isDisabled} onClick={onUpadetUser}>
              <div className={classes.btnLabel}>Je commence mon parcours</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
