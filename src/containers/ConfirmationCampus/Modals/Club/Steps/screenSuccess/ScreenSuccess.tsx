import React, { useEffect, useContext } from 'react';
import userContext from 'contexts/UserContext';

import Button from 'components/button/Button';
import { useAddRecoStructures } from 'requests/campus2023';
import localforage from 'localforage';
import { User } from 'requests/types';
import useStyles from './style';

interface IProps {
  onClose: () => void;
  selectedItem: any;
  setMessage: (message: string) => void;
  setSubMessage: (message: string) => void;
}

const ScreenSuccess = ({ selectedItem, setMessage, setSubMessage, onClose }: IProps) => {
  const classes = useStyles();
  const { setUser } = useContext(userContext);
  const [addRecoCampusCall, addRecoCampusState] = useAddRecoStructures();

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
        'Si le club repond favorablement, un conseiller campus vous recontactera pour les modalités de votre affectation.Vous serez recontacter par un conseiller campus avant XX/XX/XXXX.',
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
              Vous vous apprêté à solliciter ce club. Cet envoi fait office de demande d&lsquo;engagement
            </div>
            <div className={classes.infoClub}>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Nom:</div>
                <div className={classes.subLabel}>{selectedItem.label}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Adresse:</div>
                <div className={classes.subLabel}>{selectedItem.value.value.city}</div>
              </div>
              <div className={classes.rowInfo}>
                <div className={classes.label}>Manager du club:</div>
                <div className={classes.subLabel}>
                  {`${selectedItem.value.value.referrer[0].firstName} ${selectedItem.value.value.referrer[0].lastName}`}
                </div>
              </div>
            </div>
          </div>

          <Button className={classes.btn} onClick={onSend}>
            Fermer
          </Button>
        </>
      )}
    </div>
  );
};

export default ScreenSuccess;
