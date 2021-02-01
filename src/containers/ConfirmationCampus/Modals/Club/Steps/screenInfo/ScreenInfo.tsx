import React, { useContext, useState, useEffect } from 'react';
import userContext from 'contexts/UserContext';
import Button from 'components/button/Button';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import { useUpdateWc2023Specialite } from 'requests/user';
import { useEligibleStructures, useEligibleStructuresExpectation } from 'requests/campus2023';
import { useDidMount } from 'hooks/useLifeCycle';
import localforage from 'localforage';
import { isEmpty } from 'lodash';
import { EligibleStructure, User } from 'requests/types';
import useStyles from './style';

interface Props {
  selectedAnswer: string;
  onNavigate: (index: number) => void;
  setMessage: (message: string) => void;
  setSubMessage: (message: string) => void;
  selectedItem: any;
  setSelectedItem: (s: any) => void;
  onClose: () => void;
  setText: (t: string) => void;
  text: string;
}

const ScreenInfo = ({
  selectedAnswer,
  selectedItem,
  onNavigate,
  setMessage,
  setSelectedItem,
  onClose,
  setSubMessage,
  text,
  setText,
}: Props) => {
  const classes = useStyles();
  const { user, setUser } = useContext(userContext);
  const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [getStructuresExpectationCall, getStructuresExpectationState] = useEligibleStructuresExpectation();
  const [updateUserCall, updateUsersState] = useUpdateWc2023Specialite();
  const [open, setOpen] = useState(false);

  const [expectation, setExpectation] = useState<{ label: string; value: string }[]>([]);
  const [club, setClub] = useState<{ label: string; value: EligibleStructure }[]>([]);

  const [filtredExpectation, setFiltredExpectation] = useState<{ label: string; value: string }[]>([]);
  const [filtredClub, setFiltredClub] = useState<{ label: string; value: EligibleStructure }[]>([]);

  useDidMount(() => {
    if (selectedAnswer === 'oui') {
      getStructuresCall({ variables: { userId: user?.id } });
    } else {
      getStructuresExpectationCall({ variables: { userId: user?.id } });
    }
  });
  useEffect(() => {
    if (getStructuresExpectationState.data) {
      const a = [...expectation];
      getStructuresExpectationState.data.eligibleStructuresExpectation.map((s) => {
        a.push({ label: s.name, value: s.name });
      });
      setExpectation(a);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStructuresExpectationState.data]);
  useEffect(() => {
    if (getStructuresState.data) {
      const a = [...club];
      getStructuresState.data.eligibleStructures.map((s) => {
        a.push({ label: s.name, value: s });
      });
      setClub(a);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStructuresState.data]);
  const updateUserData = async (newData: User) => {
    const data: string | null = await localforage.getItem('auth');
    const res = {};
    if (data) {
      const parsedData = JSON.parse(data);
      let newObj = {};
      const objUser = newData;
      newObj = {
        token: parsedData.token,
        user: objUser,
      };
      await localforage.setItem('auth', JSON.stringify(newObj));
      setUser(objUser);
    }
    return res;
  };
  const onChangeSpecialite = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
    setOpen(true);
    const filtredAllArray = expectation?.filter((el) => el.label.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    setFiltredExpectation(filtredAllArray);
  };
  const onChangeClub = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
    setOpen(true);
    const filtredAllArray = club?.filter((el) => el.label.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    setFiltredClub(filtredAllArray);
  };
  const onSelect = (e: { label: string; value: any }) => {
    setSelectedItem(e);
    setText(e.label);
    setOpen(false);
  };
  const onUpdateUser = () => {
    if (text && user?.id) {
      updateUserCall({
        variables: {
          user: user.id,
          specialite: selectedItem.label,
        },
      });
    }
  };
  useEffect(() => {
    if (updateUsersState.data) {
      updateUserData(updateUsersState.data.updateWc2023Specialite);
      setMessage('VOTRE CONSEILLER VA VOUS AFFECTER !');
      setSubMessage(
        'Vous allez être affecté manuellement par votre conseiller Pôle emploi qui proposera des clubs en lien avec votre profil.',
      );
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMessage, updateUsersState.data]);

  const renderClub = () => {
    return (
      <div className={classes.containerClub}>
        <div className={classes.labelTitle}>Selectionne le club prêt à te recruter:</div>
        <div style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          {getStructuresState.loading ? (
            'chargement en cours...'
          ) : (
            <AutoComplete
              onChange={onChangeClub}
              onSelectText={onSelect}
              value={text}
              name="location"
              placeholder="Nom du club..."
              options={filtredClub}
              type="location"
              open={open}
              isfull
              setOpen={setOpen}
              className={classes.inputAuto}
              heightOption={classes.heightOption}
            />
          )}

          <div className={classes.btnContainer}>
            <Button
              disabled={isEmpty(selectedItem)}
              className={!isEmpty(selectedItem) ? classes.btn : classes.btnDisable}
              onClick={() => onNavigate(3)}
            >
              <span className={classes.btnText}>Suivant</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const renderUser = () => {
    return (
      <div className={classes.info}>
        <div className={classes.textLabels}>Vérifier vos informations et sélectionnez la spécialité désirée.</div>
        <div className={classes.textLabels}>
          En cas d&apos;information inexactes, contatctez le support@diagoriente.beta.gouv
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.rowInfo}>
            <div className={classes.label}>Nom & prénom :</div>
            <div className={classes.subLabel}>{`${user?.profile.firstName} ${user?.profile.lastName}`}</div>
          </div>
          <div className={classes.rowInfo}>
            <div className={classes.label}>Niveau :</div>
            <div className={classes.subLabel}>{`${user?.wc2023.degree}`}</div>
          </div>
          <div className={classes.rowInfo}>
            <div className={classes.label}>Formation</div>
            <div className={classes.subLabel}>{`${user?.wc2023.formation}`}</div>
          </div>
          <div className={classes.rowInfo}>
            <div className={classes.label}>Perimetre :</div>
            <div className={classes.subLabel}>{`${user?.wc2023.perimeter} Km`}</div>
          </div>
        </div>
        <div className={classes.containerSpec}>
          <div className={classes.rowInfo}>
            <div className={classes.label}>Specialité :</div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
              {getStructuresExpectationState.loading ? (
                'chargement en cours...'
              ) : (
                <AutoComplete
                  onChange={onChangeSpecialite}
                  onSelectText={onSelect}
                  value={text}
                  name="location"
                  placeholder="administration..."
                  options={filtredExpectation}
                  type="location"
                  open={open}
                  isfull
                  className={classes.inputAuto}
                  setOpen={setOpen}
                  heightOption={classes.heightOption}
                />
              )}
            </div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Button
            disabled={isEmpty(selectedItem)}
            className={!isEmpty(selectedItem) ? classes.btn : classes.btnDisable}
            onClick={onUpdateUser}
          >
            <span className={classes.btnText}>Suivant</span>
          </Button>
        </div>
      </div>
    );
  };
  return <div className={classes.bodyContent}>{selectedAnswer === 'oui' ? renderClub() : renderUser()}</div>;
};

export default ScreenInfo;
