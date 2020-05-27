import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Theme } from 'requests/types';
import { useForm } from 'hooks/useInputs';

import { validateEmail } from 'utils/validation';

import Button from 'components/button/Button';
import Avatar from 'components/common/Avatar/Avatar';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Input from 'components/inputs/Input/Input';

import msg from 'assets/svg/msg.svg';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [thirdOpen, setThirdOpen] = React.useState(false);

  const [state, actions] = useForm({
    initialValues: { email: '', firstName: '', lastName: '' },
    validation: {
      email: validateEmail,
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSecondOpen = () => {
    if (!state.values.email) {
      actions.setAllTouched(true);
      setSecondOpen(false);
    } else {
      setOpen(false);
      setSecondOpen(true);
    }
  };

  const handleThirdOpen = () => {
    setOpen(false);
    setSecondOpen(false);
    setThirdOpen(true);
  };

  const handlePreced = () => {
    setSecondOpen(false);
    setOpen(true);
    setThirdOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSecondClose = () => {
    setSecondOpen(false);
  };

  const handleThirdClose = () => {
    setThirdOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actions.validateForm()) {
      console.log('helloo');
    } else {
      actions.setAllTouched(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.title}>BRAVO !</div>
        </div>
        <div className={classes.description}>
          <p className={classes.text}>
            Tu as ajouté une expérience personnelle à ton parcours, et tu as identifié de nouvelles compétences.
          </p>
        </div>
        <Avatar title={theme.title} size={170}>
          <img src={theme.resources?.icon} alt="" />
        </Avatar>

        <div className={classes.textDescription}>
          <p className={classes.text}>
            Tu peux maintenant demander une recommandation pour cette expérience, cela donne confiance aux recruteurs.
          </p>
        </div>
        <div className={classes.btnContainer}>
          <Button className={classes.btn} onClick={() => handleOpen()}>
            <div className={classes.btnLabel}>Demander une recommandation</div>
          </Button>
        </div>
        <Link to={`/experience/skill/${theme.id}/done`} className={classes.info}>
          Passer cette étape
        </Link>
      </div>
      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#4D6EC5">
        <div className={classes.modalContainer}>
          <Avatar title={theme.title} size={94}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>
          <div className={classes.descriptionModal}>Je souhaite demander une recommandation à</div>
          <form className={classes.formContainer} onSubmit={onSubmit}>
            <Input
              label="Nom:"
              name="firstName"
              value={state.values.firstName}
              onChange={actions.handleChange}
              errorText={state.touched.firstName && state.errors.firstName}
              className={classes.marginInput}
              placeholder="ex : Marie"
              inputClassName={classes.fontInput}
            />
            <Input
              label="Prénom:"
              name="lastName"
              value={state.values.lastName}
              onChange={actions.handleChange}
              errorText={state.touched.lastName && state.errors.lastName}
              className={classes.marginInput}
              placeholder="ex : Dupont"
              inputClassName={classes.fontInput}
            />

            <Input
              label="Email"
              name="email"
              required
              placeholder="ex : mail@exemple.com "
              value={state.values.email}
              onChange={actions.handleChange}
              errorText={state.touched.email && state.errors.email}
              className={classes.marginInput}
              inputClassName={classes.fontInput}
            />
          </form>
          <div className={classes.btnContainerModal}>
            <Button className={classes.btn} onClick={() => handleSecondOpen()}>
              <div className={classes.btnLabel}>Suivant</div>
            </Button>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer open={secondOpen} handleClose={handleSecondClose} backdropColor="#011A5E" colorIcon="#4D6EC5">
        <div className={classes.modalContainer}>
          <Avatar title={theme.title} size={94}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>
          <div className={classes.descriptionModal}>Le message pour Marie Dupont (marie.dupont@mail.com)</div>
          <form className={classes.experienceContainer}>
            <TextField rows={6} multiline className={classes.textArea} variant="outlined" />
            <div className={classes.message}>
              Attention : Tu peux modifier ou compléter ce message avant de l'envoyer !
            </div>
          </form>

          <div className={classes.btnSuccModal}>
            <Button className={classes.btn} onClick={() => handleThirdOpen()}>
              <div className={classes.btnLabel}>Suivant</div>
            </Button>
          </div>
          <div className={classes.precedbutton} onClick={() => handlePreced()}>
            <img src={arrowleft} alt="arrow" className={classes.arrowpreced} />
            <p>Precedent</p>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer open={thirdOpen} handleClose={handleThirdClose} backdropColor="#011A5E" colorIcon="#4D6EC5">
        <div className={classes.modalContainer}>
          <Avatar title={theme.title} size={94}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>

          <img src={msg} height={90} className={classes.iconBackground} />

          <div className={classes.descriptionModalContainer}>
            Le message a bien été envoyé à Marie Dupont. Sa recommandation
            <br />
            apparaîtra dans ta carte de compétences.
          </div>

          <div className={classes.btnContainerModal}>
            <Link to={`/experience/skill/${theme.id}/done`}>
              <Button className={classes.btn} onClick={() => {}}>
                <div className={classes.btnLabel}>Terminer</div>
              </Button>
            </Link>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ResultCompetences;
