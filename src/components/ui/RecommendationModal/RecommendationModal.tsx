import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import ModalContainer from 'components/common/Modal/ModalContainer';
import Input from 'components/inputs/Input/Input';
import Popup from 'components/common/Popup/Popup';
import CancelButton from 'components/cancelButton/CancelButton';
import NameFormator from 'utils/NameFormator';
import { Unpacked } from 'utils/types';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
import Button from 'components/button/Button';

import { UserParcour } from 'requests/types';

import { TextField } from '@material-ui/core';
import { useForm } from 'hooks/useInputs';
import { validateEmail } from 'utils/validation';
import { useAddSkillComment } from 'requests/skillComment';
import classNames from 'utils/classNames';

import UserContext from 'contexts/UserContext';

import msg from 'assets/svg/msg.svg';

import useStyles from './styles';

interface Props {
  skill: Unpacked<UserParcour['skills']>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}
const RecommendationModal = ({
 skill, open, setOpen, onSuccess,
}: Props) => {
  const classes = useStyles();
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [thirdOpen, setThirdOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [addSkillCommentCall] = useAddSkillComment();
  const { user } = useContext(UserContext);

  const [state, actions] = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      comment: '',
      confirmEmail: '',
    },
    validation: {
      email: validateEmail,
      firstName: (value) => {
        if (!value) return 'Champ requis ';
        if (value.length < 3) return 'Nom invalide (3 caractères minimum)';
        return '';
      },
      lastName: (value) => {
        if (!value) return 'Champ requis ';
        if (value.length < 3) return 'Prénom invalide (3 caractères minimum)';
        return '';
      },
    },
    required: ['firstName', 'lastName', 'email', 'comment', 'confirmEmail'],
  });

  useEffect(() => {
    if (secondOpen) {
      actions.setValues({
        comment: `${user && NameFormator(user?.profile.firstName)} ${user
          && NameFormator(
            user?.profile.lastName,
            // eslint-disable-next-line
          )} a effectué une expérience professionnelle chez vous et sollicite une recommandation de votre part. Vous pouvez l'aider en montrant que vous validez cette expérience sur la plateforme Diagoriente, l'outil ultime pour trouver son orientation et accéder à l'emploi. Bien cordialement,`,
      });
    }
    // eslint-disable-next-line
  }, [secondOpen]);

  useEffect(() => {
    if (!state.values.confirmEmail) {
      actions.setErrors({ confirmEmail: 'Champ requis' });
    } else if (state.values.email !== state.values.confirmEmail) {
      actions.setErrors({ confirmEmail: 'Email et Confirm email ne correspondent pas' });
    } else {
      actions.setErrors({ confirmEmail: '' });
    }
    // eslint-disable-next-line
  }, [state.values.email, state.values.confirmEmail]);

  const handleSecondOpen = () => {
    if (
      !state.values.email
      || !state.values.firstName
      || !state.values.lastName
      || state.values.firstName.length < 3
      || state.values.lastName.length < 3
    ) {
      actions.setAllTouched(true);
      setSecondOpen(false);
    } else {
      setOpen(false);
      setSecondOpen(true);
    }
  };

  const handleThirdOpen = () => {
    if (!state.values.comment) {
      actions.setAllTouched(true);
      setThirdOpen(false);
    } else {
      setOpen(false);
      if (skill) {
        addSkillCommentCall({
          variables: {
            id: skill.id,
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

  return (
    <>
      <ModalContainer open={open} handleClose={handleClose} backdropColor="#011A5E" colorIcon="#4D6EC5">
        <div className={classes.modalContainer}>
          {skill?.theme.type === 'professional' ? (
            <span className={classes.titleThemeDone}>{skill.theme.title}</span>
          ) : (
            <Avatar
              title={skill.theme.title}
              size={94}
              titleClassName={classes.titleClassName}
              className={classes.imgContainer}
            >
              <img src={skill.theme.resources?.icon} alt="" />
            </Avatar>
          )}
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>
          <div className={classes.descriptionModal}>Je souhaite demander une recommandation à</div>
          <form className={classes.formContainer}>
            <Input
              label="Nom"
              name="firstName"
              value={state.values.firstName}
              onChange={actions.handleChange}
              errorText={state.touched.firstName && state.errors.firstName}
              className={classes.marginInput}
              placeholder="ex : Marie"
              inputClassName={classes.fontInput}
              required
            />
            <span
              className={classNames(
                classes.hideText,
                state.touched.firstName && state.errors.firstName && classes.errorName,
              )}
            >
              {state.errors.firstName}
            </span>
            <Input
              label="Prénom"
              name="lastName"
              value={state.values.lastName}
              onChange={actions.handleChange}
              errorText={state.touched.lastName && state.errors.lastName}
              className={classes.marginInput}
              placeholder="ex : Dupont"
              inputClassName={classes.fontInput}
              required
            />
            <span
              className={classNames(
                classes.hideText,
                state.touched.lastName && state.errors.lastName && classes.errorName,
              )}
            >
              {state.errors.lastName}
            </span>

            <Input
              label="Email"
              name="email"
              placeholder="ex : mail@exemple.com "
              value={state.values.email}
              onChange={actions.handleChange}
              errorText={state.touched.email && state.errors.email}
              className={classes.marginInput}
              inputClassName={classes.fontInput}
              required
            />
            <span
              className={classNames(
                classes.hideText,
                state.touched.email && validateEmail(state.values.email) && classes.errorName,
              )}
            >
              {!state.values.email ? 'Champ requis ' : 'Email invalide'}
            </span>

            <Input
              label="Confirmez votre email"
              name="confirmEmail"
              placeholder="ex : mail@exemple.com "
              value={state.values.confirmEmail}
              onChange={actions.handleChange}
              errorText={state.touched.confirmEmail && state.errors.confirmEmail}
              className={classes.marginInput}
              inputClassName={classes.fontInput}
              required
            />
            <span
              className={classNames(
                classes.hideText,
                state.touched.confirmEmail && state.errors.confirmEmail && classes.errorName,
              )}
            >
              {state.touched.confirmEmail && state.errors.confirmEmail}
            </span>
          </form>
          <div className={classes.btnContainerModal}>
            <Button className={classes.btn} onClick={() => handleSecondOpen()}>
              <div className={classes.btnLabel}>Suivant</div>
            </Button>
          </div>
          <div className={classes.required}>
            <span className={classes.start}>* </span>
            Champs obligatoires
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
          <Avatar title={skill.theme.title} size={94} titleClassName={classes.titleClassName}>
            <img src={skill.theme.resources?.icon} alt="" />
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
          <Avatar title={skill.theme.title} size={94} titleClassName={classes.titleClassName}>
            <img src={skill.theme.resources?.icon} alt="" />
          </Avatar>
          <div className={classes.titleModal}>DEMANDE DE RECOMMANDATION</div>

          <img src={msg} height={90} className={classes.iconBackground} alt=" " />

          <div className={classes.descriptionModalContainer}>
            Le message a bien été envoyé ! Une fois rédigée, sa recommandation
            <br />
            apparaîtra dans ta carte de compétences.
          </div>

          <div className={classes.btnContainerModal}>
            <div
              onClick={() => {
                setThirdOpen(false);
                if (onSuccess) onSuccess();
              }}
            >
              <Button className={classes.btn} onClick={() => {}}>
                <div className={classes.btnLabel}>J’ai fini</div>
              </Button>
            </div>
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
    </>
  );
};

export default RecommendationModal;
