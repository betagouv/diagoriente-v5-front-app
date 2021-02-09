import React, { useEffect, useContext } from 'react';
import userContext from 'contexts/UserContext';

import Button from 'components/button/Button';
import localforage from 'localforage';
import { User } from 'requests/types';
import useStyles from './style';

interface IProps {
  onClose: () => void;
  selectedItem: any;
  setMessage: (message: string) => void;
  setSubMessage: (message: string) => void;
  addRecoCampusCall: (d: any) => void;
  addRecoCampusState: any;
}

const ScreenSuccess = ({
  selectedItem,
  setMessage,
  setSubMessage,
  onClose,
  addRecoCampusState,
  addRecoCampusCall,
}: IProps) => {
  const classes = useStyles();
  const { user, setUser } = useContext(userContext);

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
  const onSend = () => {
    const dataToSend = {
      clubId: selectedItem.value.value.id,
      clubEmail: /* selectedItem.value.value.referrer.email */ 'Vincent.advisor@yopmail.com',
      firstName: selectedItem.value.value.referrer[0].firstName,
      lastName: selectedItem.value.value.referrer[0].lastName,
      status: 'AWAITING_ADVISOR',
    };
    addRecoCampusCall({ variables: dataToSend });
  };
  useEffect(() => {
    if (addRecoCampusState.data) {
      updateUserData(addRecoCampusState.data.addRecoCampus);
      setMessage('VOTRE DEMANDE D’AFFECTATION A ÉTÉ ENVOYÉE !');
      setSubMessage(
        'Si la structure repond favorablement et que votre profil est sélectionné, vous serez recontacté pour la mise en place des modalités de votre affectation.',
      );
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRecoCampusState, setSubMessage, setMessage, onClose]);

  return (
    <div className={classes.container}>
      {selectedItem.value.value.referrer && (
        <>
          <div className={classes.bodyContent}>
            <div className={classes.textLabels}>
              Vous vous apprêtez à solliciter cette structure. Cet envoi fait office de demande d&lsquo;engagement.
            </div>
            <div className={classes.infoClub}>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Nom :</div>
                <div className={classes.subLabel}>{selectedItem.label}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Adresse :</div>
                <div className={classes.subLabel}>{selectedItem.value.value.city}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Manager du club :</div>
                <div className={classes.subLabel}>
                  {`${selectedItem.value.value.referrer[0].firstName} ${selectedItem.value.value.referrer[0].lastName}`}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '0.5em' }}>
            <div className={classes.textLabels}>
              Vérifiez vos informations et sélectionnez la spécialité que vous désirez développer en priorité dans la
              structure.
            </div>
            <div className={classes.textLabels}>
              En cas d’informations inexactes, contactez le support : support@diagoriente.beta.gouv.fr
            </div>
            <div className={classes.infoClub}>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Nom & prénom :</div>
                <div className={classes.subLabel}>{`${user?.profile.firstName} ${user?.profile.lastName}`}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Niveau :</div>
                <div className={classes.subLabel}>{`${user?.wc2023.degree}`}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Formation :</div>
                <div className={classes.subLabel}>{`${user?.wc2023.formation}`}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Périmètre :</div>
                <div className={classes.subLabel}>{`${user?.wc2023.perimeter} km`}</div>
              </div>
            </div>
          </div>
          <Button className={classes.btn} onClick={onSend}>
            ENVOYER
          </Button>
        </>
      )}
    </div>
  );
};

export default ScreenSuccess;
