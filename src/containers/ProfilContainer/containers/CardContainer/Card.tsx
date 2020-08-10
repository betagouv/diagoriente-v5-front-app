import React, { useEffect, useState } from 'react';

import usePdf from 'hooks/usePdf';

import { encodeUri } from 'utils/url';
import Paper from '@material-ui/core/Paper/Paper';
import carte from 'assets/svg/carte.svg';
import Arrow from '../../components/Arrow/Arrow';
import CardHeader from './components/CardHeader/CardHeader';
import CardIcons from './components/CardIcons/CardIcons';
import CardCompetence from './components/CardCompetence/CardCompetence';
import CardSkills from './components/CardSkills/CardSkills';

import useStyles from './styles';

const CardContainer = () => {
  const classes = useStyles();
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const [element, createPdf, pdf] = usePdf();

  const onCreate = () => {
    createPdf();
  };
  const onPrint = (i: string) => {
    setType(i);
    setLoading(true);
    createPdf();
  };
  const icons = <CardIcons onDownload={onCreate} onPrint={onPrint} fetching={loading} />;

  useEffect(() => {
    if (pdf) {
      if (type !== 'print') {
        pdf.save('competences.pdf');
      } else {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
        setLoading(false);
      }
    }
  }, [pdf, type]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Arrow />
        <div className={classes.headerTitle}>
          <img className={classes.headerImage} src={carte} alt="" />
          <span className={classes.title}>CARTE DE COMPÉTENCES</span>
        </div>
        {icons}
      </div>
      <Paper className={classes.card}>
        <CardHeader />
        <CardCompetence />
        <CardSkills
          title="Expériences personnelles"
          type="personal"
          emptyMessage="Tu n’as pas encore renseigné d'expérience personnelle"
          emptyButton="J’ajoute une expérience perso"
          path={`/experience/theme${encodeUri({ redirect: '/profile/card' })}`}
        />
        <CardSkills
          title="Expériences professionnelles"
          type="professional"
          emptyMessage="Tu n’as pas encore renseigné d'expérience professionnelle"
          emptyButton="J’ajoute une expérience pro"
          path={`/experience/theme-pro${encodeUri({ redirect: '/profile/card', type: 'professional' })}`}
        />
      </Paper>
      <div className={classes.footerIcons}>{icons}</div>
      {element}
    </div>
  );
};

export default CardContainer;
