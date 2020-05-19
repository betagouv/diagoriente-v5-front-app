import React from 'react';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
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
        <Link to="/experience" className={classes.link}>
          <div className={classes.info}>Je n&lsquo;ai pas encore ajouté d&lsquo;expériences</div>
        </Link>
      </div>
      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#420FAB">
        <div className={classes.modalBody}>
          <div className={classes.titleModal}>Encore une petite chose !</div>
          <div className={classes.descriptionModal}>
            <div>Pour nous aider à te proposer des domaines professionnels,</div>
            <div>coche ce qui compte le plus pour toi dans tes expériences :</div>
            <div className={classes.subTitle}>(Plusieurs choix possibles)</div>
          </div>
          <div className={classes.experienceContainer}>
            <div className={classes.expPerso}>
              <div className={classes.titlePerso}>Mes expériences perso</div>
            </div>
            <div className={classes.expPro}>
              <div className={classes.titlePro}>Mes expériences pro</div>
            </div>
          </div>
          <div className={classes.btnContainerModal}>
            <Button className={classes.btn} onClick={() => {}}>
              <div className={classes.btnLabel}>Valider</div>
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ResultInterest;
