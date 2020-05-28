import React from 'react';
import Button from 'components/button/Button';
import useStyles from './style';

const WarningModal = () => {
  const classes = useStyles();

  return (
    <div className={classes.modalBody}>
      <div className={classes.titleModal}>Encore une petite chose !</div>
      <div className={classes.descriptionModal}>
        <div className={classes.description}>
          Nous allons te proposer des pistes métiers qui sont basées sur tes centres d’intérêt. Pour avoir des
          recommandations plus fines, il faudra que tu ajoutes le plus d’expérience possible.
        </div>
      </div>
      <div className={classes.btnContainerModal}>
        <Button className={classes.btn}>
          <div className={classes.btnLabel}>Compris !</div>
        </Button>
      </div>
    </div>
  );
};

export default WarningModal;
