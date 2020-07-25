import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField/TextField';

import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/nextButton/nextButton';
import { useCreateContact } from 'requests/contact';
import { Company } from 'requests/types';

import idea from 'assets/svg/picto_ampoule_full.svg';
import check from 'assets/svg/checkOrange.svg';

import useStyles from './styles';
const defaultMessage =
  'Madame, Monsieur, Vous êtes référencé dans notre base entreprises Diagoriente, une plateforme numérique publique d’orientation qui aide les jeunes de 16 à 25 ans à identifier leurs compétences et réaliser des immersions professionnelles. Un.e jeune a repéré votre entreprise et vous sollicite pour une demande de PMSMP (Période de Mise en Situation en Milieu Professionnel). Êtes-vous intéressé pour prendre contact avec lui/elle ?';
interface Props {
  setOpen: (open: boolean) => void;
  openContact: Company | null;
}
const ContactModal = ({ setOpen, openContact }: Props) => {
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(true);
  const [contactCall, contactState] = useCreateContact();
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const handleSend = () => {
    if (openContact) {
      contactCall({
        variables: {
          name: openContact.name,
          email: 'mahdi22322@yopmail.com   ',
          message: `${defaultMessage}\n${message}`,
        },
      });
    }

    if (contactState.data) {
      setOpen(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.maxWidth}>
        <div className={classes.titleContainer}>CONTACTER LA BOUCHERIE DU MARAIS</div>
        <div>
          <div className={classes.contactContainer}>
            Le message qui sera envoyé à <b className={classes.textBold}> La Boucherie du Marais</b>
          </div>
          <div className={classes.information}>{defaultMessage}</div>
          <div className={classes.text}>Tu peux ajouter une note personnelle si tu le souhaites</div>
        </div>
        <TextField
          name="message"
          value={message}
          placeholder="Entre ici ton message (pas obligatoire)"
          onChange={messageChange}
          InputProps={{
            classes: {
              input: classes.defaultValue,
            },
          }}
          rows={3}
          multiline
          className={classes.textArea}
          variant="outlined"
        />
        <div className={classes.textIdeaContainer}>
          <div className={classes.textIdeaRoot}>
            <img src={idea} height={25} width={25} alt="" />
            <span className={classes.textIdea}>
              Psst, pas si vite ! Quelques conseils avant de contacter une entreprise par mail :
            </span>
          </div>
          <div className={classes.ideaText}>
            • Réfléchis à une courte explication du fonctionnement de l’immersion ou du stage : tout le monde n’est pas
            au courant ! <br />• Prépare à l’avance quelques phrases pour te présenter et expliquer l’environnement pro
            que tu aimerais découvrir. <br /> • Pas besoin de tourner autour du pot : sois clair et direct dans ta
            demande.
          </div>
        </div>

        <div className={classes.checkboxContainer}>
          <CheckBox
            ref={checkBoxRef}
            onChange={handleChange}
            checked={checked}
            name="acceptCondition"
            border="#DB8F00"
            img={check}
          />
          <span className={classes.checkboxText} onClick={() => checkBoxRef.current?.click()}>
            <b className={classes.textBold}>Joindre ma carte de compétences</b>
            <br /> Cela aidera l’entreprise à mieux te connaître
          </span>
        </div>
        <Button ArrowColor="#011A5E" classNameTitle={classes.btnLabel} className={classes.btn} onClick={handleSend}>
          J’envoie
        </Button>
      </div>
    </div>
  );
};

export default ContactModal;
