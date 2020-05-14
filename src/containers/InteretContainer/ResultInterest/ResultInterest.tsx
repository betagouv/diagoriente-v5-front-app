import React from 'react';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Button from 'components/button/Button';
import useStyles from './styles';

const ResultInterest = () => {
  const classes = useStyles();
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
        <div className={classes.info}>Je n&lsquo;ai pas encore ajouté d&lsquo;expériences</div>
      </div>
      <ModalContainer open={open} handleClose={handleClose} />
    </div>
  );
};

export default ResultInterest;
