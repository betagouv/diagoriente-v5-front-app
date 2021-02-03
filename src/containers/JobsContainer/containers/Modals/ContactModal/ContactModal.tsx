import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField/TextField';

import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/nextButton/nextButton';
import { useCreateContact } from 'requests/contact';
import { Company } from 'requests/types';
import usePdf from 'hooks/usePdf';

import idea from 'assets/svg/picto_ampoule_full.svg';
import check from 'assets/svg/checkOrange.svg';

import useStyles from './styles';

// eslint-disable-next-line
const defaultMessage =
  // eslint-disable-next-line
  'Madame, Monsieur, Vous êtes référencé dans notre base entreprises Diagoriente, une plateforme numérique publique d’orientation qui aide les jeunes de 16 à 25 ans à identifier leurs compétences et réaliser des immersions professionnelles. Un.e jeune a repéré votre entreprise et vous sollicite pour une demande de PMSMP (Période de Mise en Situation en Milieu Professionnel). Êtes-vous intéressé pour prendre contact avec lui/elle ?';
interface Props {
  setOpen: (open: boolean) => void;
  openContact: Company;
}
const ContactModal = ({ setOpen, openContact }: Props) => {
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(true);
  const [contactCall, contactState] = useCreateContact();
  const [element, createPdf, pdf] = usePdf();

  const checkBoxRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  useEffect(() => {
    if (pdf) {
      contactCall({
        variables: {
          name: openContact.name,
          email: 'mahdi25@yopmail.com',
          message: `${defaultMessage}\n${message}`,
          card: pdf.output('blob'),
        },
      });
    }
    // eslint-disable-next-line
  }, [pdf, contactCall]);

  useEffect(() => {
    if (contactState.data) setOpen(true);
  }, [contactState.data, setOpen]);

  const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const handleSend = () => {
    if (checked) {
      createPdf();
    } else {
      contactCall({
        variables: {
          name: openContact.name,
          email: 'mahdi25@yopmail.com',
          message: `${defaultMessage}\n${message}`,
        },
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.maxWidth}>
        <div className={classes.titleContainer}>CONTACTER {openContact.name}</div>
        <div>
          <div className={classes.contactContainer}>
            Le message qui sera envoyé à <b className={classes.textBold}> {openContact.name}</b>
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
        {element}
      </div>
    </div>
  );
};

export default ContactModal;
