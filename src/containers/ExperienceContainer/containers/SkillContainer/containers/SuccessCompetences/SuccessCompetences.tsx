import React, { useEffect, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Theme } from 'requests/types';
import { useForm } from 'hooks/useInputs';

import { validateEmail } from 'utils/validation';
import { useAddSkillComment } from 'requests/skillComment';

import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import ModalContainer from 'components/common/Modal/ModalContainer';
import Input from 'components/inputs/Input/Input';
import Popup from 'components/common/Popup/Popup';
import Button from 'components/button/Button';
import CancelButton from 'components/cancelButton/CancelButton';

import NameFormator from 'utils/NameFormator';
import ParcourContext from 'contexts/ParcourContext';
import UserContext from 'contexts/UserContext';

import msg from 'assets/svg/msg.svg';
import arrowleft from 'assets/svg/arrowLeft.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
}

const ResultCompetences = ({ theme, match }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [thirdOpen, setThirdOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  const [addSkillCommentCall] = useAddSkillComment();
  const { parcours } = useContext(ParcourContext);
  const { user } = useContext(UserContext);

  const [state, actions] = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      comment: '',
    },
    validation: {
      email: validateEmail,
    },
    required: ['firstName', 'lastName', 'email', 'comment'],
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleSecondOpen = () => {
    if (!state.values.email || !state.values.firstName || !state.values.lastName) {
      actions.setAllTouched(true);
      setSecondOpen(false);
    } else {
      setOpen(false);
      setSecondOpen(true);
    }
  };
  const valueSkill = parcours?.skills.find((e) => e.theme.id === match.params.themeId);

  const handleThirdOpen = () => {
    if (!state.values.comment) {
      actions.setAllTouched(true);
      setThirdOpen(false);
    } else {
      setOpen(false);
      if (valueSkill) {
        addSkillCommentCall({
          variables: {
            id: valueSkill.id,
            firstName: state.values.firstName,
            lastName: state.values.lastName,
            email: state.values.email,
            text: state.values.comment,
          },
        });
      }

      setSecondOpen(false);

      setThirdOpen(true);
    }
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

  const reset = () => {
    setOpenPopup(true);
  };
  useEffect(() => {
    if (secondOpen) {
      actions.setValues({
        comment: `Bonjour ${NameFormator(state.values.firstName)} ${NameFormator(state.values.lastName)},\n${user
          && NameFormator(user?.profile.firstName)} ${user
          && NameFormator(
            user?.profile.lastName,
            // eslint-disable-next-line
          )} a effectué une expérience professionnelle chez vous et sollicite une recommandation de votre part. Vous pouvez l'aider en montrant que vous validez cette expérience sur la plateforme Diagoriente, l'outil ultime pour trouver son orientation et accéder à l'emploi. Bien cordialement,`,
      });
    }
    // eslint-disable-next-line
  }, [secondOpen]);
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
        <Avatar title={theme.title} size={170} titleClassName={classes.classNameTitle} checked>
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
          <Avatar title={theme.title} size={94} titleClassName={classes.titleClassName}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>
          <div className={classes.descriptionModal}>Je souhaite demander une recommandation à</div>
          <form className={classes.formContainer}>
            <Input
              label="Nom* :"
              name="firstName"
              value={state.values.firstName}
              onChange={actions.handleChange}
              errorText={state.touched.firstName && state.errors.firstName}
              className={classes.marginInput}
              placeholder="ex : Marie"
              inputClassName={classes.fontInput}
            />
            <Input
              label="Prénom* :"
              name="lastName"
              value={state.values.lastName}
              onChange={actions.handleChange}
              errorText={state.touched.lastName && state.errors.lastName}
              className={classes.marginInput}
              placeholder="ex : Dupont"
              inputClassName={classes.fontInput}
            />

            <Input
              label="Email* :"
              name="email"
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
      <ModalContainer
        onReset={reset}
        open={secondOpen}
        handleClose={handleSecondClose}
        backdropColor="#011A5E"
        colorIcon="#4D6EC5"
      >
        <div className={classes.modalContainer}>
          <Avatar title={theme.title} size={94} titleClassName={classes.titleClassName}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>
          <div className={classes.descriptionModal}>
            Le message pour
            {/* eslint-disable-next-line */}
            {` ${NameFormator(state.values.firstName)} ${NameFormator(state.values.lastName)}`} (
            {`${state.values.email}`}
            )
          </div>
          <form className={classes.experienceContainer}>
            <TextField
              name="comment"
              value={state.values.comment}
              onChange={actions.handleChange}
              InputProps={{
                classes: {
                  input: classes.defaultValue,
                },
              }}
              rows={6}
              multiline
              className={classes.textArea}
              variant="outlined"
              error={state.touched.comment && state.errors.comment}
            />
            <div className={classes.message}>
              Attention : Tu peux modifier ou compléter ce message avant de l&apos;envoyer !
            </div>
          </form>

          <div className={classes.btnSuccModal}>
            <Button className={classes.btn} onClick={handleThirdOpen}>
              <div className={classes.btnLabel}>Suivant</div>
            </Button>
          </div>
          <div className={classes.precedbutton} onClick={handlePreced}>
            <CancelButton />
            <span> Précedent</span>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer open={thirdOpen} handleClose={handleThirdClose} backdropColor="#011A5E" colorIcon="#4D6EC5">
        <div className={classes.modalContainer}>
          <Avatar title={theme.title} size={94} titleClassName={classes.titleClassName}>
            <img src={theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>

          <img src={msg} height={90} className={classes.iconBackground} alt=" " />

          <div className={classes.descriptionModalContainer}>
            Le message a bien été envoyé à
            {' '}
            {`${NameFormator(state.values.firstName)} ${NameFormator(state.values.lastName)}`}
            . Sa recommandation
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

      <Popup open={openPopup} handleClose={handleClose}>
        <div className={classes.popupContainer}>
          <p className={classes.popupDescription}>
            Veux-tu vraiment quitter ?
            <br />
            {' '}
            Tes modifications ne seront pas enregistrées.
          </p>
          <Button
            className={classes.incluse}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            Non, continuer
          </Button>
          <Link to="/" className={classes.linkHome}>
            Oui, abandonner et revenir à l’accueil
          </Link>
        </div>
      </Popup>
    </div>
  );
};

export default ResultCompetences;
