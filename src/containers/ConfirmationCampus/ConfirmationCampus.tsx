import React, { useState, useContext, useEffect } from 'react';
import Button from 'components/button/Button';
import ModalContainer from 'components/common/Modal/ModalContainer';
import { useHistory, Redirect } from 'react-router-dom';
import userContext from 'contexts/UserContext';
import { useAddRecoStructures } from 'requests/campus2023';

import ClubModal from './Modals/Club/ClubModal';

import useStyle from './style';

const ConfirmationCampus = () => {
  const classes = useStyle();
  const history = useHistory();
  const { user } = useContext(userContext);
  const [openClubModal, setOpenClubModal] = useState(false);
  const [addRecoCampusCall, addRecoCampusState] = useAddRecoStructures();
  const [hasOpened, setHasOpened] = useState(false);
  const [message, setMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');

  const onNavigate = () => history.push('/');
  const ClubCondition =
    user?.isCampus &&
    user?.wc2023.quality &&
    user?.wc2023.quality !== 'refused' &&
    user?.wc2023Affectation?.status === 'PENDING';

  if (!ClubCondition && !hasOpened) {
    return <Redirect to="/" />;
  }
  /*  useEffect(()=> {
    if()
  }) */

  /* variables: {
    clubId: string;
    clubEmail: string;
    firstName: string;
    lastName: string;
    status: string;
  } */

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!hasOpened ? (
          <>
            <div className={classes.bigTitle}>VOUS ENTREZ DANS LA DERNIÈRE ÉTAPE DU RECRUTEMENT </div>
            <div className={classes.subTitle}>
              Nous allons désormais procéder à la dernière étape de sélection des candidats et les affecter à une
              structure sportive.A partir de cette étape vous allez pouvoir nous dire si une des structures sportives
              identifiées par Campus2023 est prête à vous accueillir.
            </div>
            <div className={classes.subTitleBold}>Vous êtes prêt ? Il est temps de vous affecter à une structure</div>
            <Button
              className={classes.btn}
              onClick={() => {
                setOpenClubModal(true);
                setHasOpened(true);
              }}
            >
              <span className={classes.textBtn}>COMMENCER</span>
            </Button>
          </>
        ) : (
          <>
            <div className={classes.bigTitle}>{message}</div>
            <div className={classes.subMessage}>{subMessage}</div>
            <Button className={classes.btn} onClick={onNavigate}>
              <span className={classes.textBtn}>Terminer</span>
            </Button>
          </>
        )}
      </div>
      <ModalContainer open={openClubModal} backdropColor="#19194B" colorIcon="#19194B" size={60} height={60}>
        <ClubModal
          addRecoCampusState={addRecoCampusState}
          addRecoCampusCall={addRecoCampusCall}
          setMessage={setMessage}
          setSubMessage={setSubMessage}
          onClose={() => setOpenClubModal(false)}
        />
      </ModalContainer>
    </div>
  );
};

export default ConfirmationCampus;
