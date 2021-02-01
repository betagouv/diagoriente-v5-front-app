import React, { useState, useContext } from 'react';
import Button from 'components/button/Button';
import ModalContainer from 'components/common/Modal/ModalContainer';
import { useHistory, Redirect } from 'react-router-dom';
import userContext from 'contexts/UserContext';
import ClubModal from './Modals/Club/ClubModal';

import useStyle from './style';

const ConfirmationCampus = () => {
  const classes = useStyle();
  const history = useHistory();
  const { user } = useContext(userContext);
  const [openClubModal, setOpenClubModal] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [message, setMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');

  const onNavigate = () => history.push('/');
  const ClubCondition =
    user?.isCampus && user?.wc2023.quality !== 'refused' && user?.wc2023Affectation?.status === 'PENDING';

  if (!ClubCondition) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!hasOpened ? (
          <>
            <div className={classes.bigTitle}>IL EST TEMPS DE VOUS AFFECTER À UN CLUB</div>
            <div className={classes.subTitle}>LOREM...</div>
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
        <ClubModal setMessage={setMessage} setSubMessage={setSubMessage} onClose={() => setOpenClubModal(false)} />
      </ModalContainer>
    </div>
  );
};

export default ConfirmationCampus;
