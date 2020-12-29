import React, { useContext } from 'react';
import Button from 'components/button/Button';
import { useHistory } from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import useStyles from './style';

interface IProps {
  handleClose: () => void;
}
const ModalCampusConfirm = ({ handleClose }: IProps) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ isCampus });

  const handleContinueToDiago = () => {
    history.push('/');
    handleClose();
  };

  const handleContinueToProfile = () => {
    history.push('/profile/card');
    handleClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.title}>C&apos;EST ENVOYÉ !</div>
        <div className={classes.subTitle}>Merci d’avoir utilisé Diagoriente.</div>
        <div className={classes.subTitle}>
          Ta carte de compétences a bien été transmise à ton conseiller Pôle Emploi, ta candidature est donc
          définitivement validée.
        </div>
        <div className={classes.container}>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} onClick={handleContinueToDiago}>
              <div className={classes.btnLabel}>Je continue le parcours sur Diagoriente</div>
            </Button>
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} onClick={handleContinueToProfile}>
              <div className={classes.btnLabel}>Je visualise ma carte de compétences envoyée à mon conseiller</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCampusConfirm;
