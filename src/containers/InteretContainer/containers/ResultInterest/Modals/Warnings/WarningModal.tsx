import React from 'react';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import useStyles from './style';

const WarningModal = () => {
  const classes = useStyles();

  return (
    <div className={classes.modalBody}>
      <div className={classes.titleModal}>Encore une petite chose !</div>
      <div className={classes.descriptionModal}>
        <div className={classes.description}>
          Nous allons te proposer des pistes métiers qui sont basées
          <br />
          sur tes centres d’intérêt.
          <br />
          Pour avoir des recommandations plus fines, il faudra que tu
          <br />
          ajoutes le plus d’expérience
          possible.
        </div>
      </div>
      <div className={classes.btnContainerModal}>
        <Link to="/">
          <Button className={classes.btn}>
            <div className={classes.btnLabel}>Compris !</div>
          </Button>
        </Link>
      </div>
      {/* <div className={classes.aide}>
        <div className={classes.aideText}>?</div>
      </div> */}
    </div>
  );
};

export default WarningModal;
