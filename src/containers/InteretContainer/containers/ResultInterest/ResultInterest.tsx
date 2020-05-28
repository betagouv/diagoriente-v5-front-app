import React, { useContext } from 'react';
import parcoursContext from 'contexts/ParcourContext';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import ModalSelect from './Modals/SelectJob/SelectModal';
import ModalWarning from './Modals/Warnings/WarningModal';
import useStyles from './styles';

const ResultInterest = () => {
  const classes = useStyles();
  const { parcours } = useContext(parcoursContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.title}>BRAVO !</div>
        </div>
        <div className={classes.description}>
          <div className={classes.text}>
            <b>Tu as sélectionné et classé 5 centres d&lsquo;intérêts.</b>
          </div>
          <div className={classes.text}>En fonction de tes expériences et de tes centres d&lsquo;intérêts, nous</div>
          <div className={classes.text}>allons maintenant te proposer des métiers qui peuvent te plaire.</div>
        </div>
        <div className={classes.btnContainer}>
          <Button className={classes.btn} onClick={() => handleOpen()}>
            <div className={classes.btnLabel}>Voir mes pistes métiers</div>
          </Button>
        </div>
        <Link to="/experience" className={classes.link}>
          <div className={classes.info}>Je n&lsquo;ai pas encore ajouté d&lsquo;expériences</div>
        </Link>
      </div>
      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#420FAB" size={70}>
        {parcours?.completed ? <ModalSelect /> : <ModalWarning />}
      </ModalContainer>
    </div>
  );
};

export default ResultInterest;
